import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as HeartOutLineIcon } from '../assets/svg/heart-outline.svg';
import { ReactComponent as HeartFilledIcon } from '../assets/svg/heart-filled.svg';


function SaveButton({ docID, isFavorite }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const onClick = async () => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className="btn btn-info"
      aria-label="Save this listing"
      disabled={isSubmitting}>
      {isFavorite ? (
        <HeartFilledIcon className="w-6 h-6 text-white" />
      ) : (
        <HeartOutLineIcon className="w-6 h-6 text-white" />
      )}
    </button>
  );
}

export default SaveButton;
