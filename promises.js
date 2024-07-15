function pedirLibro(idDelLibro) {
  return new Promise((resolve, reject) => {
    if (typeof idDelLibro !== "number") {
      reject("tipo de id incorrecto o id no entregado");
      return; // detiene la funcion
    }

    // usamos el setTimout para simular/replicar un comportamiento asincrono de API
    setTimeout(() => {
      const books = [
        {
          id: 1,
          title: "The Fellowship of the Ring",
          description: "...",
        },
        {
          id: 2,
          title: "The Two Towers",
          description: "...",
        },
        {
          id: 3,
          title: "Return of the King",
          description: "...",
        },
      ];
      let foundBook = books.find((eachBook) => {
        return eachBook.id === idDelLibro;
      });

      if (foundBook === undefined) {
        reject("No hay libro con ese id");
      } else {
        resolve(foundBook);
      }
    }, Math.floor(Math.random() * 2000) + 1000); // 1 y 3 seg
  });
}

//* SINTAXIS THEN/CATCH

const laPromesa = pedirLibro(88)
console.log(laPromesa)

// Como nosotros resolvemos promesas?
laPromesa
.then((elLibro) => {
  console.log(`leyendo el libro: ${elLibro.title}`)
})
.catch((error) => {
  console.log(error)
})


//* PEDIR LA INFO UNA A UNA (ENCADENAR PROMESAS) (cuando la promesa anterior tiene info necesesaria para la promesa nueva)
pedirLibro(1)
  .then((elLibro) => {
    console.log(`leyendo el libro: ${elLibro.title}`);

    // pedir una nueva promesa (hacer otra llamada a una API)
    return pedirLibro(2);
  })
  .then((elLibro) => {
    console.log(`leyendo el libro: ${elLibro.title}`);

    return pedirLibro(3);
  })
  .then((elLibro) => {
    console.log(`leyendo el libro: ${elLibro.title}`);
  })
  .catch((error) => {
    console.log(error);
  });


//* PEDIRLAS LA INFO TODAS A LA VEZ => Promise.all y Promise.allSettled

// promise.all recibe una array de muchas promesas
Promise.all([
  pedirLibro(1),
  pedirLibro(99),
  pedirLibro(3)
])
.then((response) => {
  // esto se ejecuta cuando TODAS las promesas hayan resuelto correctamente (fullfilled)
  console.log(response)
})
.catch((error) => {
  // SI AL MENOS UNA de las promesas falla, todo falla y me da el error en este .catch
  console.log(error)
})

// promise.allSettled recibe una array de muchas promesas
Promise.allSettled([
  pedirLibro(1),
  pedirLibro(99),
  pedirLibro(3)
])
.then((response) => {
  // esto se ejecuta siempre
  console.log(response) // info de cada promesa, si fue resuelta o no y si valor o razón de rechazo.
})

//* SINTAXIS ASYNC AWAIT => resolver promesas una a una o todas a la vez
// NOTA: Siempre agregar el bloque try/catch para gestionar errores

// obligatoriamente debemos trabajar dentro de una funcion

async function getData() {
  // el async nos permite resolver promesas de una forma simple.

  try {
    // intenta hacer este código

    const libro1 = await pedirLibro(1)
    // await hace dos cosas:
    // 1. resuelve la promesa y me da el valor despues de resuelta
    // 2. espera que esa linea termine antes de continuar con el código
    console.log(`leyendo el libro: ${libro1.title}`);
    const libro2 = await pedirLibro(88)
    console.log(`leyendo el libro: ${libro2.title}`);
    const libro3 = await pedirLibro(3)
    console.log(`leyendo el libro: ${libro3.title}`);

  } catch(error) {
    // ocurre si algo del try falla
    console.log(error)
  }

}

//! RECORDAR INVOCAR LA FUNCION
getData()