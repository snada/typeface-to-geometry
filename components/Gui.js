import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const { remote } = require('electron')
const { dialog, BrowserWindow } = remote;

import BevelGui from './BevelGui';

import alphabetExporter from '../libs/alphabetExporter';

import {
  backPressed,
  bevelChanged,
  heightChanged,
  textChanged,
  saveAlphabet,
  segmentsChanged,
  wireframeSwitched
} from '../actions';

const guiStyle = {
  position: 'fixed',
  left: 10,
  top: 10
};

class Gui extends React.Component {
  render() {
    return (
      <div style={guiStyle}>
        <input type="text" value={this.props.text} onChange={this.props.textChanged} style={guiStyle} />
        <br /><br />
        <input type="checkbox" onClick={this.props.wireframeSwitched} /> Wireframe
        <br /><br />
        <input type="range" value={this.props.segments} min={1} max={10} step={1} onChange={this.props.segmentsChanged} /> Segments
        <br /><br />
        <input type="range" value={this.props.height} min={0} max={10} step={0.1} onChange={this.props.heightChanged} /> Height
        <br /><br />
        <input type="checkbox" onClick={this.props.bevelChanged} /> Bevel
        <br /><br />
        {this.props.bevel.active && <BevelGui />}
        <input type="button" onClick={this.props.saveAlphabet} value="Save alphabet"/>
        <br /><br />
        <input type="button" onClick={this.props.backPressed} value="Back"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bevel: state.bevel,
  height: state.height,
  text: state.text,
  font: state.font,
  segments: state.segments,
  glyphs: state.glyphs
});

const mapDispatchToProps = (dispatch) => ({
  saveAlphabet: () => {
    dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), { filters: [{ name: 'json', extensions: ['json'] }] }, (path) => {
      if(path) {
        dispatch(saveAlphabet(path));
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

  bevelChanged: (event) => {
    dispatch(bevelChanged());
  },

  segmentsChanged: (event) => {
    dispatch(segmentsChanged(event.target.value));
  },

  wireframeSwitched: (event) => {
    dispatch(wireframeSwitched(event.target.checked));
  },

  heightChanged: (event) => {
    dispatch(heightChanged(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gui);
