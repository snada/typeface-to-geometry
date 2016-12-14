import isDev from 'electron-is-dev';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { Router, hashHistory, Route, IndexRoute, Link } from 'react-router';

import text from './reducers/text';
import font from './reducers/font';
import height from './reducers/height';
import glyphs from './reducers/glyphs';
import segments from './reducers/segments';
import wireframe from './reducers/wireframe';
import windowSize from './reducers/windowSize';

let store = createStore(
  combineReducers({ text, font, height, glyphs, segments, wireframe, windowSize }),
  applyMiddleware(thunk, createLogger())
);

import DropScene from './components/DropScene';
import EditorScene from './components/EditorScene';

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={DropScene} />
        <Route path="editor" component={EditorScene} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
