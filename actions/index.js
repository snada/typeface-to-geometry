import * as THREE from 'three';

import { push } from 'react-router-redux';

export const SAVE_ALPHABET = 'SAVE_ALPHABET';
export const saveAlphabet = (path, exporter) =>
  (dispatch, getState) => {
    const state = getState();
    exporter(path, state.font, state.segments, state.height, state.size, state.color);
  };

export const COLOR_CHANGED = 'COLOR_CHANGED';
export const colorChanged = color => (
  {
    type: COLOR_CHANGED,
    color
  }
);

export const SIZE_CHANGED = 'SIZE_CHANGED';
export const sizeChanged = value => (
  {
    type: SIZE_CHANGED,
    value
  }
);

export const BEVEL_CHANGED = 'BEVEL_CHANGED';
export const bevelChanged = () => (
  {
    type: BEVEL_CHANGED
  }
);

export const BEVEL_THICKNESS_CHANGED = 'BEVEL_THICKNESS_CHANGED';
export const bevelThicknessChanged = value => (
  {
    type: BEVEL_THICKNESS_CHANGED,
    value
  }
);

export const BEVEL_SIZE_CHANGED = 'BEVEL_SIZE_CHANGED';
export const bevelSizeChanged = value => (
  {
    type: BEVEL_SIZE_CHANGED,
    value
  }
);

export const CAMERA_CHANGED = 'CAMERA_CHANGED';
export const cameraChanged = (position, rotation) => (
  {
    type: CAMERA_CHANGED,
    position,
    rotation
  }
);

export const FONT_LOADED = 'FONT_LOADED';
export const fontLoaded = font =>
  (dispatch) => {
    dispatch(push('editor'));
    dispatch({ type: FONT_LOADED, font });
  };

export const JSON_DROPPED = 'JSON_DROPPED';
export const jsonDropped = files =>
  (dispatch) => {
    if (files[0] === undefined) {
      return { type: JSON_DROPPED, font: {} };
    }
    const loader = new THREE.FontLoader();

    loader.load(files[0].path, (loadedFont) => {
      dispatch(fontLoaded(loadedFont));
    });
    return {};
  };

export const SEGMENTS_CHANGED = 'SEGMENTS_CHANGED';
export const segmentsChanged = segments => (
  {
    type: SEGMENTS_CHANGED,
    segments
  }
);

export const HEIGHT_CHANGED = 'HEIGHT_CHANGED';
export const heightChanged = height => (
  {
    type: HEIGHT_CHANGED,
    height
  }
);

export const TEXT_CHANGED = 'TEXT_CHANGED';
export const textChanged = text => (
  {
    type: TEXT_CHANGED,
    text
  }
);

export const WIREFRAME_SWITCHED = 'WIREFRAME_SWITCHED';
export const wireframeSwitched = value => (
  {
    type: WIREFRAME_SWITCHED,
    value
  }
);

export const WINDOW_RESIZED = 'WINDOW_RESIZED';
export const windowResized = (width, height) => (
  {
    type: WINDOW_RESIZED,
    width,
    height
  }
);

export const BACK_PRESSED = 'BACK_PRESSED';
export const backPressed = () => (
  {
    type: BACK_PRESSED
  }
);
