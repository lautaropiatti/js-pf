function tplAlmacen(almacen) {
    return `<tr>
                <td>${almacen.sucursal}</td>
                <td>${almacen.stockTotal}</td>
                <td>$ ${almacen.valorStock}</td>
                <td>$ ${calcularIVA(almacen.valorStock)}</td>
                <td><button class="btn btn-danger disabled" type="button">Borrar</button></td>
            </tr>`;
}

function tplAlmacenOption(almacen) {
    return `<option value="${almacen.sucursal.toLowerCase()}">${almacen.sucursal}</option>`;    
}

function tplProducto(producto) {
    return `<tr>
                <td>${producto.titulo}</td>
                <td>$ ${producto.precio}</td>
                <td>${producto.stock}</td>
                <td><button class="btn btn-danger" type="button">Borrar</button></td>
            </tr>`;    
}