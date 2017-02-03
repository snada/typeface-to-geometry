import chai, { expect } from 'chai';

import reducer from '../../reducers/windowSize';

import { windowResized, HEIGHT_CHANGED } from '../../actions';

describe('reducers', () => {
  describe('windowSize', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql({ width: 0, height: 0 });
    });

    it('should return new window size', () => {
      expect(reducer(0, windowResized(800, 600))).to.eql({ width: 800, height: 600 });
    });
  });
});
