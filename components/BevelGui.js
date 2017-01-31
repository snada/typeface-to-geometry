import React from 'react';
import { connect } from 'react-redux';

import { Input } from 'semantic-ui-react';

import {
  bevelThicknessChanged,
  bevelSizeChanged
} from '../actions';

class BevelGui extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Input type="number" value={this.props.bevelThickness} min={0} max={1} step={0.01} onChange={this.props.bevelThicknessChanged} />
          <p>Bevel Thickness</p>
        </div>
        <div>
          <Input type="number" value={this.props.bevelSize} min={0} max={1} step={0.01} onChange={this.props.bevelSizeChanged} />
          <p>Bevel size</p>
        </div>
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
