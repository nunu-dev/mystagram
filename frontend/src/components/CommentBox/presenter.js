import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const CommentBox = (props, context) => {
  return <form>
    <textarea placeholder={context.t('Add a commnet...')} />
  </form>;
};

CommentBox.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CommentBox;
