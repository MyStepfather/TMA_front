import { FC, useEffect, useRef, useState } from 'react';
import styles from './Confirm.module.css';
import cn from 'classnames';
import checkIcon from '../../../public/icons/check.svg';
import { useClickOutside } from 'hooks/useClickOutside';
import { createPortal } from 'react-dom';

interface ConfirmProps {
  text: string | null;
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Confirm: FC<ConfirmProps> = ({
  text,
  isVisible,
  onConfirm,
  onCancel,
}) => {
  const [isDeleted, setIsDeleted] = useState<boolean | null>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  const handleConfirm = () => {
    setIsDeleted(true);
    onConfirm();
  };

  const handleCancel = () => {
    setIsDeleted(false);
    onCancel();
  };

  useClickOutside(confirmRef, handleCancel);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (isDeleted !== null) {
      timeoutId = setTimeout(() => {
        setIsDeleted(null);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isDeleted]);

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <section
      className={cn(styles.wrapper, {
        [styles.visible]: isVisible,
      })}
    >
      {isDeleted !== null ? (
        <div className={styles.container}>
          <img className={styles.icon} src={checkIcon} alt="Иконка" />
          <span className={styles.text}>{text}</span>
        </div>
      ) : (
        <div className={styles.containerQuestion} ref={confirmRef}>
          <div className={styles.question}>
            <span className={styles.text}>{text}</span>
          </div>
          <div className={styles.buttons}>
            <button
              className={cn(styles.button, styles.yes)}
              onClick={handleConfirm}
            >
              Да
            </button>
            <button className={styles.button} onClick={handleCancel}>
              Нет
            </button>
          </div>
        </div>
      )}
    </section>,
    document.body
  );
};