import { Component, createRef } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  backDropRef = createRef();
  static propTypes = {
    photo: PropTypes.object,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscModal);
  }
  handleEscModal = evt => {
    if (evt.code !== 'Escape') return;
    this.props.toggleModal();
  };

  handleBackDrop = evt => {
    const { current } = this.backDropRef;
    if (current && current !== evt.target) return;
    this.props.toggleModal();
  };
  render() {
    const { photo } = this.props;
    return (
      <div className="Overlay" onClick={this.handleBackDrop}>
        <div className="Modal">
          <img
            src={photo.largeImageURL}
            alt={photo.tags}
            className="modal__img"
          />
        </div>
      </div>
    );
  }
}
