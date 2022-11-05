/*** FUNCIONES DE INTERACCIÓN CON EL FRONT ***/

const listarAlmacenes = () => {
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

const handleAgregarAlmacenSubmit = () => {
    let sucursalInput = agregarAlmacenForm.querySelector('#almacen-sucursal');
    if (crearAlmacen(sucursalInput.value)) {
        modalAgregarAlmacen.hide();
        sucursalInput.value = '';
        listarAlmacenes();
        if (OPTIONS.productosAlmacenSeleccionado !== '...') {
            // Refresca el listado de productos con el último almacén seleccionado
            listarProductos(OPTIONS.productosAlmacenSeleccionado);
            // Recupera el último almacén seleccionado
            mostrarAlmacenSelect.value = OPTIONS.productosAlmacenSeleccionado;
        }
    }
}

const initBtnBorrarProducto = () => {
    let btns = document.querySelectorAll('.btn-borrar-producto');
    btns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            slugProducto = event.target.getAttribute('data-delete');
            borrarProducto(slugProducto, OPTIONS.productosAlmacenSeleccionado);
            // Refresca los almacenes para recuperar los nuevos valores de stock
            listarAlmacenes();
            // Refresca el listado de productos con el último almacén seleccionado
            listarProductos(OPTIONS.productosAlmacenSeleccionado);
            // Recupera el último almacén seleccionado
            mostrarAlmacenSelect.value = OPTIONS.productosAlmacenSeleccionado;
        });
    });
}

const listarProductos = (slugAlmacen) => {
    productosTb.innerHTML = '';
    let almacenSeleccionado = getAlmacen(slugAlmacen);
    if (almacenSeleccionado.productos.length > 0) {
        almacenSeleccionado.productos.forEach(producto => {
            productosTb.innerHTML += tplProducto(producto);
            initBtnBorrarProducto();
        });                
    }
    else {
        productosTb.innerHTML += '<tr><td><span class="text-danger">No hay productos en este almacén</span></td></tr>'
    }
}

const handleAgregarProductoSubmit = () => {
    let sucursalSelect = agregarProductoForm.querySelector('#producto-sucursal');
    almacenSeleccionado = getAlmacen(sucursalSelect.value);
    let tituloInput = agregarProductoForm.querySelector('#producto-titulo');
    let precioInput = agregarProductoForm.querySelector('#producto-precio');
    let stockInput = agregarProductoForm.querySelector('#producto-stock');

    if (crearProducto(tituloInput.value, parseFloat(precioInput.value), parseInt(stockInput.value), almacenSeleccionado)) {
        modalAgregarProducto.hide();
        sucursalSelect.value = '...';
        tituloInput.value = '';
        precioInput.value = '';
        stockInput.value = '';
        // Refresca los almacenes para recuperar los nuevos valores de stock
        listarAlmacenes();
        if (OPTIONS.productosAlmacenSeleccionado !== '...') {
            // Refresca el listado de productos con el último almacén seleccionado
            listarProductos(OPTIONS.productosAlmacenSeleccionado);
            // Recupera el último almacén seleccionado
            mostrarAlmacenSelect.value = OPTIONS.productosAlmacenSeleccionado;
        }
    }
}

// const initBtnBorrarAlmacen = () => {
//     // let btns = document.querySelectorAll('.btn-borrar-almacen');

// }

/*** INIT ***/

storageRead();

listarAlmacenes();

/*** EVENTOS ***/

agregarAlmacenForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleAgregarAlmacenSubmit();
});

agregarAlmacenSave.addEventListener('click', (event) => {
    event.preventDefault();
    agregarAlmacenForm.requestSubmit(); // Se usa el submit del form para mantener la validación HTML
});

mostrarAlmacenSelect.addEventListener('change', (event) => {
    let slugAlmacen = event.target.value;
    listarProductos(slugAlmacen);
    OPTIONS.productosAlmacenSeleccionado = slugAlmacen; // Guardar la última selección
});

agregarProductoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleAgregarProductoSubmit();
});

agregarProductoSave.addEventListener('click', (event) => {
    event.preventDefault();
    agregarProductoForm.requestSubmit(); // Se usa el submit del form para mantener la validación HTML
});

modalAgregarProductoEl.addEventListener('show.bs.modal', () => {
    // Si hay un almacén seleccionado, se carga ese por defecto en la modal de Agregar Producto
    if (OPTIONS.productosAlmacenSeleccionado !== '...') {
        agregarProductoSelect.value = OPTIONS.productosAlmacenSeleccionado;
    }
});