/**  Copia de Archivo entregable 03 - Clase Contenedor */
const fs = require('fs');

class Contenedor {
    constructor(name) {
        this.name = name;
     }
/** Metodo que guarda un producto dentro del array de productos - Si no existe ninguno crea el inicial */
     async Save(info) {   
        try {            
             let data = await this.readData(`./${this.name}`);         
             if(!data) {
                let id = 0
                info.id = id + 1;
                let array = [];
                array.push(info)
                this.writeData(array);
                return info.id
            } else{
                let contenidoJson = JSON.parse(data);
                let ultimoIndex = contenidoJson.length - 1;
                let ultimoId = contenidoJson[ultimoIndex].id
                info.id = ultimoId + 1;
                let id = info.id;
                contenidoJson.push(info)
                this.writeData(contenidoJson);
                return id
            }
        } catch (err) {
            console.log('error', err)
        }
    }
/** Metodo que devuelve todos los productos - Si no existen devuelve un msg por consola*/
    async GetAll() {
        try {
            const data = await this.readData(`./${this.name}`);
            if(data){
                return JSON.parse(data);
            }else{
                return 'El archivo de productos no tiene datos cargados'
            }
        } catch (error) {
            console.log(error);
        }
    }
/** Metodo que devuelve un producto segun Id - Si no existen productos devuelve Null*/
    async GetById(id) {
        try {
            const dato = await this.readData(`./${this.name}`);
            if(dato){
                let data = JSON.parse(dato)
                let idFiltrado = '';
                    data.forEach(element => {
                        element.id == id ? idFiltrado = element : ''
                    })
                if (idFiltrado != '') return idFiltrado
                else return null;
            }else{
                return 'El archivo de productos no tiene datos cargados'
            }
        } catch (error) {
            console.log(error);
        }
    } 
/** Metodo que elimina un producto segun Id - Si no existen productos o el Id no existe devuelve msg con leyenda*/
    async DeleteById(id) {
        try {
            const dato= await this.readData(`./${this.name}`);
            if(dato){
                let data = JSON.parse(dato)
                let idFiltrado = '';
                data.forEach(element => {
                    element.id == id ? idFiltrado = element : ''
                })
            if (idFiltrado != ''){
                let result = data.filter((item) => item.id !== id)
                await fs.promises.writeFile(`./${this.name}`, JSON.stringify(result))
                return 'Producto Borrado'
            }
            else return 'No existe el ID ingresado';
        }else{
            return 'El archivo de productos no tiene datos cargados'
        }
        } catch (error) {
            console.log(error);
        }
    }
/** Metodo que elimina todos los objetos (productos) del array. - Si no existen productos devuelve msg con leyenda*/
    async DeleteAll() {
        try {
            const dato = await this.readData(`./${this.name}`);
            if(dato){
            let data = JSON.parse(dato)
            let cleanData = []
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(cleanData))
            if(data.length > 0){
                return 'Objetos borrados del archivo'
            }else{
                return ' No existen objetos dentro del Array '
                }
            }
        } catch (err) {
            return err;
        }
    }
/** Funcion para leer los datos del archivo .txt  */
    async readData(path) {
        let contenido = await fs.promises.readFile(path, 'utf-8')
        return contenido
    }
 /** Funcion para escribir los datos del archivo .txt  */
    async writeData(objects) {
        await fs.promises.writeFile(this.name, JSON.stringify(objects, null, 2));
    }
}
module.exports = Contenedor