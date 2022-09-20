
const Tarea = require('./tarea')

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado =[];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor(){
        this._listado = {}
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = []){
       tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
       });
    }

    listadocompleto(){
        console.log();

        this.listadoArr.forEach(( tarea, i) => {
            const index = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;
            
        console.log(`${index} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas( completadas = true){

        let contador = 0;
        this.listadoArr.forEach(( tarea, i) => {
            
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;
            
        if (completadas)
        {
            if(completadoEn)
            {
                contador += 1;
                console.log(`${contador.toString().green} ${desc} :: ${completadoEn}`);}
            
        }    else{
            contador += 1;
            console.log(`${contador} ${desc} :: ${estado}`);

        }
        
        
        });
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    toogleCompletada(ids = []) {

        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tareas => {
            if(!ids.includes(tareas.id)){
                const tarea = this._listado[tareas.id];
                tarea.completadoEn = null;
            }


        });



    }
}
module.exports = Tareas;