import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export default function Facebook() {
  return (
    <div style={styles.iconContainer}>
      <FontAwesomeIcon icon={faFacebookF} color='white' size='lg'/>
    </div>
  )
}

const styles = {
  iconContainer: {
    backgroundColor: '#1877f2', // Facebook's blue color
    width: '40px',
    height: '40px',
    borderRadius: '50%', // Makes it rounded
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
