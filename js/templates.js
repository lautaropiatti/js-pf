const tplAlmacen = (almacen) => {
    return `<tr id="${almacen.slug}">
                <td>${almacen.sucursal}</td>
                <td>${almacen.stockTotal}</td>
                <td>$ ${almacen.valorStock.toFixed(2)}</td>
                <td>$ ${calcularIVA(almacen.valorStock).toFixed(2)}</td>
                <td>
                    <span class="d-inline-block btn-borrar-almacen-wrapper" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Este almacén contiene productos">
                        <button class="btn btn-danger btn-borrar-almacen disabled" type="button" data-delete="${almacen.slug}">Borrar</button>
                    </span>
                </td>
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

const tplValorUSDReferencia = (data) => {
    return `<p class="text-center">
                <span class="fw-bold">Valor dólar mayorista de referencia:</span> 
                Compra: $${data.compra} | 
                Venta: $${data.venta}
            </p>`
}