import { createRef } from "react";

export default function Modal({ photo, toggleModal }) {
  const backDropRef = createRef();

  // useEffect(() => {
  //   window.addEventListener("keydown", (evt) => {
  //     const { current } = backDropRef;
  //     if (current && current !== evt.target) return;
  //     return () => toggleModal();
  //   });
  // }, []);

  const handleBackDrop = (evt) => {
    const { current } = backDropRef;
    if (current && current !== evt.target) return;
    toggleModal();
  };

  return (
    <div className="Overlay" onClick={handleBackDrop}>
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
