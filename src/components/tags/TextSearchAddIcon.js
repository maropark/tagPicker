import React, { useState, useRef } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { createTag } from '../../api';
import i18n from '../../utilities/translations/i18n';
import TextSearchAddIconStyles from './TextSearchAddIconStyles';

const TextSearchAddIcon = ({ onTagAssigned, tagOptions, existingTags, onClickTextField, onBlurTextField }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = existingTags
      ? tagOptions.filter(tag =>
          tag.title.toLowerCase().includes(value.toLowerCase()) &&
          !existingTags.includes(tag.uuid)
        )
      : [];
    setFilteredTags(filtered);
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
      handleCreateTag();
      onBlurTextField();
    }
  };

  const handleCreateTag = async () => {
    if (!inputValue.trim()) return;

    const existingTag = tagOptions.find(tag => tag.title.toLowerCase() === inputValue.toLowerCase());
    const isAlreadyAssigned = existingTags.some(uuid => uuid === existingTag?.uuid);

    if (isAlreadyAssigned) {
      setSnackbarMessage(i18n("tagAlreadyAssigned"));
      setSnackbarOpen(true);
    } else if (existingTag) {
      onTagAssigned(existingTag.uuid);
    } else {
      try {
        const newTag = await createTag({ title: inputValue });
        onTagAssigned(newTag.uuid);
      } catch (error) {
        setSnackbarMessage(i18n("errorCreatingTag"));
        setSnackbarOpen(true);
      }
    }

    setInputValue('');
    setIsClicked(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  return (
    <div
      ref={containerRef}
      style={TextSearchAddIconStyles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="text-search-add-icon"
    >
      {!isClicked ? (
        <div style={TextSearchAddIconStyles.addIconWrapper} onClick={handleAddClick} data-testid="add-icon-wrapper">
          <AddCircleIcon style={TextSearchAddIconStyles.addIcon(isHovered)} data-testid="add-icon" />
          {isHovered && <span style={TextSearchAddIconStyles.addIconText}>{i18n("addIconDescription")}</span>}
        </div>
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
              InputProps={{ disableUnderline: true }}
              onClick={onClickTextField}
              onBlur={onBlurTextField}
              style={TextSearchAddIconStyles.textField}
              inputProps={{ "data-testid": "input-text-field" }}
            />
          }
          variant="outlined"
          style={TextSearchAddIconStyles.chip}
          data-testid="chip"
        />
      )}
      {isClicked && inputValue.length > 0 && (
        <Paper elevation={3} style={TextSearchAddIconStyles.paper} data-testid="paper">
          {filteredTags.map((tag, index) => (
            <Chip
              key={index}
              label={tag.title}
              style={TextSearchAddIconStyles.tagChip}
              onClick={() => onTagAssigned(tag.uuid)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#cfb2f6';
                e.currentTarget.style.color = '#4b0082'; // A darker shade of purple for the text
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#cfb2f6';
              }}
              data-testid={`tag-chip-${index}`}
            />
          ))}
          <div style={TextSearchAddIconStyles.createTagWrapper} onClick={() => handleCreateTag()} data-testid="create-tag-wrapper">
            <AddCircleIcon style={{ color: '#cfb2f6' }} data-testid="create-tag-icon" />
            <span style={TextSearchAddIconStyles.createTagText}>{i18n("createTagIconDescription")}</span>
          </div>
        </Paper>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TextSearchAddIcon;
