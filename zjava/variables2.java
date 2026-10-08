/* Datos de un producto. Crea variables para guardar:
Nombre del producto.
Precio.
Utilidades disponibles.
Si está en oferta.
Muestra toda la información en System.out.println() */
public class variables2 { // Declara la clase; su nombre coincide con el archivo.

    public static void main(String[] args) { // Punto de entrada: aquí comienza el programa.
        String nombre = "Juego de ajedrez"; // String guarda texto entre comillas.
        double precio = 19.95; // double guarda números con decimales.
        int unidades = 5; // int guarda un número entero.
        boolean oferta = true; // boolean guarda true (sí) o false (no).
        
        
        System.out.println("Nombre: " + nombre); // Muestra el nombre del producto.
        System.out.println("Precio: " + precio); // Muestra su precio.
        System.out.println("Unidades: " + unidades); // Muestra cuántas unidades hay.
        System.out.println("Oferta: " + oferta); // Muestra true o false según esté en oferta.
    }
    
}
