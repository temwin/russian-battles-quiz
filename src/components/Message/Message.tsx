import styles from './Message.module.css';

interface MessageProps {
  text: string;
  type: 'success' | 'error';  // success - зеленый, error - красный
}

export default function Message({ text, type }: MessageProps) {
  return (
    <div className={`${styles.message} ${styles[type]}`}>
      {text}
    </div>
  );
}
