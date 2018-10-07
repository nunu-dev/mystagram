import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const FeedPhoto = (props, context) => {
  console.log(props);
  return <div className={styleMedia.FeedPhoto}>hello!</div>;
};

FeedPhoto.PropTypes = {
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  like_count: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.arrayOf({
      message: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  created_at: PropTypes.string.isRequiredD
};

export default FeedPhoto;
