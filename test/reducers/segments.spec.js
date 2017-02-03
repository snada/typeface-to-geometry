import chai, { expect } from 'chai';

import reducer from '../../reducers/segments';

import { segmentsChanged, SEGMENTS_CHANGED, backPressed, BACK_PRESSED } from '../../actions';

describe('reducers', () => {
  describe('segments', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(1);
    });

    it('should return new segments when passed as number', () => {
      expect(reducer(1, segmentsChanged(22))).to.eql(22);
    });

    it('should return new segments when passed as string', () => {
      expect(reducer(1, segmentsChanged('22'))).to.eql(22);
    });

    it('should reset when back is pressed', () => {
      expect(reducer(22, backPressed())).to.eql(1);
    });
  });
});
