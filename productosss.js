const fs = require('fs').promises;
const readline = require('readline');

// Clase Producto
class Producto {
    constructor(codigoProducto, nombreProducto, inventarioProducto, precioProducto) {
        this.codigoProducto = codigoProducto;
        this.nombreProducto = nombreProducto;
        this.inventarioProducto = inventarioProducto;
        this.precioProducto = precioProducto;
    }
}

// Clase ProductoVenta
class ProductoVenta {
    #listaProductos = [];

    constructor(rutaArchivo = `productos.json`) {
        this.rutaArchivo = rutaArchivo;
    }

    // Getter para listaProductos
    get listaProductos() {
        return this.#listaProductos;
    }

    // Setter para listaProductos
    set listaProductos(nuevaLista) {
        if (Array.isArray(nuevaLista)) {
            this.#listaProductos = nuevaLista;
        } else {
            console.error('La nueva lista de productos debe ser un array.');
        }
    }

    // Función para cargar productos desde un JSON
    async cargarDesdeJSON() {
        try {
          
            this.listaProductos = [];

            const datos = await fs.readFile(this.rutaArchivo, 'utf-8');
            const productosJson = JSON.parse(datos);

            productosJson.forEach(prod => {
                const producto = new Producto(
                    prod.codigoProducto,
                    prod.nombreProducto,
                    prod.inventarioProducto,
                    prod.precioProducto
                );
                this.listaProductos.push(producto);
            });

        } catch (error) {
            console.error('Error al cargar el archivo JSON:', error);
        }
    }

    // Función para mostrar los productos
    mostrarProductos() {
        console.table(this.listaProductos);
    }

    // Función para guardar productos en un JSON
    async guardarEnJSON() {
        try {
            const datos = JSON.stringify(this.listaProductos, null, 2);
            await fs.writeFile(this.rutaArchivo, datos, 'utf-8');
        } catch (error) {
            console.error('Error al guardar el archivo JSON:', error);
        }
    }

    // Verificar si el código del producto ya existe
    existeCodigoProducto(codigoProducto) {
        return this.listaProductos.some(producto => producto.codigoProducto === codigoProducto);
    }

    // Verificar si el nombre del producto ya existe
    existeNombreProducto(nombreProducto) {
        return this.listaProductos.some(producto => producto.nombreProducto === nombreProducto);
    }

    // Agregar producto
    async nuevoProducto() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const pregunta = (pregunta) => {
            return new Promise((resolve) => {
                rl.question(pregunta, (respuesta) => {
                    resolve(respuesta);
                });
            });
        };

        try {
            let continuar = true;
            while (continuar) {
                let codigoProducto, nombreProducto, inventarioProducto, precioProducto;
                let codigoValido = false;
                let nombreValido = false;

                while (!codigoValido) {
                    codigoProducto = await pregunta('Ingrese el código del producto: ');

                    if (this.existeCodigoProducto(codigoProducto)) {
                        console.log('El código del producto ya existe. Por favor, intente nuevamente.');
                    } else {
                        codigoValido = true;
                    }
                }

                while (!nombreValido) {
                    nombreProducto = await pregunta('Ingrese el nombre del producto: ');

                    if (this.existeNombreProducto(nombreProducto)) {
                        console.log('El nombre del producto ya existe. Por favor, intente nuevamente.');
                    } else {
                        nombreValido = true;
                    }
                }

                inventarioProducto = await pregunta('Ingrese el inventario del producto: ');
                precioProducto = await pregunta('Ingrese el precio del producto: ');

                const nuevoProducto = new Producto(
                    codigoProducto,
                    nombreProducto,
                    parseInt(inventarioProducto),
                    parseFloat(precioProducto)
                );

                this.listaProductos = [...this.listaProductos, nuevoProducto];
                await this.guardarEnJSON();
                console.log('Producto agregado exitosamente!');

                const respuesta = await pregunta('¿Desea agregar otro producto? (s/n): ');
                if (respuesta.toLowerCase() !== 's') {
                    continuar = false;
                }
            }

        } catch (error) {
            console.error('Error al agregar el producto:', error);
        } finally {
            rl.close();
        }
    }

    // Eliminar producto
    async eliminarProducto() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const pregunta = (pregunta) => {
            return new Promise((resolve) => rl.question(pregunta, resolve));
        };

        try {
            let continuar = true;
            while (continuar) {
                const codigoProducto = await pregunta('Ingrese el código del producto a eliminar: ');

                const indice = this.listaProductos.findIndex(producto => producto.codigoProducto === codigoProducto);
                if (indice !== -1) {
                    this.listaProductos.splice(indice, 1);
                    await this.guardarEnJSON();
                    console.log('Producto eliminado exitosamente!');
                } else {
                    console.log('Producto no encontrado.');
                }

                const respuesta = await pregunta('¿Desea eliminar otro producto? (s/n): ');
                if (respuesta.toLowerCase() !== 's') {
                    continuar = false;
                }
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        } finally {
            rl.close();
        }
    }
}

module.exports = {
    Producto,
    ProductoVenta
};
