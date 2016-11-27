import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { jsonDropped } from '../actions';

class DropScene extends React.Component {
  render() {
    return(
      <Dropzone className="centered drop" onDrop={this.props.jsonDropped} accept="application/json">
        <p className="centered">
          {JSON.stringify(this.props.font)}
        </p>
      </Dropzone>
    );
  }
}

const mapStateToProps = (state) => ({
  font: state.font
});

const mapDispatchToProps = (dispatch) => ({
  jsonDropped: (accepted, refused) => {
    dispatch(jsonDropped(accepted));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropScene);
