import { createRef, useEffect } from "react";

export default function Modal({ photo, toggleModal }) {
  const backDropRef = createRef();

  const handleBackDrop = (evt) => {
    const { current } = backDropRef;
    if (current && current !== evt.target) return;
    toggleModal();
  };

  useEffect(() => {
    const handleEscModal = (evt) => {
      if (evt.code !== "Escape") return;
      toggleModal();
    };
    window.addEventListener("keydown", handleEscModal);
    return () => window.removeEventListener("keydown", handleEscModal);
  }, [toggleModal]);

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
