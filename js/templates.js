const tplAlmacen = (almacen) => {
    return `<tr id="${almacen.slug}">
                <td>${almacen.sucursal}</td>
                <td>${almacen.stockTotal}</td>
                <td>$ ${almacen.valorStock.toFixed(2)}</td>
                <td>$ ${calcularIVA(almacen.valorStock).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-borrar-almacen disabled" type="button">Borrar</button></td>
            </tr>`;
}

const tplAlmacenOption = (almacen) => {
    return `<option value="${almacen.slug}">${almacen.sucursal}</option>`;    
}

const tplProducto = (producto) => {
    return `<tr id="${producto.slug}">
                <td>${producto.titulo}</td>
                <td>$ ${producto.precio}</td>
                <td>${producto.stock}</td>
                <td><button class="btn btn-danger btn-borrar-producto" type="button" data-delete="${producto.slug}">Borrar</button></td>
            </tr>`;    
}