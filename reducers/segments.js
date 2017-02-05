import { SEGMENTS_CHANGED, BACK_PRESSED } from '../actions';

const DEFAULT_SEGMENTS = 1;

export default (state = DEFAULT_SEGMENTS, action) => {
  switch (action.type) {
    case SEGMENTS_CHANGED:
      return +action.segments;

    case BACK_PRESSED:
      return DEFAULT_SEGMENTS;

    default:
      return state;
  }
};
