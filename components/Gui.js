import React from 'react';
import { connect } from 'react-redux';

import { textChanged, wireframeSwitched } from '../actions';

const guiStyle = {
  position: 'fixed',
  left: 10,
  top: 10
};

class Gui extends React.Component {
  render() {
    return (
      <div style={guiStyle}>
        <input type="text" value={this.props.text} onChange={this.props.textChanged} style={guiStyle} />
        <br /><br />
        <input type="checkbox" onClick={this.props.wireframeSwitched} /> Wireframe
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  text: state.text
});

const mapDispatchToProps = (dispatch) => ({
  textChanged: (event) => {
    dispatch(textChanged(event.target.value));
  },

  wireframeSwitched: (event) => {
    dispatch(wireframeSwitched(event.target.checked));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gui);
