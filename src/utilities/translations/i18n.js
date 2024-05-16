const i18n = (key) => {
  const translations = require(`./translations_${navigator.language.split('-')[0]}.js`);
  // const translations = require(`./translations_ploc.js`); //ploc test
  
  return translations.default[key] || key;
};

export default i18n;