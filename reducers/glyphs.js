const THREE = require("three");

import { JSON_DROPPED, FONT_LOADED, BACK_PRESSED } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case JSON_DROPPED:
      return {};

    case FONT_LOADED:
      let glyphs = {};
      for(var glyph in action.font.data.glyphs) {
        const g = new THREE.TextGeometry(glyph, {
          font: action.font,
          size: 0.12,
          height: 0,
          curveSegments: 1
        });
        g.computeBoundingBox();
        glyphs[glyph] = g;
      }
      return glyphs;

    case BACK_PRESSED:
      return {};

    default:
      return state;
  }
}
