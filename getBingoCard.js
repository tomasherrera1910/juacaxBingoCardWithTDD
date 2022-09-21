//getNumRandom(maxNum, minNum, array para no tener valores repetidos, boolean si queres permitir el valor 0)
const getNumRandom = (max = 9, min = 0, array = [], zeroAllow = false) => {
  const randomNum = Math.floor(Math.random() * (max - min) + min)
  if (array.includes(randomNum)) return getNumRandom(max, min, array, zeroAllow)

  if (!zeroAllow) return randomNum === 0 ? 1 : randomNum
  else return randomNum
}
//getLength para obtener el Length real del array sin contar los espacios vacíos
const getLength = (array) => {
  let length = 0
  array.forEach((n) => {
    if (n !== "") ++length
  })
  return length
}
export const getBingoCard = () => {
  const rows = 3
  const columns = 9

  let card = []
  //llenamos el cartón por columnas
  for (let i = 0; i < columns; i++) {
    //número maximo de esta columna, el minimo sería max - 10
    const max = (i + 1) * 10
    let col = []
    for (let j = 0; j < rows; j++) {
      col.push(getNumRandom(max, max - 10, col))
    }
    //ordenamos y pusheamos
    col.sort((a, b) => a - b)
    card.push(col)
  }
  //con este bucle quitamos 3 numeros de cada fila
  for (let a = 0; a < 3; a++) {
    let columnsRestValue = []
    for (let i = 0; i < rows; ) {
      const column = getNumRandom(9, 0, columnsRestValue, true)
      if (!columnsRestValue.includes(column)) {
        //nos aseguramos de no dejar una columna vacía
        if (
          typeof card[column][i] === "number" &&
          getLength(card[column]) !== 1
        ) {
          columnsRestValue.push(column)
          card[column][i] = ""
          i++
        }
      }
    }
  }
  // las filas nos quedaron con 6 números cada una, por lo que tenemos que sacar un número más por fila
  let rowsWithFive = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      //nos aseguramos de sacar un valor de las columnas que hayan quedado con 3 números
      if (getLength(card[j]) === 3) {
        const positionRow = getNumRandom(3, 0, rowsWithFive, true)
        rowsWithFive.push(positionRow)
        card[j][positionRow] = ""
      }
      //si ya no hay columnas con 3 números pero todavía existe una fila con 6 números, quitamos
      //un valor siempre y cuando el length de la columa sea 2
      else if (
        getLength(card[j]) === 2 &&
        !rowsWithFive.includes(i) &&
        typeof card[j][i] === "number"
      ) {
        rowsWithFive.push(i)
        card[j][i] = ""
      }
    }
  }
  return card
}

// const card = getBingoCard()
// for (let i = 0; i < 3; i++) {
//   let row = "|"
//   for (let j = 0; j < 9; j++) {
//     if (card[j][i] === "") {
//       if (j === 0) row += " |"
//       else row += "  |"
//     } else row += `${card[j][i]}|`
//   }
//   console.log(row)
// }
