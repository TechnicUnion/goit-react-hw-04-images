import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from '../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

export default function ImageGallery({ searchQuery, page, onClick, newFetch }) {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setStatus('pending');
    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=30833222-94e556fd2dbde651348f500b2&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(galleryList => {
        if (galleryList.hits.length > 0 && !newFetch) {
          return (
            setGallery(prevState => [...prevState, galleryList]),
            setStatus('resolved')
          );
        } else if (newFetch && galleryList.hits.length > 0) {
          return setGallery([galleryList]), setStatus('resolved');
        }

        return Promise.reject(
          new Error(`По запиту <${searchQuery}> зображення не знайдено`)
        );
      })
      .catch(error => {
        return setError(error), setStatus('rejected');
      });
  }, [newFetch, page, searchQuery]);

  const openModal = data => {
    setShowModal(true);
    setLargeImage(data);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (status === 'idle') {
    return <div>Введіть запит для пошуку</div>;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }

  if (status === 'resolved') {
    console.log(gallery);
    console.log(gallery.length);
    console.log(gallery.length !== Math.ceil(gallery.totalHits / 12));
    return (
      <div>
        {showModal && <Modal image={largeImage} onClose={closeModal} />}
        <ul className={css.gallery}>
          {gallery.map(({ hits }) =>
            hits.map(item => (
              <li className={css.gallery_item} key={item.id}>
                <ImageGalleryItem item={item} onClick={openModal} />
              </li>
            ))
          )}
        </ul>
        {gallery.length !== Math.ceil(gallery[0].totalHits / 12) && (
          <Button onClick={onClick} />
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number,
  onClick: PropTypes.func,
  newFetch: PropTypes.bool,
};
