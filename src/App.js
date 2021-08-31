import './App.css';
import { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from 'react-loader-spinner';
import Modal from './components/Modal/Modal';
import PropTypes from 'prop-types';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const KEY = '22313175-89def84c9551dc3c20db3bc15';

class App extends Component {
  state = {
    imageName: '',
    images: [],
    page: 1,
    isLoading: false,
    error: '',
    modalImg: [],
  };

  static propTypes = { onSubmit: PropTypes.func };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageName !== this.state.imageName) {
      this.setState({ images: [] });
      this.searchImages();
    }
    if (prevState.page !== this.state.page) {
      this.searchImages();
    }
    if (prevState.images !== this.state.images) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  searchImages = () => {
    const { imageName, page } = this.state;
    this.setState({ isLoading: true, error: '' });
    setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            this.setState({
              error: new Error(`Запрос с именем ${imageName} не найдет `),
            }),
          );
        })
        .then(data => data.hits)
        .then(images => {
          if (images.length === 0) {
            return this.setState({
              error: 'Nothing found, please enter a correct keyword!',
            });
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }, 1000);
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  handleForm = image => {
    this.setState({ imageName: image });
  };

  toggleModal = () => this.setState({ isOpen: !this.state.isOpen });

  findModalImage = id => {
    this.setState(prevState => ({
      modalImg: prevState.images.filter(image => image.id === id),
      isOpen: !this.state.isOpen,
    }));
  };

  toastError = () =>
    toast.error('Nothing found, please enter a correct keyword!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  render() {
    const { images, isLoading, isOpen, modalImg, error } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleForm} toast={this.toastError} />
        {images.length > 0 && (
          <ImageGallery images={images} find={this.findModalImage} />
        )}
        {error && (
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme={'colored'}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        )}
        {/* {error && <h3 className="error">{error}</h3>} */}
        {images.length > 10 && <Button onClick={this.loadMore} />}
        {isOpen && <Modal photo={modalImg[0]} toggleModal={this.toggleModal} />}
        {isLoading && (
          <div className="loader">
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
