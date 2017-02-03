import chai, { expect } from 'chai';

import reducer from '../../reducers/wireframe';

import { wireframeSwitched, WIREFRAME_SWITCHED, backPressed, BACK_PRESSED } from '../../actions';

describe('reducers', () => {
  describe('wireframe', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(false);
    });

    it('should return new wireframe', () => {
      expect(reducer(false, wireframeSwitched(true))).to.eql(true);
    });

    it('should reset when back is pressed', () => {
      expect(reducer(true, backPressed())).to.eql(false);
    });
  });
});
