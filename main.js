// Agencia de viajes
//Paquete de Viajes

//Propiedades Pedidas 
class PaqueteViajes {
 constructor (id, destino, dias, precioUSD, cuposMaximos) {
     this.id = id;
     this.destino = destino; // "The United Kingdom" , "Londres" , "Escocia ", "Abadía de Westminster","Castillo de Edimburgo"
     this.dias = dias;
     this.precioUSD = precioUSD;
     this.cuposMaximos = cuposMaximos; // cantidad de lugares disponibles
    }

// Metodo 1 : modificar el estado de los asientos 
// Restar cupos si hay una reserva

 reserva(pasajeros) {
    if (pasajeros < 1) {
        console.warn("cantidad de pasajeros debe ser al menos 1 ");
        return false;
    }

    if  (this.cuposMaximos >= pasajeros) {
         this.cuposMaximos -= pasajeros;

      const totalUSD = this.precioUSD * pasajeros;

      console.log(
        `¡Reserva confirmada con éxito! ${pasajeros} pasajero(s) hacia "${this.destino}".`
    );
      console.log(`Total: ${totalUSD} USD`);
        return true;
    } else {
        console.warn(
           `No hay suficientes cupos para "${this.destino}". Disponibles: ${this.cuposMaximos}`
        );
        return false;
      }
    }

// Metodo 2 : Aplicar un descuento)
  aplicarDescuento(porcentaje) {
    if (porcentaje > 0 && porcentaje <= 100) {
      const descuento = (this.precioUSD * porcentaje) / 100;
      this.precioUSD -= descuento;
      console.log(
       `¡Oferta Weekend! ${porcentaje}% OFF para "${this.destino}". Nuevo precio: ${this.precioUSD} USD`
     );
    } else {
        console.warn("porcentaje de descuento aplicado no valido");
      } 
    }

// Método 3: calcular el precio estimado en moneda local 
 obtenerPrecioEnPesos(cotizarEnDolar = 1500) { 
    const precioPesos = this.precioUSD * cotizarEnDolar;
    return precioPesos.toLocaleString("es-AR");
  }
}

// Viajes de la Agencia

// Almacenar Viajes 
 const ofertaViajes = [
    new PaqueteViajes(1, "Busan", 5, 2500, 8), 
    new PaqueteViajes(2, "Abu Dhabi", 2, 100, 4), 
    new PaqueteViajes(3, "Barcelona, Milan, Paris, Suiza", 3, 3000, 3), 
    new PaqueteViajes(4, "Los Angeles, California", 1, 1800, 5) 
];


// 3. Herramientas del Simulador 
// Función para mostrar todos los paquetes disponibles usando un ciclo
function mostrarPaquetesDisponibles() { 
    console.log("\n--- PAQUETES DE VIAJE DISPONIBLES ---"); 
    for (const paquete of ofertaViajes) { 
    console.log( 
     `ID: ${paquete.id} | Destino: ${paquete.destino} | Días: ${paquete.dias} | USD: $${paquete.precioUSD} | Aprox: $${paquete.obtenerPrecioEnPesos()} ARS | Cupos: ${paquete.cuposMaximos}`
       );
    } 
     console.log("---\n"); 
    }

// Función para gestionar una reserva 
function procesarReservaViaje(idPaquete, cantidadPasajeros) {
  const paqueteEncontrado = ofertaViajes.find(
    paquete  => paquete.id === idPaquete
);

  if (!paqueteEncontrado) {
    console.error(
        `[ERROR] No se encontró ningún paquete con el ID: ${idPaquete}`
    );
    return;
  }

  console.log(
    `Procesando solicitud de reserva para ${cantidadPasajeros} persona(s) a "${paqueteEncontrado.destino}"...`
);
  paqueteEncontrado.reserva(cantidadPasajeros);
}

// Ejecución

console.log("=== SIMULADOR DE AGENCIA DE VIAJES ===");

// 1. Mostrar la oferta inicial 
mostrarPaquetesDisponibles();

// 2. Probar reservas de pasajes
console.log("--- RESERVAS ---");

procesarReservaViaje(1, 4);
// Busan: tenía 8 cupos y quedan 4

procesarReservaViaje(3, 5);
// Europa: tiene 3 cupos y se solicitan 5
// Debe mostrar un mensaje de error


// 3. Aplicar descuento
console.log("\n--- APLICANDO DESCUENTOS DE TEMPORADA BAJA ---");

ofertaViajes[1].aplicarDescuento(15);
// Abu Dhabi recibe un 15% de descuento


// 4. Mostrar estado final
console.log("\n=== ESTADO FINAL DEL CATÁLOGO DE VIAJES ===");

mostrarPaquetesDisponibles();