import React from 'react';
import { connect } from 'react-redux';

import {
  bevelThicknessChanged,
  bevelSizeChanged
} from '../actions';

class BevelGui extends React.Component {
  render() {
    return (
      <div>
        <br /><br />
        <input type="range" value={this.props.bevelThickness} min={0} max={1} step={0.01} onChange={this.props.bevelThicknessChanged} /> Bevel Thickness
        <br /><br />
        <input type="range" value={this.props.bevelSize} min={0} max={1} step={0.01} onChange={this.props.bevelSizeChanged} /> Bevel Size
        <br /><br />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bevelSize: state.bevel.size,
  bevelThickness: state.bevel.thickness,
});

const mapDispatchToProps = (dispatch) => ({
  bevelThicknessChanged: (event) => {
    dispatch(bevelThicknessChanged(event.target.value));
  },

  bevelSizeChanged: (event) => {
    dispatch(bevelSizeChanged(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BevelGui);
