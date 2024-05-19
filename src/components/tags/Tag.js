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
                padding: '0 8px',
                borderRadius: '16px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s, color 0.3s',
            }}
            onDelete={isHovered ? () => onRemove(tag.uuid) : null}
            deleteIcon={<CloseIcon style={{ color: textColor, fontSize: '16px' }} />}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        />
    );
};

export default Tag;
