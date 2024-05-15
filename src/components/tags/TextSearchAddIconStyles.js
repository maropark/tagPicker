const TextSearchAddIconStyles = {
    container: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '5px',
      position: 'relative',
    },
    addIconWrapper: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    addIcon: (isHovered) => ({
      color: isHovered ? '#cfb2f6' : '#cccccc',
      transition: 'color 0.3s',
    }),
    addIconText: {
      marginLeft: '5px',
      color: '#cfb2f6',
      fontSize: '0.8rem',
    },
    textField: {
      padding: '0 8px',
      width: '150px',
    },
    chip: {
      borderRadius: '16px',
      padding: '0 8px',
      margin: '0 4px',
      borderColor: '#cfb2f6',
      color: '#cfb2f6',
    },
    paper: {
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
      border: '2px solid #cfb2f6',
      zIndex: 1,
    },
    tagChip: {
      margin: '5px',
      cursor: 'pointer',
      color: '#cfb2f6',
      borderColor: '#cfb2f6',
      backgroundColor: 'transparent',
      transition: 'background-color 0.3s, color 0.3s',
    },
    createTagWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px',
      cursor: 'pointer',
      color: '#cfb2f6',
    },
    createTagText: {
      marginLeft: '5px',
      color: '#cfb2f6',
      fontSize: '0.8rem',
    },
  };

export default TextSearchAddIconStyles;
