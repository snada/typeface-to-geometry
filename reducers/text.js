import { BACK_PRESSED, TEXT_CHANGED } from '../actions';

const DEFAULT_TEXT = "text";

export default (state = DEFAULT_TEXT, action) => {
  switch (action.type) {
    case BACK_PRESSED:
      return DEFAULT_TEXT;

    case TEXT_CHANGED:
      return action.text;

    default:
      return state;
  }
}
