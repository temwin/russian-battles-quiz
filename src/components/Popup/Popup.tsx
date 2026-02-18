import styles from './Popup.module.css';
import type { Battle } from '../../types';

interface PopupProps {
  battle: Battle;
  onClose: () => void;
}

export default function Popup({ battle, onClose }: PopupProps) {
  return (
    <>
      {/* Затемнение фона */}
      <div className={styles.overlay} onClick={onClose} />
      
      {/* Само всплывающее окно */}
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <h2 className={styles.title}>{battle.name}</h2>
        <p className={styles.date}>{battle.date}</p>
        <p className={styles.description}>{battle.description}</p>
        
        {battle.image && (
          <img 
            src={battle.image} 
            alt={battle.name}
            className={styles.image}
          />
        )}
      </div>
    </>
  );
}