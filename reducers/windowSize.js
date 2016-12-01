import { WINDOW_RESIZED } from '../actions';

export default (state = { x: 0, y: 0 }, action) => {
  switch (action.type) {
    case WINDOW_RESIZED:
      return { width: action.width, height: action.height };

    default:
      return state;
  }
}
