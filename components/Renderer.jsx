import React from 'react';
import React3 from 'react-three-renderer';

import * as THREE from 'three'

import ReactDOM from 'react-dom';

import TrackballControls from '../libs/trackball';

import { textChanged, cameraChanged } from '../actions';

import { connect } from 'react-redux';

class Renderer extends React.Component {
  componentDidMount() {
    const {
      container,
      camera,
    } = this.refs;

    const controls = new TrackballControls(camera, document.getElementById("render-wrapper"));

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;

    this._onAnimate = () => {
      this.controls.update();
    };

    this._onTrackballChange = () => {
      this.props.cameraChanged(
        this.refs.camera.position,
        this.refs.camera.rotation
      )
    };

    this.controls.addEventListener("change", this._onTrackballChange);

    this.forceUpdate();
  }

  componentWillUnmount() {
    this.controls.removeEventListener("change", this._onTrackballChange);
    this.controls.dispose();
    delete this.controls;
  }

  render() {
    return (
      <React3 mainCamera="camera" antialias={true} width={this.props.windowSize.width} height={this.props.windowSize.height} onAnimate={this._onAnimate}>
        <scene>
          <perspectiveCamera
            near={0.1}
            far={100}
            aspect={this.props.windowSize.width / this.props.windowSize.height}
            position={this.props.camera.position}
            rotation={this.props.camera.rotation}
            fov={75}
            name="camera"
            ref="camera"
          />
          <ambientLight color={0x000000} />
          <pointLight intensity={1} distance={0} position={new THREE.Vector3(0, 10, 0)}/>
          <pointLight intensity={1} distance={0} position={new THREE.Vector3(5, 10, 5)}/>
          <pointLight intensity={1} distance={0} position={new THREE.Vector3(-5, -10, -5)}/>
          {this.props.font instanceof THREE.Font && this.props.text !== "" &&
            <mesh>
              <textGeometry
                bevelEnabled={this.props.bevel.active}
                bevelThickness={this.props.bevel.thickness}
                bevelSize={this.props.bevel.size}
                font={this.props.font}
                text={this.props.text}
                size={this.props.size}
                height={this.props.height}
                curveSegments={this.props.segments}
                dynamic={true}
              />
              <meshPhongMaterial
                color={`rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},${this.props.color.a})`}
                emissive={0x072534}
                side={THREE.DoubleSide}
                shading={THREE.FlatShading}
                wireframe={this.props.wireframe}
              />
            </mesh>
          }
          <gridHelper size={5} step={10} />
        </scene>
      </React3>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  windowResized: (width, height) => {
    dispatch(windowResized(width, height));
  },

  cameraChanged: (position, rotation) => {
    dispatch(cameraChanged(position, rotation));
  }
});

const mapStateToProps = (state) => ({
  text: state.text,
  size: state.size,
  bevel: state.bevel,
  color: state.color,
  wireframe: state.wireframe,
  segments: state.segments,
  font: state.font,
  height: state.height,
  camera: state.camera,
  windowSize: state.windowSize
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Renderer);
