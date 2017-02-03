import chai, { expect } from 'chai';

import * as THREE from 'three';

import alphabetExporter from '../../libs/alphabetExporter';

import fs from 'fs';
import path from 'path';
import jsonfile from 'jsonfile';

describe('alphabetExporter', () => {
  it('should export the alphabet', () => {
    const fontPath = path.resolve('test/mocks/helvetiker_regular.typeface.json');
    const loadedFont = new THREE.Font(jsonfile.readFileSync(fontPath));

    const outputPath = path.resolve('test/mocks/output.json');
    const segments = 1;
    const height = 0;
    const size = 1;
    const color = {
      r: 1,
      g: 0.5,
      b: 0,
      a: 1
    };

    alphabetExporter(outputPath, loadedFont, segments, height, size, color);

    let expected = jsonfile.readFileSync(path.resolve('test/mocks/expected.json'));
    let output = jsonfile.readFileSync(outputPath);

    expect(expected).to.eql(output);

    //fs.unlink(outputPath);
  });
});
