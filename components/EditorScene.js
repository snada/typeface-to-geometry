import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';

import { backPressed } from '../actions';

class EditorScene extends React.Component {
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

const mapStateToProps = (state) => ({
  font: state.font
});

const mapDispatchToProps = (dispatch) => ({
  backPressed: (e) => {
    dispatch(backPressed());
    hashHistory.goBack();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorScene);
