package modulo1;
// Importamos la clase Scanner.
// Scanner nos va a permitir introducir datos por teclado.
import java.util.Scanner;
// Creamos la clase principal del programa.

public class scannertest {

    // Método principal, aquí empieza el programa.
    public static void main(String[] args) {
        // Creamos un objeto llamado "teclado".
        // System.in indica que los datos se introducirán desde el teclado.
        Scanner teclado = new Scanner(System.in);

        // Pedimos al usuario que escriba su nombre.
        System.out.print("Introduce tu nombre ");

        // nextline() recoge el texto escrito por el usuario y lo guarda en la variable nombre,

        String nombre = teclado.nextLine();

        // Pedimos al usuario que escriba su edad.
        System.out.print("Introduce tu edad ");

        // nextInt() lee la edad como texto.
        // Integer paseInt() convierte el texto en un número entero.
        int edad = Integer.parseInt(teclado.nextLine());

        // Pedimos al usuario que escriba su altura.
        System.out.print("Introduce tu altura ");

        // nextline() lee la altura como texto.
        // Double.parseDouble() convierte el texto en un número decimal.
        double altura = Double.parseDouble(teclado.nextLine());

        // Mostramos por pantalla el nombre introducido.
        System.out.println("Nombre: " + nombre);
        // Mostramos por pantalla la edad introducida.
        System.out.println("Edad: " + edad);
        // Mostramos por pantalla la altura introducida.
        System.out.println("Altura: " + altura);
        // Cerramos Scanner porque no vamos a ller más datos.
        teclado.close();
    }
}