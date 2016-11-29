import { WINDOW_RESIZED } from '../actions';

export default (state = { x: 0, y: 0 }, action) => {
  switch (action.type) {
    case WINDOW_RESIZED:
      return { x: action.width, y: action.height };

    default:
      return state;
  }
}
