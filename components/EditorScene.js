import React from 'react';

import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { windowResized, backPressed, textChanged } from '../actions';

import Gui from './Gui';
import Renderer from './Renderer';

let _f;

class EditorScene extends React.Component {
  updateDimensions() {
    this.props.windowResized(window.innerWidth, window.innerHeight);
  }

  componentWillMount() {
    this.updateDimensions();
    _f = this.updateDimensions.bind(this);
    window.addEventListener("resize", _f);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", _f);
  }

  _onAnimate() {}

  render() {
    return (
      <div>
        <Gui />
        <Renderer windowWidth={this.props.windowSize.width} windowHeight={this.props.windowSize.height}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  windowSize: state.windowSize
});

const mapDispatchToProps = (dispatch) => ({
  backPressed: (e) => {
    dispatch(backPressed());
    hashHistory.goBack();
  },

  windowResized: (width, height) => {
    dispatch(windowResized(width, height));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorScene);
