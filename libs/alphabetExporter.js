import jsonfile from 'jsonfile';
const THREE = require("three");

export default (path, font, segments, height) => {
  let glyphs = {};
  for(var glyph in font.data.glyphs) {

  // PARAMETRIZE SIZE; HEIGHT, SEGMENTS! EVEN BEVEL

    const g = new THREE.TextGeometry(glyph, {
      font: font,
      size: 0.12,
      height: height,
      curveSegments: segments
    });
    g.computeBoundingBox();
    g.computeVertexNormals();
    glyphs[glyph] = g;
  }

  let alphabet = {};

  for(var property in glyphs) {
    let normals = [];
    let vertices = [];

    for(var index in glyphs[property].faces) {
      for(var index2 in glyphs[property].faces[index].vertexNormals) {
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
      normals,
      vertices
    };
  }

  jsonfile.writeFile(path, alphabet, (err) => {
    if(err) {
      console.error(err);
    }
  });
};
