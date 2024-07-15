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

// const laPromesa = pedirLibro(88)
// console.log(laPromesa)

// // Como nosotros resolvemos promesas?
// laPromesa
// .then((elLibro) => {
//   console.log(`leyendo el libro: ${elLibro.title}`)
// })
// .catch((error) => {
//   console.log(error)
// })


//* ENCADENAR PROMESAS (cuando la promesa anterior tiene info necesesaria para la promesa nueva)
// pedirLibro(88)
//   .then((elLibro) => {
//     console.log(`leyendo el libro: ${elLibro.title}`);

//     // pedir una nueva promesa (hacer otra llamada a una API)
//     return pedirLibro(2);
//   })
//   .then((elLibro) => {
//     console.log(`leyendo el libro: ${elLibro.title}`);

//     return pedirLibro(3);
//   })
//   .then((elLibro) => {
//     console.log(`leyendo el libro: ${elLibro.title}`);
//   })
//   .catch((error) => {
//     console.log(error);
//   });


//* RELVERLAS TODAS A LA VEZ => Promise.all y Promise.allSettled

// promise.all recibe una array de muchas promesas
// Promise.all([
//   pedirLibro(1),
//   pedirLibro(99),
//   pedirLibro(3)
// ])
// .then((algo) => {
//   // esto se ejecuta cuando todas las promesas hayan resuelto correctamente (fullfilled)
//   console.log(algo)
// })
// .catch((error) => {
//   // si una de las promesas falla, todo falla y me da el error en este .catch
//   console.log(error)
// })

// promise.allSettled recibe una array de muchas promesas
Promise.allSettled([
  pedirLibro(1),
  pedirLibro(99),
  pedirLibro(3)
])
.then((algo) => {
  // esto se ejecuta siempre
  console.log(algo)
})
.catch((error) => {
  // si una de las promesas falla, todo falla y me da el error en este .catch
  console.log(error)
})