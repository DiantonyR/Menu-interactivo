const { leer, cargar, cargarnew, eliminar } = require('../table');

require('colors');

const preguntasino = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Desea agregar un Nuevo Producto?',
        choices: [
            {
                value:'1',
                name: 'SI'
            },
            {
                value:'2',
                name: 'NO'
            },
        ]
    }
];
const preguntasinoq = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Desea eliminar un Producto?',
        choices: [
            {
                value:'1',
                name: 'SI'
            },
            {
                value:'2',
                name: 'NO'
            },
        ]
    }
];

const preguntasino1 = async()=>{

    const inquirer = await import('inquirer');
    const {opcion} = await inquirer.default.prompt(preguntasino);

    switch (opcion){
        case '1':
            console.clear();
            await cargarnew();
            break;
        case '2':
            console.log('No agrego');
            break;
    }
    return opcion;
}

const preguntasino2 = async()=>{

    const inquirer = await import('inquirer');
    const {opcion} = await inquirer.default.prompt(preguntasinoq);

    switch (opcion){
        case '1':
            await eliminar();
            console.clear();
            await eliminar();
            break;
        case '2':
            console.log('No elimino ningun producto');
            break;
    }
    return opcion;
}
module.exports={
    preguntasino1,
    preguntasino2
}