#!/usr/bin/env node
// 'use strict';

// var meow     = require('meow');
// var catNames = require('./');

// var cli = meow([
// 	'Examples',
// 	'  $ cat-names',
// 	'  Max',
// 	'',
// 	'  $ cat-names --all',
// 	'  Abby',
// 	'  Angel',
// 	'  ...',
// 	'',
// 	'Options',
// 	'  --all   Get all names instead of a random name'
// ]);

// console.log(cli.flags.all ? catNames.all.join('\n') : catNames.random());


// function hola(){
//     console.log('Archivo cli.js');
// }

// module.exports.sub  = function hola(){
//     console.log('Archivo cli.js');
// };
let hola = 100;
module.exports = {
    subs : hola,
    saludar: () =>{
        console.log('hola hola :)')
    },
    sumar: (a, b) => a + b,
    mostrar: a => a + 10
    
    
}
