const { resolve } = require('path');

require('colors')

const mostrarMenu = () => {

    return new Promise( resolve => {
    console.clear();
    console.log('==========================='.green);
    console.log(' Seleccione una opcion '.green);
    console.log('===========================\n'.green);


    console.log(`${'1.'.green} Crear Tarea`);
    console.log(`${'2.'.green} Listar Tareas`);
    console.log(`${'3.'.green} Listar Tareas completadas`);
    console.log(`${'4.'.green} Listar tareas pendientes`);
    console.log(`${'5.'.green} Borrar tarea`);
    console.log(`${'0.'.green} Salir \n`);

    const readLine = require('readline').createInterface({
        input:process.stdin,
        output: process.stdout
    });

    readLine.question('Selecciones una opcion: ',(opt) => {
        readLine.close();
        resolve(opt);
    })


    });
}
    
   const pause = () => {

        return new Promise(resolve =>{
            const readLine = require('readline').createInterface({
                input:process.stdin,
                output: process.stdout
            });        
            readLine.question(`Presiones ${'ENTER'.green} para continuar \n`,() => {
                readLine.close();
                resolve()
            })

        });

    }


module.exports = {
    mostrarMenu, pause
}