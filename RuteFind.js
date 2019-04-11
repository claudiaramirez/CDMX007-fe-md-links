const path = require('path');
const RuteFind = (file) => {
  if (path.isAbsolute(file) === true) { // si es absoluta
    return file; // no se hace nada y se devuelve el archivo
  }
  else {
    return path.resolve(file); // de lo contrario, obtenemos url absoluta
  }
};
module.exports.RuteFind = RuteFind;
