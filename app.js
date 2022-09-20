const { inquirerMenu, 
        pausa, 
        leerQuestion,
        listadoTareaBorrar,
        confirmar,
        mostrarListadoCheckList
      } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')

require('colors');

const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB){
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
      
    }

   do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerQuestion('Descripcion: ');
                tareas.crearTarea(desc);
             break;   

             case '2':
                tareas.listadocompleto();
             break; 
             
             case '3':
                console.log();
                tareas.listarPendientesCompletadas();
             break;
             
             case '4':
                console.log();
                tareas.listarPendientesCompletadas(false);
             break;

             case '5':
                console.log();
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toogleCompletada(ids);
             break;

             case '6':
                console.log();
                const id = await listadoTareaBorrar(tareas.listadoArr);
                  if(id !== '0') {
                     const ok = await confirmar('Estas seguro?');
                     if(ok){
                       tareas.borrarTarea(id);
                     }
                  }
             break;
        }

        guardarDB(tareas.listadoArr);
              
       if(opt !== '0') await pausa();
    }while (opt !== '0');
}

main();