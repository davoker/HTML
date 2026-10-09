package modulo1;

public class triangulo { // Declara la clase que contiene el programa.

    public static void main(String[] args) { // Punto de entrada: aquí empieza la ejecución.

        double base = Double.parseDouble(System.console().readLine("Introduce la base: ")); // Pide la base, lee la respuesta y la convierte a número decimal.

        double altura = Double.parseDouble(System.console().readLine("Introduce la altura: ")); // Pide la altura y convierte la respuesta a número decimal.

        double area = (base * altura) / 2; // Calcula el área del triángulo: base por altura, dividido entre 2.

        System.out.println("Base: " + base); // Muestra la base que introdujo el usuario.

        System.out.println("Altura: " + altura); // Muestra la altura que introdujo el usuario.

        System.out.println("Area: " + area); // Muestra el área calculada.
    }
}
