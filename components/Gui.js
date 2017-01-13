import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { backPressed, heightChanged, textChanged, segmentsChanged, wireframeSwitched } from '../actions';

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
        <input type="button" onClick={this.props.backPressed} value="Back"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  height: state.height,
  text: state.text,
  segments: state.segments
});

const mapDispatchToProps = (dispatch) => ({
  backPressed: (e) => {
    dispatch(backPressed());
    hashHistory.goBack();
  },

  textChanged: (event) => {
    dispatch(textChanged(event.target.value));
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
