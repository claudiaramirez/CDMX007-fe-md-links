const fs = require('fs');
const path = require('path');
const colors = require('colors');
let markdownLinkExtractor = require('markdown-link-extractor'); 
let urlExists = require('promised-url-exists');

let options = {}; // opciones de usuario
let successLink = 0; // links validos
let failLink = 0; // links rotos
if (process.argv.includes('--validate')) options.validate = true;
if (process.argv.includes('--stats')) options.stats = true;
let accion = [] // Init Array 
process.argv.forEach(function (val, index, array) { // Get actions terminar line
  accion.push(val); // order array command line User
});
const RuteFind = (file) => {// funcion para URl absoluta
      if (path.isAbsolute(file) === true) { // si es absoluta
            return file; // no se hace nada y se devuelve el archivo
      } else {
            return path.resolve(file); // de lo contrario, obtenemos url absoluta
      }
};
let urlFile = RuteFind(accion[2]); // obtener la url que puso el usuario (URL path)
var markdown = fs.readFileSync(urlFile).toString(); // obtener archivo en texto
var links = markdownLinkExtractor(markdown); //obtener links
validarUrl(links) // funcion de validacion de links
if(options.validate == true && options.stats != true){ // if --validate
      return ;
} else if(options.stats == true && options.validate != true){  // if --stats
      setTimeout(function(){
            console.log('Totals: '+(successLink+failLink)+' Unique: '+(successLink+failLink) )
      },2000)

}else if(options.stats == true && options.validate == true){ // if --validate --stats
      setTimeout(function(){
            console.log('Totals: '+(successLink+failLink)+' Unique: '+(successLink+failLink) +' Broken: '+failLink)
      },2000)
}else{
      console.log('falta indicar parametros')
}
function validarUrl(listlinks){
      let iterator = 1;
      listlinks.forEach(function (link, title, text, index) {
            urlExists(link.href)
                  .then(({exists}) => {
                        if(exists == true){
                              successLink++;

                              console.log('File: '+urlFile.grey+' - line: '+iterator +' - '+link.href.blue +' Status: Ok 200 '.green +' - text: '+link.text.italic.gray)
                        }else{
                              failLink++;
                              console.log('File: '+urlFile.grey+' - line: '+iterator +' - '+link.href.blue + ' Status: Fail 404 '.red +' - text: '+link.text.italic.grey)
                        }
                        iterator++;
                  })
                  .catch(error => { console.log(error); });
      });
}