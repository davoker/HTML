package modulo1;
/* Crea una variable para: nombre del alumno, Nota del examen, Número de faltas, Si has aprobado o suspendido, muestra los valores por pantalla */
public class variables3 { // Declara la clase; su nombre coincide con el archivo.

    public static void main(String[] args) { // Punto de entrada: aquí empieza el programa.
        String alumno = "David"; // String guarda texto; el texto se escribe entre comillas.
        double nota = 9.5; // double guarda números que pueden tener decimales.
        int faltas = 1; // int guarda números enteros, sin decimales.
        boolean aprobado = true; // boolean solo puede ser true (verdadero) o false (falso).
        
        System.out.println("Nombre: " + alumno); // Muestra el texto y el valor; + los une.
        System.out.println("Nota: " + nota); // println muestra el resultado y salta de línea.
        System.out.println("Número de faltas: " + faltas); // También se pueden mostrar números.
        System.out.println("Resultado de evaluación: " + aprobado); // Muestra el valor true o false.
    }
    
}
