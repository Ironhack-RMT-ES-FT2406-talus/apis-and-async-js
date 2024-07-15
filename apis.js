console.log("probando")

const btnNode = document.querySelector("#btn")
const divNode = document.querySelector("#info")

btnNode.addEventListener("click", () => {

  console.log("aqui hacemos la llamada externa")
  fetch("https://api.spacexdata.com/v5/launches/latest")
  .then((response) => {
    console.log(response)
    return response.json()
  })
  .then((legibleResponse) => {
    console.log(legibleResponse)
    console.log(legibleResponse.links.patch.small)
    const imgNode = document.createElement("img")
    imgNode.src = legibleResponse.links.patch.small
    imgNode.style.width = "200px"
    divNode.append(imgNode)
    
    let crew1 = legibleResponse.crew[1].crew
    return fetch(`https://api.spacexdata.com/v4/crew/${crew1}`)

  })
  .then((responseCrew) => {
    return responseCrew.json()
  })
  .then((legibleResponseCrew) => {
    console.log(legibleResponseCrew)

    const imgNode = document.createElement("img")
    imgNode.src = legibleResponseCrew.image
    imgNode.style.width = "200px"
    divNode.append(imgNode)
  })

})