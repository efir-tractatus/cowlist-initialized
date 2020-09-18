import React from 'react';
import ReactDOM from 'react-dom';
const modal = document.getElementById('modal');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.state = {
      cowModal: false,
    };
  }


  componentDidUpdate(prevState, prevProps) {
    if (prevProps.cowModal !== this.props.cowModal) {
        modal.appendChild(this.el);
        this.setState({
            cowModal: true,
        })
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Modal;
