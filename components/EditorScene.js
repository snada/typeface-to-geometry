import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';

import { windowResized, backPressed, textChanged } from '../actions';

let _f;

class EditorScene extends React.Component {
  updateDimensions() {
    let updateWidth  = window.innerWidth;
    let updateHeight = window.innerHeight;
    this.props.windowResized(updateWidth, updateHeight);
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
        <input type="text" value={this.props.text} onChange={this.props.textChanged} />
        <React3 mainCamera="camera" antialias={true} width={this.props.width} height={this.props.height} onAnimate={this._onAnimate}>
          <scene>
            <perspectiveCamera name="camera" fov={75} aspect={this.props.width / this.props.height} near={0.1} far={100}
              position={new THREE.Vector3(0, 0, 5)}
            />
            <mesh rotation={new THREE.Euler(0.1, 0.1, 0)}>
              <textGeometry font={this.props.font} text={this.props.text} size={1} height={0} curveSegments={1} dynamic={true} />
              <meshBasicMaterial color={0x00ff00} />
            </mesh>
          </scene>
        </React3>
      </div>
    );
  }
}

EditorScene.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  font: React.PropTypes.object,
  text: React.PropTypes.string
};

const mapStateToProps = (state) => ({
  width: state.windowSize.width,
  height: state.windowSize.height,
  font: state.font,
  text: state.text
});

const mapDispatchToProps = (dispatch) => ({
  backPressed: (e) => {
    dispatch(backPressed());
    hashHistory.goBack();
  },

  windowResized: (width, height) => {
    dispatch(windowResized(width, height));
  },

  textChanged: (event) => {
    dispatch(textChanged(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorScene);
