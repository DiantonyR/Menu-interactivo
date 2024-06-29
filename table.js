require('colors');

const {Producto, ProductoVenta} = require('./productosss');

const rutaArchivo = 'productos.json';
const productoVenta = new ProductoVenta(rutaArchivo);

const cargar = async () => {
    try {
        await productoVenta.cargarDesdeJSON('productos.json');
        console.log('productos cargados correctamente.'.yellow);
        productoVenta.mostrarProductos();
    }catch (eror) {
        console.error('Error al cargar productos:',error);
    }
};

const cargarnew = async () => {
    productoVenta.mostrarProductos();
    await productoVenta.nuevoProducto();
    console.clear();
    console.log('Producto agregado correctamente'.yellow);
    productoVenta.mostrarProductos();
}

const eliminar = async () => {
    productoVenta.mostrarProductos();
    await productoVenta.eliminarProducto();
    console.log('Producto eliminado correctamente'.yellow);
    console.clear();
    productoVenta.mostrarProductos();
}



//leer archivo JSON

const leer=async() =>{
    console.log("Cargue primero los productos");
}




module.exports={
    leer,
    cargar,
    cargarnew,
    eliminar
};
