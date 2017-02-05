import { expect } from 'chai';

import reducer from '../../reducers/color';

import { backPressed, COLOR_CHANGED } from '../../actions';

describe('reducers', () => {
  describe('color', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql({ r: 21, g: 98, b: 136, a: 1 });
    });

    it('should return new color', () => {
      expect(reducer({}, {
        type: COLOR_CHANGED,
        color: {
          r: 10,
          g: 10,
          b: 10,
          a: 0.5
        }
      })).to.eql({
        r: 10,
        g: 10,
        b: 10,
        a: 0.5
      });
    });

    it('should reset when back is pressed', () => {
      expect(reducer({ a: 'a' }, backPressed())).to.eql({ r: 21, g: 98, b: 136, a: 1 });
    });
  });
});
