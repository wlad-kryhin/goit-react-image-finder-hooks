import "./App.css";
import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal/Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const KEY = "22313175-89def84c9551dc3c20db3bc15";

const App = () => {
  const [imageName, setImageName] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState([]);

  useEffect(() => {
    if (imageName === null) return;
    setIsLoading(true);
    setError("");
    fetch(
      `https://pixabay.com/api/?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(
          setError(new Error(`Запрос с именем ${imageName} не найдет `)),
        );
      })
      .then((data) => data.hits)
      .then((images) => {
        if (images.length === 0) {
          return setError("Nothing found, please enter a correct keyword!");
        }
        setImages((prevState) => [...prevState, ...images]);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [imageName, page]);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [images]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleForm = (image) => {
    setImages([]);
    setImageName(image);
    setPage(1);
  };

  const toggleModal = () => setIsOpen(!isOpen);

  const findModalImage = (id) => {
    setModalImg(images.filter((image) => image.id === id));
    setIsOpen(!isOpen);
  };

  const toastError = () =>
    toast.error("Nothing found, please enter a correct keyword!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="App">
      <Searchbar onSubmit={handleForm} toast={toastError} />
      {images.length > 0 && (
        <ImageGallery images={images} find={findModalImage} />
      )}
      {error && (
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme={"colored"}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
      {/* {error && <h3 className="error">{error}</h3>} */}
      {images.length > 10 && <Button onClick={loadMore} />}
      {isOpen && <Modal photo={modalImg[0]} toggleModal={toggleModal} />}
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
};

export default App;
