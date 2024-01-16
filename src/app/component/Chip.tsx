import React from 'react';
import classNames from 'classnames';
import styles from '../styles/Chip.module.scss';

interface ChipProps {
  label: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

export const Chip = ({
  label,
  leading,
  trailing,
  isSelected,
  onClick,
  className,
}: ChipProps) => {
  const chipClassnames = classNames(styles.container, className, {
    [styles.container__selected]: isSelected,
  });
  return (
    <div className={chipClassnames} onClick={onClick}>
      {leading}
      <span>{label}</span>
      {trailing}
    </div>
  );
};

export default Chip;
