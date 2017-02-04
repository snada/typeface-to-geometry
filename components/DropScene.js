import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { jsonDropped } from '../actions';

class DropScene extends React.Component {
  constructor() {
    super();
    this.state = { hover: false };
    this.toggleHover = () => {
      this.setState({ hover: !this.state.hover });
    };

    this.toggleAndDrop = (event) => {
      this.toggleHover();
      this.props.jsonDropped(event);
    }
  }

  render() {
    return(
      <div className={`centered drop ${this.state.hover ? 'hover' : ''}`}
        onDragEnter={this.toggleHover}
        onDragLeave={this.toggleHover}
        onDrop={this.toggleAndDrop}
      >
        <p className="centered">
          <h1><i className="arrow circle down icon"></i></h1>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  jsonDropped: (event) => {
    if(event.dataTransfer.files.length == 1 && event.dataTransfer.files[0].path.endsWith('.json')
    ) {
      dispatch(jsonDropped([event.dataTransfer.files[0]]));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropScene);
