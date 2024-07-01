const inventario = JSON.parse(localStorage.getItem('inventario')) || [];


function guardarInventario() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}


function agregarProducto() {
    const nombre = prompt("Ingrese el nombre del producto:");
    const cantidad = parseInt(prompt("Ingrese la cantidad del producto:"));
    const precio = parseFloat(prompt("Ingrese el precio del producto:"));

    if (nombre && !isNaN(cantidad) && !isNaN(precio)) {
        const producto = {
            nombre,
            cantidad,
            precio
        };
        inventario.push(producto);
        guardarInventario();
        alert("Producto agregado con éxito.");
        console.log("Producto agregado:", producto);
        listarProductos();
    } else {
        alert("Datos inválidos. Por favor, intente de nuevo.");
    }
}

// Función para listar los productos en el inventario
function listarProductos() {
    const listaElement = document.getElementById('lista-productos');
    listaElement.innerHTML = '';

    if (inventario.length === 0) {
        listaElement.innerHTML = '<p>No hay productos en el inventario.</p>';
    } else {
        let listaHTML = '<ul>';
        inventario.forEach((producto, index) => {
            listaHTML += `<li>${index + 1}. ${producto.nombre} - Cantidad: ${producto.cantidad}, Precio: $${producto.precio.toFixed(2)}</li>`;
        });
        listaHTML += '</ul>';
        listaElement.innerHTML = listaHTML;
    }
}


function venderProducto() {
    const nombre = prompt("Ingrese el nombre del producto a vender:");
    const producto = inventario.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (producto) {
        const cantidad = parseInt(prompt(`Ingrese la cantidad a vender (disponible: ${producto.cantidad}):`));

        if (!isNaN(cantidad) && cantidad > 0 && cantidad <= producto.cantidad) {
            producto.cantidad -= cantidad;
            guardarInventario();
            alert(`Venta exitosa. Quedan ${producto.cantidad} unidades de ${producto.nombre}.`);
            console.log(`Venta realizada: ${cantidad} unidades de ${producto.nombre}. Restante: ${producto.cantidad}`);
            listarProductos();
        } else {
            alert("Cantidad inválida. Por favor, intente de nuevo.");
        }
    } else {
        alert("Producto no encontrado.");
    }
}


document.addEventListener('DOMContentLoaded', listarProductos);