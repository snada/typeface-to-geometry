import { BACK_PRESSED, SIZE_CHANGED } from '../actions';

const DEFAULT_SIZE = 0.12;

export default (state = DEFAULT_SIZE, action) => {
  switch (action.type) {
    case BACK_PRESSED:
      return DEFAULT_SIZE;

    case SIZE_CHANGED:
      return +action.value;

    default:
      return state;
  }
}
