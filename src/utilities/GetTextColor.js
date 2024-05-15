const getTextColor = (backgroundColor) => {
    // If backgroundColor is a color name, convert it to a hexadecimal code
    const tempElem = document.createElement('div');
    tempElem.style.color = backgroundColor;
    document.body.appendChild(tempElem);
    const computedColor = getComputedStyle(tempElem).color;
    document.body.removeChild(tempElem);
  
    // Parse RGB components from computed color string
    let r = 0, g = 0, b = 0;
    const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
    
    const hexMatch = hexRegex.exec(computedColor);
    const rgbMatch = rgbRegex.exec(computedColor);
  
    if (hexMatch) {
      r = parseInt(hexMatch[1], 16);
      g = parseInt(hexMatch[2], 16);
      b = parseInt(hexMatch[3], 16);
    } else if (rgbMatch) {
      r = parseInt(rgbMatch[1]);
      g = parseInt(rgbMatch[2]);
      b = parseInt(rgbMatch[3]);
    }
  
    // Calculate the perceptive luminance (aka luma)
    const luma = ((0.299 * r) + (0.587 * g) + (0.114 * b)) / 255;
  
    // Return black for bright colors, white for dark colors
    return luma > 0.5 ? '#000' : '#fff';
  };

  export default getTextColor;
  