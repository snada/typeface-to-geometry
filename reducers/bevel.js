import {
  BEVEL_CHANGED,
  BEVEL_THICKNESS_CHANGED,
  BEVEL_SIZE_CHANGED,
  BACK_PRESSED
} from '../actions';

const DEFAULT_THICKNESS = 0.05;
const DEFAULT_SIZE = 0.05;

const DEFAULT_BEVEL = {
  active: false,
  thickness: DEFAULT_THICKNESS,
  size: DEFAULT_SIZE
};

export default (state = DEFAULT_BEVEL, action) => {
  switch (action.type) {
    case BEVEL_CHANGED:
      return {
        ...state,
        active: !state.active
      };

    case BEVEL_THICKNESS_CHANGED:
      return {
        ...state,
        thickness: +action.value
      };

    case BEVEL_SIZE_CHANGED:
      return {
        ...state,
        size: +action.value
      };

    case BACK_PRESSED:
      return DEFAULT_BEVEL;

    default:
      return state;
  }
};
