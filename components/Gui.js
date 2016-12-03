import React from 'react';
import { connect } from 'react-redux';

import { textChanged } from '../actions';

const guiStyle = {
  position: 'fixed',
  left: 10,
  top: 10
};

class Gui extends React.Component {
  render() {
    return <input type="text" value={this.props.text} onChange={this.props.textChanged} style={guiStyle} />
  }
}

const mapStateToProps = (state) => ({
  text: state.text
});

const mapDispatchToProps = (dispatch) => ({
  textChanged: (event) => {
    dispatch(textChanged(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gui);
