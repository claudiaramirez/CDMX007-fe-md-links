// module.exports = () => {
//   // ...
// };

// var linksPrueba = require('links');

// 'use strict';
// var uniqueRandomArray = require('unique-random-array');
// var catNames = require('./cat-names.json');

// exports.all = catNames;
// exports.random = uniqueRandomArray(catNames);

const fs = require('fs');
const cli = require('./cli.js');
const path = require('path');

fs.readFile('../README.md', 'utf-8', ( error, prueba)=>{
    if (error){
        console.log(`Error ${error}`);  
    }else{
        console.log(prueba);
    }
})
//  let links = fs.readFileSync('../README.md', 'utf-8');
// console.log(links)

