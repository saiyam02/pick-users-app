import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from '../styles/DropdownWrapper.module.scss';

interface DropdownWrapperProps {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  labelChips: React.ReactNode[];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  contentClass?: string;
  targetClass?: string;
  children: React.ReactNode;
}

const DropdownWrapper = ({
  isOpen,
  setIsOpen,
  labelChips,
  onInputChange,
  onInputKeyPress,
  className,
  contentClass,
  targetClass,
  children,
}: DropdownWrapperProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen && setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setIsOpen]);

  return (
    <div ref={dropdownRef} className={classNames(styles.container, className)}>
      <div className={classNames(styles.container__target, targetClass)}>
        {labelChips?.length ? labelChips : null}
        <span className={styles.container__target__content}>
          <input
            type="text"
            placeholder="Add New User"
            onChange={onInputChange}
            onKeyDown={onInputKeyPress}
            className={styles.container__target__content__input}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen && setIsOpen(true);
            }}
          />
          {isOpen && (
            <div
              className={classNames(
                styles.container__target__content__options,
                contentClass
              )}
            >
              {children}
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export { DropdownWrapper };
