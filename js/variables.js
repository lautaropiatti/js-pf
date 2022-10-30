const IVA = 21; // %
const ALMACENES = [];

const almacenesTb = document.querySelector('#almacenes-tb');
const productosTb = document.querySelector('#productos-tb');
const agregarAlmacenSave = document.querySelector('#agregar-almacen-save');
const agregarProductoSave = document.querySelector('#agregar-producto-save');
const agregarAlmacenForm = document.querySelector('#agregar-almacen');
const agregarProductoForm = document.querySelector('#agregar-producto');
const agregarProductoSelect = document.querySelector('#producto-sucursal');
const mostrarAlmacenSelect = document.querySelector('#seleccione-almacen-mostrar');

const modalAgregarAlmacen = new bootstrap.Modal('#modal-agregar-almacen');
const modalAgregarProducto = new bootstrap.Modal('#modal-agregar-producto');