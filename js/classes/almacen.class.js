class Almacen {
    constructor(sucursal) {
        this.slug = stringToSlug(sucursal);
        this.sucursal = sucursal;
        this.productos = [];
        this.stockTotal = 0;
        this.valorStock = 0; // neto
    }
}