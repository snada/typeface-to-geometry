import { expect } from 'chai';

import * as THREE from 'three';

import reducer from '../../reducers/camera';

import { backPressed, cameraChanged } from '../../actions';

const CAMERA_DEFAULT_POSITION = new THREE.Vector3(-2, 1, 5);
const CAMERA_DEFAULT_ROTATION = new THREE.Euler(0, 0, 0);

describe('reducers', () => {
  describe('camera', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql({
        position: CAMERA_DEFAULT_POSITION,
        rotation: CAMERA_DEFAULT_ROTATION
      });
    });

    it('should return new camera', () => {
      const newCameraPos = new THREE.Vector3(100, 100, 500);
      const newCameraRot = new THREE.Euler(1, 1, 1);

      expect(reducer({}, cameraChanged(newCameraPos, newCameraRot))).to.eql({
        position: newCameraPos,
        rotation: newCameraRot
      });
    });

    it('should reset when back is pressed', () => {
      expect(reducer({ a: 'a' }, backPressed())).to.eql({
        position: CAMERA_DEFAULT_POSITION,
        rotation: CAMERA_DEFAULT_ROTATION
      });
    });
  });
});
