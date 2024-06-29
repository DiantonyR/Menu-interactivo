const { leer, cargar, cargarnew, eliminar } = require('../table');
const { preguntasino1, preguntasino2 } = require('./preguntasino');


require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Cargar producto'
            },
            {
                value: '2',
                name: '2. Agregar Producto'
            },
            {
                value: '3',
                name: '3. Eliminar producto'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]
    }
];
const inquirerMenu = async() => {
    console.clear();
    console.log('=============='.green);
    console.log('=    MENU    ='.green);
    console.log('==============\n'.green);
    console.log(`Cargue primero los productos`.bgRed)

    

    const inquirer = await import('inquirer');
    const {opcion} = await inquirer.default.prompt(preguntas);
    
    switch (opcion){
       
        case '1':
            await cargar();
            break;
        case '2':
            
        console.clear();
        await preguntasino1();  
            break;
        case '3':
            
        await preguntasino2();
            break;
        case '0':
            console.clear();
            console.log('saliendo del programa');
            
            break;
        default:
            console.log('opcion invalida');
    }
    
    return opcion;
    
}

const pausa = async() =>{
    const inquirer = await import('inquirer');
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'Enter'.green} para continuar`
        }
        
    ];
    
    console.log('\n');
   
    await inquirer.default.prompt(question);
    console.clear();
}


module.exports = {
    inquirerMenu,
    pausa,
    
}