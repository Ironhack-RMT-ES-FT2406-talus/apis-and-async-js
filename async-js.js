console.log("probando")

function pedirLibro(idDelLibro, functionQueRecibeElLibro, functionSiHayError) {

  if (typeof idDelLibro !== "number") {
    functionSiHayError("tipo de id incorrecto o id no entregado")
    return; // detiene la funcion
  }

  // usamos el setTimout para simular/replicar un comportamiento asincrono de API
  setTimeout(() => {

    const books = [
      {
        id: 1,
        title: 'The Fellowship of the Ring',
        description: '...',
      },
      {
        id: 2,
        title: 'The Two Towers',
        description: '...',
      },
      {
        id: 3,
        title: 'Return of the King',
        description: '...',
      }
    ]
    let foundBook = books.find((eachBook) => {
      return eachBook.id === idDelLibro
    })

    if (foundBook === undefined) {
      functionSiHayError("No hay libro con ese id")
    } else {
      functionQueRecibeElLibro(foundBook)
    }

    }, Math.floor(Math.random() * 2000) + 1000) // 1 y 3 seg

}
// const bookToRead = pedirLibro(2)
// console.log(bookToRead)

// console.log(`leyendo el libro ${bookToRead.title}`)

// function recibirLibro(elLibro) {
//   console.log(`leyendo el libro: ${elLibro.title}`)
// }

// pedirLibro( 3, recibirLibro )

pedirLibro( 1, (elLibro) => {
  console.log(`leyendo el libro: ${elLibro.title}`)

  pedirLibro( 2, (elLibro) => {
    console.log(`leyendo el libro: ${elLibro.title}`)

    pedirLibro( 3, (elLibro) => {
      console.log(`leyendo el libro: ${elLibro.title}`)

      pedirLibro( 88, (elLibro) => {
        console.log(`leyendo el libro: ${elLibro.title}`)
      }, (error) => {
        console.log(error)
      } )

    }, (error) => {
      console.log(error)
    } )

  }, (error) => {
    console.log(error)
  } )

}, (error) => {
  console.log(error)
} )

