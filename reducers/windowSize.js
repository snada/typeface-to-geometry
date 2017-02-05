import { WINDOW_RESIZED } from '../actions';

export default (state = { width: 0, height: 0 }, action) => {
  switch (action.type) {
    case WINDOW_RESIZED:
      return { width: action.width, height: action.height };

    default:
      return state;
  }
};
