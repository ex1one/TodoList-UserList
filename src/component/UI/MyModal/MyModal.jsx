import React from 'react';
import cl from './MyModal.module.css';

const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = [cl.myModal];
  if (visible) {
    rootClasses.push(cl.active);
  }

  return (
    <button type="button" className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <button type="button" className={cl.myModalContext} onClick={((event) => event.stopPropagation())}>
        {children}
      </button>
    </button>
  );
};

export default MyModal;
