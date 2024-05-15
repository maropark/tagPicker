import React, { useState, useRef, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

const GenericTextSearchAddIcon = ({
  onAssigned,
  options,
  existing,
  onClickTextField,
  onBlurTextField,
  placeholder,
  labelText,
  createText,
  addButtonColor,
  addButtonHoverColor,
  addButtonTextColor,
  addIconDisabledColor,
  addIconHoverColor,
  addIconSize,
  createItem, // Function to create a new item
}) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  
    const filtered = existing
      ? options.filter(option =>
          option.title.toLowerCase().includes(value.toLowerCase()) &&
          !existing.includes(option.uuid)
        )
      : [];
    setFilteredOptions(filtered);
  };

  const handleAddClick = () => {
    setIsClicked(true);
    onClickTextField();
    setInputValue('');
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.querySelector('input').focus();
      }
    }, 100);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCreate();
    }
  };

  const handleCreate = async () => {
    if (!inputValue.trim()) return;
    
    const existingItem = options.find(option => option.title.toLowerCase() === inputValue.toLowerCase());
    if (existingItem) {
      onAssigned(existingItem.uuid);
    } else {
      try {
        // Call the createItem function passed as prop
        const newItem = await createItem(inputValue);
        onAssigned(newItem.uuid);
      } catch (error) {
        console.error('Error creating item:', error);
      }
    }

    setInputValue('');
    setIsClicked(false);
  };

  return (
    <div
      ref={containerRef}
      className="text-search-add-icon-container"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isClicked ? (
        <>
          <AddCircleIcon
            onClick={handleAddClick}
            color={addIconDisabledColor}
            style={{ fontSize: addIconSize, cursor: 'pointer' }}
          />
          {isHovered && <span style={{ marginLeft: '5px', color: addButtonTextColor, fontSize: '0.8rem', cursor: 'pointer' }}>{labelText}</span>}
        </>
      ) : (
        <Chip
          label={
            <TextField
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              variant="standard"
              fullWidth
              noValidate 
              placeholder={placeholder}
              InputProps={{disableUnderline: true,}}
              onClick={onClickTextField}
              onBlur={onBlurTextField}
            />
          }
          variant="outlined"
        />
      )}
      {isClicked && inputValue.length > 0 && (
        <Paper
          elevation={3}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            borderRadius: '8px', 
            marginTop: '5px',
            maxHeight: '180px',
            maxWidth: '250px',
            overflowY: 'auto',
            overflowX: 'hidden',
            border: '2px solid purple',
          }}
        >
          {filteredOptions.map((option, index) => (
            <Chip
              key={index}
              label={option.title}
              style={{ margin: '5px', cursor: 'pointer' }}
              onClick={() => onAssigned(option.uuid)}
            />
          ))}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleCreate()}
          >
            <AddCircleIcon
              color={addIconDisabledColor}
              style={{ fontSize: addIconSize, cursor: 'pointer' }}
            />
            <span style={{ marginLeft: '5px', color: addButtonTextColor, fontSize: '0.8rem', cursor: 'pointer' }}>{createText}</span>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default GenericTextSearchAddIcon;
