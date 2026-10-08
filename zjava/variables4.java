public class variables4 { // El nombre de la clase debe coincidir con el del archivo.

    public static void main(String[] args) { // Punto de entrada: aquí comienza el programa.
        int edad = 45; // int guarda números enteros.
        double precio = 19.95; // double permite guardar números con decimales.
        String nombre = "David"; // String guarda texto, que se escribe entre comillas.
        final double IVA = 0.21; // final indica que esta constante no cambia.
        double total = precio + precio * IVA; // double permite sumar y multiplicar.

        // + une el texto con los valores de las variables.
        System.out.println("Hola " + nombre + ", tu edad es " + edad); // println termina esta salida con un salto de línea.
        System.out.println("Tu precio es " + precio); // El precio se muestra en la línea siguiente.
        System.out.println("Tu IVA es " + IVA); // El IVA se muestra en otra línea.
        System.out.println("El total es " + total); // El total se muestra en otra línea.

    }
    
}