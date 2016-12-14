import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { textChanged } from '../actions';

class Renderer extends React.Component {
  render() {
    return (
      <React3 mainCamera="camera" antialias={true} width={this.props.windowWidth} height={this.props.windowHeight} onAnimate={this._onAnimate}>
        <scene>
          <perspectiveCamera name="camera" fov={75} aspect={this.props.windowWidth / this.props.windowHeight} near={0.1} far={100}
            position={new THREE.Vector3(-2, 1, 5)}
            lookAt={new THREE.Vector3(0, 0, 0)}
          />
          <ambientLight color={0x000000} />
          <pointLight intensity={1} distance={0} position={new THREE.Vector3(0, 10, 0)}/>
          <pointLight intensity={1} distance={0} position={new THREE.Vector3(5, 10, 5)}/>
          <pointLight intensity={1} distance={0} position={new THREE.Vector3(-5, -10, -5)}/>
          <mesh>
            <textGeometry
              font={this.props.font}
              text={this.props.text}
              size={1}
              height={this.props.height}
              curveSegments={this.props.segments}
              dynamic={true}
            />
            <meshPhongMaterial
		          color={0x156289}
		          emissive={0x072534}
              side={THREE.DoubleSide}
              shading={THREE.FlatShading}
              wireframe={this.props.wireframe}
            />
          </mesh>
          <gridHelper size={5} step={10} />
        </scene>
      </React3>
    );
  }
}

Renderer.propTypes = {
  windowWidth: React.PropTypes.number.isRequired,
  windowHeight: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
  font: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  text: state.text,
  wireframe: state.wireframe,
  segments: state.segments,
  font: state.font,
  height: state.height
});

export default connect(
  mapStateToProps
)(Renderer);
