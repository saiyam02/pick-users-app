import React, { useState, useEffect } from 'react';
import { DropdownWrapper } from './DropDownWrapper';
import Chip from './Chip';
import { DropdownItem } from './DropDownItem';
import crossIcon from '../assets/crossIcon.png';
// import { ReactComponent as CloseIcon } from '../assets/Close.svg';
import { Option } from './data';
import styles from '../styles/Dropdown.module.scss';

interface DropdownProps {
  options: Option[];
  onChangeValue?: (options: Option[]) => void;
  wrapperClass?: string;
  contentClass?: string;
  targetClass?: string;
}

const Dropdown = ({
  options,
  onChangeValue,
  wrapperClass,
  targetClass,
  contentClass,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<Option[]>([]);
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [highlightItem, setHighlightItem] = useState<Option | null>(null);
  const unselectedItems = items.filter((option) => !isSelected(option));

  useEffect(() => {
    setItems(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, options]);

  function isSelected(option: Option) {
    return selectedItems?.findIndex((e) => e.value === option.value) !== -1;
  }

  const handleItemClick = (option: Option) => {
    let updatedItems = [];
    const isAlreadySelected = isSelected(option);
    if (isAlreadySelected) {
      updatedItems = selectedItems.filter((e) => e.value !== option.value);
    } else {
      updatedItems = [...selectedItems, option];
    }
    setSelectedItems(updatedItems);
    onChangeValue && onChangeValue(updatedItems);
    setHighlightItem(null);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length) {
      setHighlightItem(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !searchQuery.length && selectedItems.length) {
      const lastItem: Option = selectedItems[selectedItems.length - 1];
      if (highlightItem) {
        handleItemClick(lastItem);
        setHighlightItem(null);
      } else {
        setHighlightItem(lastItem);
      }
    }
  };

  return (
    <DropdownWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      labelChips={selectedItems?.map((item: Option) => (
        <Chip
          key={item.value as React.Key}
          label={item.label}
          leading={
            item.icon && (
              <img
                className={styles.chip__leadingIcon}
                src={item.icon}
                alt="icon"
              />
            )
          }
          isSelected={highlightItem?.value === item.value}
          trailing={
            <img
              src={crossIcon}  
              className={styles.chip__closeIcon}
              onClick={(e) => {
                e.stopPropagation();
                handleItemClick(item);
              }}
            />
          }
          className={styles.chip}
        />
      ))}
      onInputChange={handleSearchInputChange}
      onInputKeyPress={handleKeyPress}
      className={wrapperClass}
      contentClass={contentClass}
      targetClass={targetClass}
    >
      {unselectedItems.length ? (
        unselectedItems.map((option) => (
          <DropdownItem
            key={option.value as React.Key}
            option={option}
            onClick={() => handleItemClick(option)}
          />
        ))
      ) : (
        <div>
          <p style={{ margin: '0.8em' }}>No items found</p>
        </div>
      )}
    </DropdownWrapper>
  );
};

export { Dropdown };
