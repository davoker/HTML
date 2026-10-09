package modulo1;

/* Crea un programa en java que calcule el precio final de una compra aplicando un descuento y después el IVA.
Para ello debes:
Crear la variable para la cantidad y el precio.+
Calular el importe total.
Calcular un descuento del 10%.
Calcular cuanto dinero se descuenta en total.
Restar el descuento al importe total.
Calcular el IVA del 21% sobre el precio después de aplicar el descuento.
Obtener el precio final.
Mostrar en pantalla:
Precio, producto, cantidad de producto, importe inicial de la compra, impor de descuento de precio después del descuento, importe del IVA y precio final de la compra. */
public class variables7 {

    public static void main(String[] args) {
        double precio = 99.95; // Precio unitario del producto, con decimales.
        int unidades = 7; // Número de productos comprados.
        double total = precio * unidades; // Calcula el importe inicial sin descuento.
        double descuento = total * 0.10; // Calcula el 10% de descuento sobre el total.
        double precioConDescuento = total - descuento; // Resta el descuento al importe inicial.
        double iva = precioConDescuento * 0.21; // Calcula el 21% de IVA sobre el precio ya descontado.
        double precioFinal = precioConDescuento + iva; // Suma el IVA al precio con descuento.

        System.out.println("Precio: " + precio); // Muestra el precio de cada unidad.
        System.out.println("Unidades: " + unidades); // Muestra cuántas unidades se compran.
        System.out.println("Total: " + total); // Muestra el importe inicial antes del descuento.
        System.out.println("Descuento: " + descuento); // Muestra cuánto dinero se descuenta.
        System.out.println("Precio con descuento: " + precioConDescuento); // Muestra el total tras aplicar el descuento.
        System.out.println("IVA: " + iva); // Muestra el importe del IVA añadido.
        System.out.println("Precio final: " + precioFinal); // Muestra el coste final a pagar.
    }
    
}
