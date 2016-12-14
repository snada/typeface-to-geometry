import { HEIGHT_CHANGED, BACK_PRESSED } from '../actions';

const DEFAULT_HEIGHT = 0;

export default (state = DEFAULT_HEIGHT, action) => {
  switch (action.type) {
    case HEIGHT_CHANGED:
      return action.height;

    case BACK_PRESSED:
      return DEFAULT_HEIGHT;

    default:
      return state;
  }
}
