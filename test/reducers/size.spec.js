import { expect } from 'chai';

import reducer from '../../reducers/size';

import { sizeChanged, backPressed } from '../../actions';

describe('reducers', () => {
  describe('size', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(1);
    });

    it('should return new size when passed as number', () => {
      expect(reducer(1, sizeChanged(22))).to.eql(22);
    });

    it('should return new size when passed as string', () => {
      expect(reducer(1, sizeChanged('22'))).to.eql(22);
    });

    it('should reset when back is pressed', () => {
      expect(reducer(22, backPressed())).to.eql(1);
    });
  });
});
