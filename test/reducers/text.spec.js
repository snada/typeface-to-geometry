import chai, { expect } from 'chai';

import reducer from '../../reducers/text';

import { textChanged, TEXT_CHANGED, backPressed, BACK_PRESSED } from '../../actions';

describe('reducers', () => {
  describe('text', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql('text');
    });

    it('should return new text when passed as string', () => {
      expect(reducer('text', textChanged('new text'))).to.eql('new text');
    });

    it('should reset when back is pressed', () => {
      expect(reducer('some text', backPressed())).to.eql('text');
    });
  });
});
