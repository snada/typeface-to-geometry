import { expect } from 'chai';

import reducer from '../../reducers/font';

import { backPressed, FONT_LOADED } from '../../actions';

describe('reducers', () => {
  describe('font', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql({});
    });

    it('should return new font', () => {
      expect(reducer({}, { type: FONT_LOADED, font: 'a' })).to.eql('a');
    });

    it('should reset when back is pressed', () => {
      expect(reducer({ a: 'a' }, backPressed())).to.eql({});
    });
  });
});
