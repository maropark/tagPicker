import Tag from "./Tag";
import { useState } from "react";
import { Box } from "@mui/material";
import TextSearchAddIcon from "../tags/TextSearchAddIcon";
import i18n from "../../utilities/translations/i18n";

const TagsContainer = ({ tags, allTags, userTags, onRemove, onTagAssigned }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isIconHovered, setIsIconHovered] = useState(false); 
    const [isClicked, setIsClicked] = useState(false); 
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleIconMouseEnter = () => {
      setIsIconHovered(true);
    };
  
    const handleIconMouseLeave = () => {
      setIsIconHovered(false);
    };

    const handleTextFieldClick = () => {
      setIsClicked(true);
    };

    const handleTextFieldBlur = () => {
      setIsIconHovered(false);
      setIsClicked(false);
    };

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '5px',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={{ marginBottom: '8px' }}>
          <h2 style={{ margin: 0 }}>{i18n("tagsTitle")}</h2>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          {tags?.map(tag => (
            <Tag 
              key={tag.uuid} 
              tag={tag} 
              onRemove={onRemove} 
            />
          ))}
          {((isHovered && !isIconHovered) || isIconHovered || isClicked) && (
            <TextSearchAddIcon 
              onTagAssigned={onTagAssigned} 
              tagOptions={allTags} 
              existingTags={userTags} 
              onMouseEnter={handleIconMouseEnter} 
              onMouseLeave={handleIconMouseLeave} 
              onClickTextField={handleTextFieldClick}
              onBlurTextField={handleTextFieldBlur}
            />
          )}
        </Box>
      </Box>
    );
};

export default TagsContainer;
