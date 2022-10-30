function ingresarProductos() {
    for (let i = 1; i <= cantidadIteraciones; i++) {
        let titulo = prompt('Ingrese el título del artículo N° ' + i);
        let precio = parseFloat(prompt('Ingrese el precio del artículo N° ' + i));
        let stock = parseInt(prompt('Ingrese el stock del artículo N° ' + i));

        crearProducto(titulo, precio, stock, almacen);
    }
}

// ingresarProductos();

// mostrarEstadoStock(almacen);

function listarAlmacenes() {
    almacenesTb.innerHTML = '';
    mostrarAlmacenSelect.innerHTML = '<option value="..." selected="" disabled>...</option>';
    agregarProductoSelect.innerHTML = '<option value="..." selected="" disabled>...</option>';
    if (ALMACENES.length > 0) {
        ALMACENES.forEach(almacen => {
            // Refresca tabla
            almacenesTb.innerHTML += tplAlmacen(almacen);
            // Refresca select Productos
            mostrarAlmacenSelect.innerHTML += tplAlmacenOption(almacen);
            // Refresca select Agregar Producto
            agregarProductoSelect.innerHTML += tplAlmacenOption(almacen);
        });
    }
    else {
        almacenesTb.innerHTML += '<tr><td><span class="text-danger">No hay almacenes</span></td></tr>';
    }
}

function handleAgregarAlmacenSubmit() {
    let sucursalInput = agregarAlmacenForm.querySelector('#almacen-sucursal');
    if (crearAlmacen(sucursalInput.value)) {
        modalAgregarAlmacen.hide();
        sucursalInput.value = '';
        listarAlmacenes();
        productosTb.innerHTML = '';
    }
}

function listarProductos(sucursalAlmacen) {
    productosTb.innerHTML = '';
    let almacenSeleccionado = getAlmacen(sucursalAlmacen);
    if (almacenSeleccionado.productos.length > 0) {
        almacenSeleccionado.productos.forEach(producto => {
            productosTb.innerHTML += tplProducto(producto);
        });                
    }
    else {
        productosTb.innerHTML += '<tr><td><span class="text-danger">No hay productos en este almacén</span></td></tr>'
    }
}

function handleAgregarProductoSubmit() {
    let sucursalSelect = agregarProductoForm.querySelector('#producto-sucursal');
    almacenSeleccionado = getAlmacen(sucursalSelect.value);
    let tituloInput = agregarProductoForm.querySelector('#producto-titulo');
    let precioInput = agregarProductoForm.querySelector('#producto-precio');
    let stockInput = agregarProductoForm.querySelector('#producto-stock');

    if (crearProducto(tituloInput.value, precioInput.value, stockInput.value, almacenSeleccionado)) {
        modalAgregarProducto.hide();
        sucursalSelect.value = '...';
        tituloInput.value = '';
        precioInput.value = '';
        stockInput.value = '';
        listarAlmacenes();
        productosTb.innerHTML = '';
    }
}

storageRead();

listarAlmacenes();

agregarAlmacenForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleAgregarAlmacenSubmit();
});

agregarAlmacenSave.addEventListener('click', (event) => {
    event.preventDefault();
    handleAgregarAlmacenSubmit();
});

mostrarAlmacenSelect.addEventListener('change', (event) => {
    listarProductos(event.target.value);
});

agregarProductoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleAgregarProductoSubmit();
});

agregarProductoSave.addEventListener('click', (event) => {
    event.preventDefault();
    handleAgregarProductoSubmit();
});