class Almacen {
    constructor(sucursal) {
        this.sucursal = sucursal;
        this.productos = [];
        this.stockTotal = 0;
        this.valorStock = 0; // neto
    }

    valorFinalStock() {
        return calcularIVA(this.valorStock);
    }
}