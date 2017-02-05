import jsonfile from 'jsonfile';

import * as THREE from 'three';

export default (path, font, segments, height, size, color) => {
  const alphabet = {};

  Object.keys(font.data.glyphs).forEach((glyph) => {
    const geometryGlyph = new THREE.TextGeometry(glyph, {
      font,
      size,
      height,
      curveSegments: segments
    });
    geometryGlyph.computeBoundingBox();
    geometryGlyph.computeVertexNormals();

    const colors = [];
    const normals = [];
    const vertices = [];

    geometryGlyph.faces.forEach((face) => {
      colors.push((color.r / 255), (color.g / 255), (color.b / 255), color.a);
      colors.push((color.r / 255), (color.g / 255), (color.b / 255), color.a);
      colors.push((color.r / 255), (color.g / 255), (color.b / 255), color.a);

      face.vertexNormals.forEach((vertexNormal) => {
        normals.push(vertexNormal.x);
        normals.push(vertexNormal.y);
        normals.push(vertexNormal.z);
      });

      vertices.push(
        geometryGlyph.vertices[face.a].x,
        geometryGlyph.vertices[face.a].y,
        geometryGlyph.vertices[face.a].z,
        geometryGlyph.vertices[face.b].x,
        geometryGlyph.vertices[face.b].y,
        geometryGlyph.vertices[face.b].z,
        geometryGlyph.vertices[face.c].x,
        geometryGlyph.vertices[face.c].y,
        geometryGlyph.vertices[face.c].z
      );
    });

    alphabet[glyph] = {
      colors,
      normals,
      vertices
    };
  });

  jsonfile.writeFileSync(path, alphabet);
};
