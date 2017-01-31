import { COLOR_CHANGED, BACK_PRESSED } from '../actions';

const DEFAULT_COLOR = {
  r: 21,
  g: 98,
  b: 136,
  a: 1
};

export default (state = DEFAULT_COLOR, action) => {
  switch (action.type) {
    case COLOR_CHANGED:
      return action.color;

    case BACK_PRESSED:
      return DEFAULT_COLOR;

    default:
      return state;
  }
}
