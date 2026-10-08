/* Datos de un producto. Crea variables para guardar:
Nombre del producto.
Precio.
Utilidades disponibles.
Si está en oferta.
Muestra toda la información en System.out.println() */
public class variables2oferta {

    public static void main(String[] args) {
        String nombre = "Juego de ajedrez";
        double precio = 19.95;
        int unidades = 5;
        boolean oferta = true;
        
        
        System.out.println("Nombre: " + nombre);
        if (oferta) {
            double precioOferta = Math.round(precio * 0.75 * 100) / 100.0;
            System.out.println("Precio en oferta: " + precioOferta);
        } else {
            System.out.println("Precio normal: " + precio);
        }
        System.out.println("Unidades: " + unidades);
        System.out.println("Oferta: " + (oferta ? "Si" : "No"));
    }
    
}
