import * as THREE from 'three';

import { CAMERA_CHANGED, BACK_PRESSED } from '../actions';

const CAMERA_DEFAULT_POSITION = new THREE.Vector3(-2, 1, 5);
const CAMERA_DEFAULT_ROTATION = new THREE.Euler(0, 0, 0);

const DEFAULT_CAMERA = {
  position: CAMERA_DEFAULT_POSITION,
  rotation: CAMERA_DEFAULT_ROTATION
};

export default (state = DEFAULT_CAMERA, action) => {
  switch (action.type) {
    case CAMERA_CHANGED:
      return {
        position: action.position,
        rotation: action.rotation
      };

    case BACK_PRESSED:
      return DEFAULT_CAMERA;

    default:
      return state;
  }
};
