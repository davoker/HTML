while(true){ // Bucle infinito: se repite una y otra vez hasta que el navegador se cierre o el programa termine
  let age; // Declara la variable age para guardar la edad introducida por el usuario
  let hasLicense; // Declara la variable hasLicense para guardar si tiene carnet o no
  let experience; // Declara la variable experience para guardar los años de experiencia
  
  age=prompt("Introduce tu edad") // Muestra un cuadro de entrada y guarda lo que escribe el usuario en age
  
  if(age >= 18){ // Si la edad es mayor o igual que 18
    
    hasLicense=confirm("Tienes carnet de conducir?") // Muestra un cuadro de confirmación: OK = sí, Cancelar = no
    
		if(!hasLicense){ // Si hasLicense es false (si responde que no tiene carnet)
      alert("Necesitas carnet de conducir") // Muestra un mensaje diciendo que necesita carnet
    }else{ // Si hasLicense es true (si tiene carnet)
      
      experience=prompt("Cuantos años llevas conduciendo?") // Pide cuántos años lleva conduciendo
      
      if(experience<2){ // Si tiene menos de 2 años
        alert("Conductor Principiante") // Muestra "Conductor Principiante"
      }
      else if(experience>=2 && experience <=5){ // Si tiene entre 2 y 5 años, incluidos ambos
        alert("Conductor con Experiencia Media") // Muestra "Conductor con Experiencia Media"
      }
      else{ // Si tiene más de 5 años
        alert("Conductor Experimentado") // Muestra "Conductor Experimentado"
      }
      
    }
    
  }else{ // Si la edad es menor de 18, o si la edad es inválida
    alert("No puedes conducir") // Muestra que no puede conducir
  }
}