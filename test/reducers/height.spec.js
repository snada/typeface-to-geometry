import { expect } from 'chai';

import reducer from '../../reducers/height';

import { heightChanged, backPressed } from '../../actions';

describe('reducers', () => {
  describe('height', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(0);
    });

    it('should return new height when passed as number', () => {
      expect(reducer(0, heightChanged(22))).to.eql(22);
    });

    it('should return new height when passed as string', () => {
      expect(reducer(0, heightChanged('22'))).to.eql(22);
    });

    it('should reset when back is pressed', () => {
      expect(reducer(22, backPressed())).to.eql(0);
    });
  });
});
