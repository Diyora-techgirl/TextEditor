import React, { useState } from 'react';
import styles from './style.module.scss'; 

const InsertLinkModal = ({ isOpen, onClose, onInsert }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    onInsert(url);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Insert Link</h2>
        <div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Insert URL"
            required
          />
          <button type="button" onClick={handleSubmit}>Insert</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default InsertLinkModal;
