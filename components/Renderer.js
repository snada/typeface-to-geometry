import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { textChanged } from '../actions';

class Renderer extends React.Component {
  render() {
    return (
      <React3 mainCamera="camera" antialias={true} width={this.props.width} height={this.props.height} onAnimate={this._onAnimate}>
        <scene>
          <perspectiveCamera name="camera" fov={75} aspect={this.props.width / this.props.height} near={0.1} far={100}
            position={new THREE.Vector3(-2, 1, 5)}
            lookAt={new THREE.Vector3(0, 0, 0)}
          />
          <mesh>
            <textGeometry font={this.props.font} text={this.props.text} size={1} height={0} curveSegments={1} dynamic={true} />
            <meshBasicMaterial color={0x00ff00} wireframe={false} />
          </mesh>
          <gridHelper size={10} step={1} />
        </scene>
      </React3>
    );
  }
}

Renderer.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
  font: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  text: state.text,
  font: state.font
});

export default connect(
  mapStateToProps
)(Renderer);
