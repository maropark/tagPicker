import React from 'react';
import TagsContainer from './TagsContainer';

const TagPicker = ({ initialTags, allTags, userTags, onTagAssigned, onTagRemoved }) => {

  return (
    <div className="tag-picker">
      <TagsContainer tags={initialTags} allTags={allTags} userTags={userTags} onRemove={onTagRemoved} onTagAssigned={onTagAssigned} />
    </div>
  );
};

export default TagPicker;
