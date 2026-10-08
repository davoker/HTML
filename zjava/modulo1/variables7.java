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
        double precio = 99.95; // double guarda números con decimales.
        int unidades = 7; // int guarda un número entero.
        double total = precio * unidades; // double permite multiplicar.
        double descuento = total * 0.10; // double permite multiplicar.
        double descuentoTotal = total - descuento; // double permite restar.
        double iva = descuentoTotal * 0.21; // double permite multiplicar.
        double precioFinal = descuentoTotal - iva; // double permite restar.

        System.out.println("Precio: " + precio); // Muestra el precio.
        System.out.println("Unidades: " + unidades); // Muestra cuántas unidades hay.
        System.out.println("Total: " + total); // El total se muestra en otra línea.
        System.out.println("Descuento: " + descuento); // El descuento se muestra en otra línea.
        System.out.println("Descuento total: " + descuentoTotal); // El descuento total se muestra en otra línea.
        System.out.println("IVA: " + iva); // El IVA se muestra en otra línea.
        System.out.println("Precio final: " + precioFinal); // El precio final se muestra en otra línea.
    }
    
}
