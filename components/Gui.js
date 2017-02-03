import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const { remote } = require('electron');
const { dialog, BrowserWindow } = remote;

import BevelGui from './BevelGui';

import { SketchPicker } from 'react-color';

import alphabetExporter from '../libs/alphabetExporter';

import { Accordion, Button, Checkbox, Input } from 'semantic-ui-react';

import {
  backPressed,
  bevelChanged,
  colorChanged,
  heightChanged,
  textChanged,
  sizeChanged,
  saveAlphabet,
  segmentsChanged,
  wireframeSwitched
} from '../actions';

const guiStyle = {
  position: 'fixed',
  left: 10,
  top: 10,
  color: 'gray'
};

class Gui extends React.Component {
  content() {
    let bevelContent = <div><Checkbox value={this.props.bevel.active.toString()} onChange={this.props.bevelChanged} /><br /><br /></div>;
    bevelContent = this.props.bevel.active ? <div>{bevelContent}<BevelGui /></div> : <div>{bevelContent}</div>;

    return [
      { title: 'Text', content: <Input value={this.props.text} onChange={this.props.textChanged} /> },
      { title: 'Wireframe', content: <Checkbox value={this.props.wireframe} onChange={this.props.wireframeSwitched} /> },
      { title: 'Segments', content: <Input type="number" step={1} min={1} value={this.props.segments} onChange={this.props.segmentsChanged} /> },
      { title: 'Height', content: <Input type="number" step={0.01} value={this.props.height} onChange={this.props.heightChanged} /> },
      { title: 'Size', content: <Input type="number" step={0.01} min={0.01} value={this.props.size} onChange={this.props.sizeChanged} /> },
      { title: 'Color', content: <SketchPicker color={this.props.color} onChange={this.props.colorChanged} /> },
      { title: 'Bevel', content: bevelContent },
      { title: 'Save Alphabet', content: <Button onClick={this.props.saveAlphabet}>Save</Button> },
      { title: 'Back', content: <Button onClick={this.props.backPressed}>Back</Button> },
    ];
  }

  render() {
    return (
      <div style={guiStyle}>
        <Accordion panels={this.content()} styled style={{width: '240px'}} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bevel: state.bevel,
  color: state.color,
  height: state.height,
  text: state.text,
  size: state.size,
  font: state.font,
  segments: state.segments
});

const mapDispatchToProps = (dispatch) => ({
  saveAlphabet: () => {
    dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), { filters: [{ name: 'json', extensions: ['json'] }] }, (path) => {
      if(path) {
        dispatch(saveAlphabet(path, alphabetExporter));
      }
    });
  },

  backPressed: (event) => {
    dispatch(backPressed());
    hashHistory.goBack();
  },

  textChanged: (event) => {
    dispatch(textChanged(event.target.value));
  },

  sizeChanged: (event) => {
    dispatch(sizeChanged(event.target.value));
  },

  bevelChanged: (event) => {
    dispatch(bevelChanged());
  },

  colorChanged: (color) => {
    dispatch(colorChanged(color.rgb));
  },

  segmentsChanged: (event) => {
    dispatch(segmentsChanged(event.target.value));
  },

  wireframeSwitched: (event, data) => {
    dispatch(wireframeSwitched(data.checked));
  },

  heightChanged: (event) => {
    dispatch(heightChanged(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gui);
