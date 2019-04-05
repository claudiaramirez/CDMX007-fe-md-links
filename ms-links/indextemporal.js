const fs = require('fs');
const path = require('path');

const accion = []
process.argv.forEach(function (val, index, array) {
  // console.log(index + ': ' + val);
  accion.push(val);
});

console.log(accion)
if(accion[3]== '--validate' && accion.length <= 4){
  console.log('valido')
} else if(accion[3]== '--stats' && accion.length <= 4){
  console.log('estadistica')
} else if((accion[3] == '--validate') && (accion[4] == '--stats') && (accion.length == 5)){
  console.log('validacion mas estadistica')
}else if((accion[3] == '--stats') && (accion[4] == '--validate') && (accion.length == 5)){
  console.log('validacion mas estadistica2')
}else{
  console.log('falta indicar parametros')
}

/*Ruta relativa o absoluta*/
const RuteFind = (file) => {
    if (path.isAbsolute(file) === true) {
        console.log(file);
    } else {
        console.log(path.resolve(file) + 'Relativa');    
    }
    return file;
  };
 let urlFile = RuteFind('../ms-links');
 console.log(is_dir(urlFile))

function is_dir(path) {
    try {
        var stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}

let argv = process.argv[2];
fs.readFile(argv, 'utf-8', (error, prueba)=>{
    if (error){
        console.log(`Error ${error}`);  
    }else{
        console.log(prueba);
    }
})

//  let links = fs.readFileSync('../README.md', 'utf-8');
// console.log(links)

// module.exports = () => {
//   // ...
// };



  
 

