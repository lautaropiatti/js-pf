class Producto {
    constructor(titulo, precio, stock) {
        this.slug = stringToSlug(titulo);
        this.titulo = titulo;
        this.precio = precio;
        this.stock = stock;
    }
}