package modulo1;

/* Cálculo del precio total.
Crea una variable para guardar el precio total de un producto.
Calcula el precio total multipliando.
Guarda el resultado en una nueva variable llamada total.
Después muestra el valor de total en pantalla. */
public class variables6 { // Declara la clase; su nombre coincide con el archivo.

    public static void main(String[] args) { // Punto de entrada: aquí comienza el programa.
        double precio = 39.95; // double guarda números con decimales.
        int unidades = 5; // int guarda un número entero.
        double total = precio * unidades; // double permite multiplicar.

        System.out.println("El precio total es " + total); // El total se muestra en la línea siguiente.
    }
}
