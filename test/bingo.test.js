import {describe, it, expect} from "vitest"
import { getBingoCard } from "../getBingoCard"
/*
Generar un programa que cree un cartón de bingo aleatorio y lo muestre por pantalla
    -Cartón de 3 filas por 9 columnas
    -El cartón debe tener 15 números y 12 espacios en blanco
    -Cada fila debe tener 5 números
    -Cada columna debe tener 1 o 2 números
    -Ningún número puede repetirse
    -La primer columna contiene los números del 1 al 9, la segunda del 10 al 19, 
    la tercera del 20 al 29, así sucesivamente hasta la última columna la cual contiene del 80 al 90
*/

const bingoCard = getBingoCard()

describe('BingoCard', () => {
 
 it('should return a array of 9 columns', () => {
    expect(bingoCard).toHaveLength(9)
 })
 it('each column should be a array of 3 rows', () => {
   bingoCard.forEach(col => {
      expect(col).toHaveLength(3)
      })
 })
//  it('the numbers can\'t be repeats', () => {
//   for(let i = 0; i < 9; i++){
//       let col = []
//     for(let j = 0; j < 3; j++){
//       col.push(bingoCard[i][j])
//     }
//       expect(new Set(col).size).toBe(1 || 2 || 3)
//   }
//  })
 it('the first column contains the numbers from 1 to 9, the second column contains the numbers from 10 to 19, etc.', () => {
  for(let i = 0; i < 9; i++){
    const max = ((i + 1)*10)
    for(let j = 0; j < 3; j++){
    if(typeof bingoCard[i][j] === 'number')
    expect((bingoCard[i][j] <= max && bingoCard[i][j] >= (max - 10))).toBe(true)
  }
}
 })
 it('each column shold have its numbers ordered from least to greatest', () => {
  for(let i = 0; i < 9; i++){
    for(let j = 0; j < 3; j++){
    if(j !== 0 && typeof bingoCard[i][j] === 'number' && typeof bingoCard[i][(j-1)] === 'number') 
      expect(bingoCard[i][j] > bingoCard[i][(j-1)]).toBe(true)
    }
  }
 })
 it('each row should have 5 numbers', () => {
   let numbers = 0
   for(let i = 0; i < 3; i++){
    numbers = 0
    for(let j = 0; j < 9; j++){
      if(typeof bingoCard[j][i] === 'number') numbers++
    }
    expect(numbers).toBe(5)
   }
 })
 it('each column should have 1 or 2 numbers', () => {
   let numbers = 0
   for(let i = 0; i < 9; i++){
      numbers=0
      for(let j = 0; j < 3; j++){
        if(typeof bingoCard[i][j] === 'number') numbers++
      }
      expect(numbers === 1 || numbers === 2).toBe(true)
    }
      })
 })
