import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import getTextColor from '../../utilities/GetTextColor';
import { useState } from 'react';

const Tag = ({ tag, onRemove }) => {
    const [isHovered, setIsHovered] = useState(false);
    const textColor = getTextColor(tag.color);

    return (
        <Chip
            label={tag.title}
            style={{
                color: textColor,
                backgroundColor: tag.color,
                margin: '4px',
                padding: '0 8px', // Add padding for a better look
                borderRadius: '16px', // Make the tags more rounded
                cursor: 'pointer',
                fontWeight: 'bold', // Make text bold
                transition: 'background-color 0.3s, color 0.3s', // Smooth transition for hover effect
            }}
            onDelete={isHovered ? () => onRemove(tag.uuid) : null}
            deleteIcon={<CloseIcon style={{ color: textColor, fontSize: '16px' }} />}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        />
    );
};

export default Tag;
