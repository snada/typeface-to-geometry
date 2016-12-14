const THREE = require("three");
import { hashHistory } from 'react-router';

export const FONT_LOADED = 'FONT_LOADED';
export const fontLoaded = (font) => {
  return ({
    type: FONT_LOADED,
    font
  });
};

export const JSON_DROPPED = 'JSON_DROPPED';
export const jsonDropped = (files) => {
  return dispatch => {
    if(files[0] === undefined) {
      return { type: JSON_DROPPED, font: {} };
    } else {
      let loader = new THREE.FontLoader();

      loader.load(files[0].path, (loadedFont) => {
        dispatch(fontLoaded(loadedFont));
        hashHistory.push('editor');
      });
    }
  };
};

export const SEGMENTS_CHANGED = 'SEGMENTS_CHANGED';
export const segmentsChanged = (segments) => {
  return({
    type: SEGMENTS_CHANGED,
    segments
  });
};

export const HEIGHT_CHANGED = 'HEIGHT_CHANGED';
export const heightChanged = (height) => {
  return({
    type: HEIGHT_CHANGED,
    height
  });
};

export const TEXT_CHANGED = 'TEXT_CHANGED';
export const textChanged = (text) => {
  return({
    type: TEXT_CHANGED,
    text
  });
};

export const WIREFRAME_SWITCHED = 'WIREFRAME_SWITCHED';
export const wireframeSwitched = (value) => {
  return({
    type: WIREFRAME_SWITCHED,
    value
  });
};

export const WINDOW_RESIZED = 'WINDOW_RESIZED';
export const windowResized = (width, height) => {
  return({
    type: WINDOW_RESIZED,
    width,
    height
  });
};

export const BACK_PRESSED = 'BACK_PRESSED';
export const backPressed = () => {
  return ({
    type: BACK_PRESSED
  });
};
