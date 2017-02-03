import jsonfile from 'jsonfile';

import * as THREE from 'three';

export default (path, font, segments, height, size, color) => {
  let glyphs = {};
  for(var glyph in font.data.glyphs) {
    const g = new THREE.TextGeometry(glyph, {
      font: font,
      size: size,
      height: height,
      curveSegments: segments
    });
    g.computeBoundingBox();
    g.computeVertexNormals();
    glyphs[glyph] = g;
  }

  let alphabet = {};

  for(var property in glyphs) {
    let colors = [];
    let normals = [];
    let vertices = [];

    for(var index in glyphs[property].faces) {
      for(var index2 in glyphs[property].faces[index].vertexNormals) {
        colors.push((color.r / 255), (color.g / 255), (color.b / 255), color.a);
        colors.push((color.r / 255), (color.g / 255), (color.b / 255), color.a);
        colors.push((color.r / 255), (color.g / 255), (color.b / 255), color.a);

        normals.push(glyphs[property].faces[index].vertexNormals[index2].x);
        normals.push(glyphs[property].faces[index].vertexNormals[index2].y);
        normals.push(glyphs[property].faces[index].vertexNormals[index2].z);
        normals.push(glyphs[property].faces[index].vertexNormals[index2].x);
        normals.push(glyphs[property].faces[index].vertexNormals[index2].y);
        normals.push(glyphs[property].faces[index].vertexNormals[index2].z);
        normals.push(glyphs[property].faces[index].vertexNormals[index2].x);
        normals.push(glyphs[property].faces[index].vertexNormals[index2].y);
        normals.push(glyphs[property].faces[index].vertexNormals[index2].z);

        vertices.push(glyphs[property].vertices[glyphs[property].faces[index].a].x);
        vertices.push(glyphs[property].vertices[glyphs[property].faces[index].a].y);
        vertices.push(glyphs[property].vertices[glyphs[property].faces[index].a].z);
        vertices.push(glyphs[property].vertices[glyphs[property].faces[index].b].x);
        vertices.push(glyphs[property].vertices[glyphs[property].faces[index].b].y);
        vertices.push(glyphs[property].vertices[glyphs[property].faces[index].b].z);
        vertices.push(glyphs[property].vertices[glyphs[property].faces[index].c].x);
        vertices.push(glyphs[property].vertices[glyphs[property].faces[index].c].y);
        vertices.push(glyphs[property].vertices[glyphs[property].faces[index].c].z);
      }
    }

    alphabet[property] = {
      colors,
      normals,
      vertices
    };
  }

  jsonfile.writeFileSync(path, alphabet);
};
