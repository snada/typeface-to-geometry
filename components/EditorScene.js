import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';

import { windowResized, backPressed } from '../actions';

let _f;

class EditorScene extends React.Component {
  updateDimensions() {
    let updateWidth  = window.innerWidth;
    let updateHeight = window.innerHeight;
    this.props.windowResized(updateWidth, updateHeight);
  }

  componentDidMount() {
    this.updateDimensions();
    _f = this.updateDimensions.bind(this);
    window.addEventListener("resize", _f);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", _f);
  }

  render() {
    return (
      <div>
        <div>Font is: {this.props.font.data ? JSON.stringify(this.props.font.data.familyName) : 'wait...'}</div>
        <br />
        <button onClick={this.props.backPressed}>Go back</button>
      </div>
    );
  }
}

EditorScene.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

const mapStateToProps = (state) => ({
  font: state.font
});

const mapDispatchToProps = (dispatch) => ({
  backPressed: (e) => {
    dispatch(backPressed());
    hashHistory.goBack();
  },

  windowResized: (width, height) => {
    dispatch(windowResized(width, height));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorScene);
