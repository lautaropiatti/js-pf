function calcularIVA(importeNeto) {
    let valorFinal = importeNeto * (1 + (IVA / 100)).toFixed(2); // redondeo a 2 decimales
    return valorFinal;
}