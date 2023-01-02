import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../styles.module.css';

export default function Modal({ image, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropCkick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropCkick}>
      <div className={css.modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
}

// export default class Modal extends Component {
//   componentDidMount = () => {
//     window.addEventListener('keydown', this.handleKeyDown);
//   };

//   componentWillUnmount = () => {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   };

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropCkick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return (
//       <div className={css.overlay} onClick={this.handleBackdropCkick}>
//         <div className={css.modal}>
//           <img
//             src={this.props.image.largeImageURL}
//             alt={this.props.image.tags}
//           />
//         </div>
//       </div>
//     );
//   }
// }

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
