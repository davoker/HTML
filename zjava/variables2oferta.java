/* Datos de un producto. Crea variables para guardar:
Nombre del producto.
Precio.
Utilidades disponibles.
Si está en oferta.
Muestra toda la información en System.out.println() */
public class variables2oferta { // Declara la clase; su nombre coincide con el archivo.

    public static void main(String[] args) { // Punto de entrada: aquí comienza el programa.
        String nombre = "Juego de ajedrez"; // String guarda texto entre comillas.
        double precio = 19.95; // double guarda números con decimales.
        int unidades = 5; // int guarda un número entero.
        boolean oferta = true; // true significa que el producto está en oferta.
        
        
        System.out.println("Nombre: " + nombre); // Muestra el nombre del producto.
        if (oferta) { // Ejecuta este bloque solo si oferta es true.
            double precioOferta = Math.round(precio * 0.75 * 100) / 100.0; // Aplica un 25 % de descuento y redondea a dos decimales.
            System.out.println("Precio en oferta: " + precioOferta); // Muestra el precio rebajado.
        } else { // Si oferta es false, ejecuta este bloque.
            System.out.println("Precio normal: " + precio); // Muestra el precio sin descuento.
        }
        System.out.println("Unidades: " + unidades); // Muestra cuántas unidades hay.
        System.out.println("Oferta: " + (oferta ? "Si" : "No")); // El operador ?: elige "Si" o "No" según oferta.
    }
    
}
