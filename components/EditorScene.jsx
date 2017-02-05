import React from 'react';

import { connect } from 'react-redux';

import { windowResized, backPressed, textChanged } from '../actions';

import Gui from './Gui';
import Renderer from './Renderer';

class EditorScene extends React.Component {
  componentWillMount() {
    this.updateDimensions = () => {
      this.props.windowResized(window.innerWidth, window.innerHeight);
    };

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  };

  render() {
    return (
      <div>
        <Gui />
        <div id="render-wrapper">
          <Renderer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  windowSize: state.windowSize
});

const mapDispatchToProps = (dispatch) => ({
  windowResized: (width, height) => {
    dispatch(windowResized(width, height));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorScene);
