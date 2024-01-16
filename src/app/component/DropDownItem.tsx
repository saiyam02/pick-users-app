import classNames from 'classnames';
import { Option } from './data';
import styles from '../styles/DropDownItem.module.scss';

interface DropdownItemProps {
  option: Option;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const DropdownItem = ({ option, onClick }: DropdownItemProps) => {
  const itemClassNames = classNames(styles.container, {});
  return (
    <div className={itemClassNames} onClick={onClick}>
      {option.icon && (
        <img className={styles.container__icon} src={option.icon} alt="icon" />
      )}
      <span className={styles.container__title}>{option.label}</span>
      <span className={styles.container__subtitle}>{option.subLabel}</span>
    </div>
  );
};

export { DropdownItem };