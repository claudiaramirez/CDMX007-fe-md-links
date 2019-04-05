
const fs = require('fs');
const path = require('path');
let markdownLinkExtractor = require('markdown-link-extractor'); 
let urlExists = require('promised-url-exists');

// Get actions terminar line
let accion = [] // Init Array 
process.argv.forEach(function (val, index, array) {
  accion.push(val); // order array command line User
});

// funcion para URl absoluta
const RuteFind = (file) => {
      if (path.isAbsolute(file) === true) { // si es absoluta
          return file; // no se hace nada y se devuelve el archivo
      } else {
            return path.resolve(file); // de lo contrario, obtenemos url absoluta
      }
};
// obteniendo URL path
let urlFile = RuteFind(accion[2]); // obtener la url que puso el usuario
var markdown = fs.readFileSync(urlFile).toString(); // obtener archivo en texto
var links = markdownLinkExtractor(markdown); //obtener links

// Decition
let failLink = 0; // links rotos
let successLink = 0; // links validos
if(accion[3]== '--validate' && accion.length <= 4){
      //get links and validate one by one
      links.forEach(function (link, title, text) {
            urlExists(link.href)
                  .then(({exists}) => {
                        //console.log(exists); // true
                        if(exists == true){
                              successLink++;
                              console.log(urlFile+' - '+link.href+' ok 200 -  '+link.text)
                        }else{
                              failLink++;
                              console.log(urlFile+' - '+link.href+' fail 404 -  '+link.text)
                        }
                  })
                  .catch(error => {
                        console.log(error);
            });
      });

} else if(accion[3]== '--stats' && accion.length <= 4){
      console.log('estadistica')
      //get links and validate one by one
      links.forEach(function (link, title, text) {
            urlExists(link.href)
                  .then(({exists}) => {
                        //console.log(exists); // true
                        if(exists == true){
                              successLink++;
                              //console.log(urlFile+' - '+link.href+' ok 200 -  '+link.text)
                        }else{
                              failLink++;
                              //console.log(urlFile+' - '+link.href+' fail 404 -  '+link.text)
                        }
                        totals++;
                  })
                  .catch(error => {
                        console.log(error);
            });
      });
      setTimeout(function(){
            console.log('Totals: '+(successLink+failLink)+' Unique: '+(successLink+failLink) )
      },3000)

} else if((accion[3] == '--validate') && (accion[4] == '--stats') && (accion.length == 5)){
      console.log('validacion mas estadistica')

      links.forEach(function (link, title, text) {
            urlExists(link.href)
                  .then(({exists}) => {
                        //console.log(exists); // true
                        if(exists == true){
                              successLink++;
                              console.log(urlFile+' - '+link.href+' ok 200 -  '+link.text)
                        }else{
                              failLink++;
                              console.log(urlFile+' - '+link.href+' fail 404 -  '+link.text)
                        }
                  })
                  .catch(error => {
                        console.log(error);
            });
      });
      setTimeout(function(){
            console.log('Totals: '+(successLink+failLink)+' Unique: '+(successLink+failLink) +' Broken: '+failLink)
      },3000)

}else if((accion[3] == '--stats') && (accion[4] == '--validate') && (accion.length == 5)){
      console.log('validacion mas estadistica2')
      links.forEach(function (link, title, text) { // por cada link en el archivo
            urlExists(link.href) // Llamamos a la funcion
                  .then(({exists}) => { // entonces, devuelve en exists true o false
                        if(exists == true){ // si es true
                              successLink++; // aumentamos links validos
                              console.log(urlFile+' - '+link.href+' ok 200 -  '+link.text) // consola
                        }else{
                              failLink++;// aumentamos links invalidos
                              console.log(urlFile+' - '+link.href+' fail 404 -  '+link.text) // consola
                        }
                  })
                  .catch(error => {
                        console.log(error); // si hay un error lo moestramos
            });
      });
      setTimeout(function(){ // imprimimos estadisticas
            console.log('Totals: '+(successLink+failLink)+' Unique: '+(successLink+failLink) +' Broken: '+failLink)
      },3000)

}else{
      console.log('falta indicar parametros')

}
