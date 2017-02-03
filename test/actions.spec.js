import chai, { expect } from 'chai';
import spies from 'chai-spies';
chai.use(spies);

import jsonfile from 'jsonfile';

import * as THREE from 'three';

import * as actions from '../actions';

describe('actions', () => {
  describe('save alphabet', () => {
    it('should notify about saving alphabet', () => {
      const path = '/tmp/file.json';

      const getState = () => ({ font: 'font', segments: 'segments', height: 'height', size: 'size' });
      let spy = chai.spy();

      let returnedFunction = actions.saveAlphabet(path, spy);

      returnedFunction(undefined, getState);

      expect(returnedFunction).to.be.a('function');
      expect(spy).to.have.been.called().with('font', 'segments', 'height', 'size');
    });
  });

  describe('color changed', () => {
    it('should notify about color changing', () => {
      const r = 2;
      const g = 44;
      const b = 56;
      const a = 1;
      const expectedAction = {
        type: actions.COLOR_CHANGED,
        color: {
          r, g, b, a
        }
      };

      expect(actions.colorChanged({r, g, b, a})).to.eql(expectedAction);
    });
  });

  describe('size changed', () => {
    it('should notify about size changing', () => {
      const value = 2;
      const expectedAction = { type: actions.SIZE_CHANGED, value };

      expect(actions.sizeChanged(value)).to.eql(expectedAction);
    });
  });

  describe('bevel changed', () => {
    it('should notify about bevel changing', () => {
      const expectedAction = { type: actions.BEVEL_CHANGED };

      expect(actions.bevelChanged()).to.eql(expectedAction);
    });
  });

  describe('bevel thickness changed', () => {
    it('should notify about bevel thickness changing', () => {
      const value = 2;
      const expectedAction = { type: actions.BEVEL_THICKNESS_CHANGED, value };

      expect(actions.bevelThicknessChanged(value)).to.eql(expectedAction);
    });
  });

  describe('bevel size changed', () => {
    it('should notify about bevel size changing', () => {
      const value = 2;
      const expectedAction = { type: actions.BEVEL_SIZE_CHANGED, value };

      expect(actions.bevelSizeChanged(value)).to.eql(expectedAction);
    });
  });

  describe('camera changed', () => {
    it('should notify about camera changing', () => {
      const posValue = 1;
      const rotValue = 2;
      const position = { posValue };
      const rotation = { rotValue }
      const expectedAction = { type: actions.CAMERA_CHANGED, position, rotation };

      expect(actions.cameraChanged(position, rotation)).to.eql(expectedAction);
    });
  });

  describe('font loaded', () => {
    it('should notify about font loading', () => {
      const font = { glyphs: [] };

      const returnedFunction = actions.fontLoaded(font);
      const spy = chai.spy();

      returnedFunction(spy);

      expect(spy).to.have.been.called();
    });
  });

  describe('json dropped', () => {
    it('should notify about json being dropped with an empty font if file is undefined', () => {
      const returnedFunction = actions.jsonDropped([undefined]);

      const expectedAction = { type: actions.JSON_DROPPED, font: {} };

      expect(returnedFunction).to.be.a('function');
      expect(returnedFunction(undefined)).to.eql(expectedAction);
    });

    it('should notify about json being dropped', (done) => {
      const path = `${__dirname}/mocks/helvetiker_regular.typeface.json`;

      let loadedFont = new THREE.Font(jsonfile.readFileSync(path));

      let returnedFunction = actions.jsonDropped([{path}]);

      global.XMLHttpRequest = function XMLHttpRequest() {
        this.loadListener = undefined;
        this.url = undefined;
        this.status = 200;

        this.addEventListener = (type, listener) => {
          if(type === 'load') {
            this.loadListener = listener;
          }
        };

        this.open = (method, url, async) => {
          this.url = url;
        };

        this.send = (data) => {
          let response = { status: 200, target: { response: JSON.stringify(jsonfile.readFileSync(this.url)) }};
          this.loadListener(response);
        };
      };

      const expectedAction = { type: actions.FONT_LOADED, font: loadedFont };

      let spy = chai.spy();

      returnedFunction(spy);

      delete global.XMLHttpRequest;

      //expect(spy).to.have.been.called.with(expectedAction);
      expect(spy).to.have.been.called();
      done();
    });
  });

  describe('segments changed', () => {
    it('should notify about segments changing', () => {
      const segments = 2;
      const expectedAction = { type: actions.SEGMENTS_CHANGED, segments };

      expect(actions.segmentsChanged(segments)).to.eql(expectedAction);
    });
  });

  describe('height changed', () => {
    it('should notify about height changing', () => {
      const height = 2;
      const expectedAction = { type: actions.HEIGHT_CHANGED, height };

      expect(actions.heightChanged(height)).to.eql(expectedAction);
    });
  });

  describe('text changed', () => {
    it('should notify about text changing', () => {
      const text = 2;
      const expectedAction = { type: actions.TEXT_CHANGED, text };

      expect(actions.textChanged(text)).to.eql(expectedAction);
    });
  });

  describe('wireframe switched', () => {
    it('should notify about wireframe switching', () => {
      const value = true;
      const expectedAction = { type: actions.WIREFRAME_SWITCHED, value };

      expect(actions.wireframeSwitched(value)).to.eql(expectedAction);
    });
  });

  describe('window resized', () => {
    it('should notify about window resizing', () => {
      const width = 100;
      const height = 50;
      const expectedAction = { type: actions.WINDOW_RESIZED, width, height };

      expect(actions.windowResized(width, height)).to.eql(expectedAction);
    });
  });

  describe('back pressed', () => {
    it('should notify about back being pressed', () => {
      expect(actions.backPressed()).to.eql({ type: actions.BACK_PRESSED });
    });
  });
});
