import { WIREFRAME_SWITCHED, BACK_PRESSED } from '../actions';

const DEFAULT_WIREFRAME = false;

export default (state = DEFAULT_WIREFRAME, action) => {
  switch (action.type) {
    case BACK_PRESSED:
      return DEFAULT_WIREFRAME;

    case WIREFRAME_SWITCHED:
      return action.value;

    default:
      return state;
  }
}
