const fs = require('fs');
const path = require('path');
const colors = require('colors');
let ruta = require ('./ruta.js')
let markdownLinkExtractor = require('markdown-link-extractor');
let urlExists = require('promised-url-exists');
let options = {}; // opciones de usuario
let successLink = 0; // links validos
let failLink = 0; // links rotos

ruta.prueba

if (process.argv.includes('--validate')) options.validate = true;
if (process.argv.includes('--stats')) options.stats = true;

let accion = [] // Init Array 
process.argv.forEach(function (val, index, array) { // Get actions terminar line
  accion.push(val); // order array command line User
  //console.log(index)
});

const RuteFind = (file) => { // funcion para URl absoluta
  if (path.isAbsolute(file) === true) { // si es absoluta
    return file; // no se hace nada y se devuelve el archivo
  } else {
    return path.resolve(file); // de lo contrario, obtenemos url absoluta
  }
};

let urlFile = RuteFind(accion[2]); // obtener la url que puso el usuario (URL path)
var markdown = fs.readFileSync(urlFile).toString(); // obtener archivo en texto
var links = markdownLinkExtractor(markdown); //obtener links
//console.log(links)

const uniqueCount = (links) => {
  let arr = []
  count = 0;
  for (let i = 0; i < links.length; i++) {
    for (let j = i + 1; j < links.length; j++) {
      if (links[i].href == links[j].href) {
        arr.push(links[j].href)
        count++
      }
    }
  }
  let unique = links.length - count;
  return unique;
}
//console.log(arr, count, countDos )
//console.log(unique)
const unique = uniqueCount(links);

const validarUrl = (listlinks) => {
  let iterator = 1;
  listlinks.forEach((item, title, text, index) => {
    urlExists(item.href)
      .then(({exists}) => {
        if (exists == true) {
          console.log('File: ' + urlFile.grey + ' - line: ' + iterator + ' - ' + item.href.blue + ' Status: Ok 200 '.green + ' - text: ' + item.text.italic.gray)
        } else {
          console.log('File: ' + urlFile.grey + ' - line: ' + iterator + ' - ' + item.href.blue + ' Status: Fail 404 '.red + ' - text: ' + item.text.italic.grey)
        }
        iterator++;
      })
      .catch(error => {
        console.log(error);
      });
  });
  return listlinks
}

const validateStatus = (listlinks) => {
      listlinks.forEach((item, title, text, index) => {
        urlExists(item.href)
          .then(({exists}) => {
            if (exists == true) {
              successLink++;
            } else {
              failLink ++;
            }
          }).catch(error => {
            console.log(error);
          });
      });
      return listlinks
}

const validateComander = (links) => {
      if (options.validate == true && options.stats != true) { // if --validate (undefined, null, false, ...)
            validarUrl(links) // funcion de validacion de links
      } else if (options.stats == true && options.validate != true) { // if --stats 
            setTimeout(function () {
            console.log('Total: ' + links.length + ' Unique: ' + unique)
            }, 3000)
      } else if (options.stats == true && options.validate == true) { // if --validate --stats
            validateStatus(links)
            setTimeout(function () {
            console.log('Total: ' + links.length + ' Unique: ' + unique + ' Broken: ' + failLink)
            }, 3000)
      } else {
            console.log('falta indicar parametros')
      }
}
validateComander(links);