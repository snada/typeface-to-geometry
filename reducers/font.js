import { FONT_LOADED, BACK_PRESSED } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case FONT_LOADED:
      return action.font;

    case BACK_PRESSED:
      return {};

    default:
      return state;
  }
};
