import React from 'react';
import TagsContainer from './TagsContainer';

const TagPicker = ({ initialTags, allTags, userTags, onTagAssigned, onTagRemoved }) => {
  const tagPickerStyle = {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '16px',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div className="tag-picker" style={tagPickerStyle}>
      <TagsContainer
        tags={initialTags}
        allTags={allTags}
        userTags={userTags}
        onRemove={onTagRemoved}
        onTagAssigned={onTagAssigned}
      />
    </div>
  );
};

export default TagPicker;
