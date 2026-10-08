/* • Sé crear un archivo .java con el nombre correcto.
• Reconozco public class y el método main.
• Uso llaves, paréntesis, comillas y punto y coma.
• Muestro texto con System.out.print() y println().
• Puedo leer errores básicos de compilación. */

public class variables2 { // El nombre de la clase debe coincidir con el del archivo.

    public static void main(String[] args) { // Punto de entrada: aquí comienza el programa.
        int edad = 45; // int guarda números enteros.
        double precio = 19.95; // double permite guardar números con decimales.
        String nombre = "David"; // String guarda texto, que se escribe entre comillas.
        final double IVA = 0.21; // final indica que esta constante no cambia.

        // + une el texto con los valores de las variables.
        System.out.println("Hola " + nombre + ", tu edad es " + edad); // println termina esta salida con un salto de línea.
        System.out.println("Tu precio es " + precio); // El precio se muestra en la línea siguiente.
        System.out.println("Tu IVA es " + IVA); // El IVA se muestra en otra línea.
    }
    
}
