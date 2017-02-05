import { expect } from 'chai';

import reducer from '../../reducers/bevel';

import {
  backPressed,
  bevelChanged,
  bevelSizeChanged,
  bevelThicknessChanged
} from '../../actions';

const DEFAULT_THICKNESS = 0.05;
const DEFAULT_SIZE = 0.05;

const DEFAULT_BEVEL = {
  active: false,
  thickness: DEFAULT_THICKNESS,
  size: DEFAULT_SIZE
};

describe('reducers', () => {
  describe('bevel', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(DEFAULT_BEVEL);
    });

    it('should change active bevel state', () => {
      const state = { active: false, thickness: 1, size: 2 };
      expect(reducer(state, bevelChanged(true))).to.eql({ ...state, active: true });
    });

    it('should change size bevel state', () => {
      const state = { active: false, thickness: 1, size: 2 };
      expect(reducer(state, bevelSizeChanged(100))).to.eql({ ...state, size: 100 });
    });

    it('should change thickness bevel state', () => {
      const state = { active: false, thickness: 1, size: 2 };
      expect(reducer(state, bevelThicknessChanged(100))).to.eql({ ...state, thickness: 100 });
    });

    it('should reset when back is pressed', () => {
      const state = { active: true, thickness: 1, size: 2 };
      expect(reducer(state, backPressed())).to.eql(DEFAULT_BEVEL);
    });
  });
});
