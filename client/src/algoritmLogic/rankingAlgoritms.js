//import {alternatives, experts} from "./context.js";
import * as myF from "./helpFunctions.js";
//import jStat from "jstat";

let resRank = []
//матрица эксперт-ранг
// const rankedMatrix = myF.createMatrixExpertRang()
//
// //транспонированная матрица Эксперт-Ранг для удобного обхода ранжировки
// const transRankedMatrix = jStat.transpose(rankedMatrix)

//Правило относительного большинства
export const relativeMajorityRule = (rankedMatrix) => {
  resRank = []

  rankedMatrix.forEach((item, index) => {
    const hashmap = item.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    }, {})

    let temp = (Object.keys(hashmap)
      .filter(
        key => {
          return hashmap[key] === Math.max.apply(null,
            Object.values(hashmap))
        }
      ))

    resRank[index] = myF.toNumber(temp)
  })

  return {name: ['Правило относительного большинства'], resRank}
};

//Победитель по Кондорсе
export const condorcetWinner = (alternatives,transRankedMatrix) => {
  resRank = []
  let altsPoints = Array(alternatives.length).fill(0)  //очки альтернативы в попарном сравнении

  //матрица сравнений
  let comparisonMatrix = myF.createCompareMatrix(transRankedMatrix,alternatives)

  //находим наилучшую альт-ву
  for (let i = 0; i < alternatives.length - 1; i++) {
    for (let j = i + 1; j < alternatives.length; j++) {
      if (comparisonMatrix[i][j] > comparisonMatrix[j][i]) {
        altsPoints[i]++
        continue
      } else if (comparisonMatrix[i][j] === comparisonMatrix[j][i]) {
        altsPoints[j]++
        altsPoints[i]++
        continue
      }
      altsPoints[j]++
    }
  }

  resRank = myF.sortByKey(altsPoints,alternatives)

  return {name: ['Победитель по Кондорсе'], resRank}
};

//Правило Копленда
export const copelandRule = (alternatives,transRankedMatrix) => {
  let altsPoints = Array(alternatives.length).fill(0)  //очки альтернативы в попарном сравнении
  resRank = []

  //матрица сравнений
  let comparisonMatrix = myF.createCompareMatrix(transRankedMatrix,alternatives)

  //находим наилучшую альт-ву
  for (let i = 0; i < alternatives.length - 1; i++) {
    for (let j = i + 1; j < alternatives.length; j++) {
      if (comparisonMatrix[i][j] > comparisonMatrix[j][i]) {
        altsPoints[i]++
        altsPoints[j]--
      } else if (comparisonMatrix[i][j] < comparisonMatrix[j][i]) {
        altsPoints[j]++
        altsPoints[i]--
      }
    }
  }

  resRank = myF.sortByKey(altsPoints,alternatives)

  return {name: ['Правило Копленда'], resRank}
};

//Правило Симпсона
export const simpsonRule = (alternatives,transRankedMatrix) => {
  let altsPoints = Array(alternatives.length).fill(0)  //очки альтернативы в попарном сравнении
  let temp = []
  resRank = []

  //матрица сравнений
  let comparisonMatrix = myF.createCompareMatrix(transRankedMatrix,alternatives)

  //находим наилучшую альт-ву
  for (let i = 0; i < alternatives.length; i++) {
    temp = comparisonMatrix[i].slice()
    temp.splice(i, 1)
    altsPoints[i] = Math.min(...temp)
  }
  resRank = myF.sortByKey(altsPoints,alternatives)

  return {name: ['Правило Симпсона'], resRank}
};

//Правило Борда
export const bordRule = (alternatives,transRankedMatrix) => {
  let altsPoints = Array(alternatives.length).fill(0)  //очки альтернатив в сравнении
  resRank = []

  transRankedMatrix.forEach(exp => {
    exp.forEach((alt, altIndex) => {
      altsPoints[alt - 1] += exp.length - (altIndex - 1)
    })
  })

  resRank = myF.sortByKey(altsPoints,alternatives)

  return {name: ['Правило Борда'], resRank}

};

//Медиана Кемени
export const medianKemeny = (transRankedMatrix,alternatives) => {

  resRank = []
  let relMatrices = []  //массив матриц отношений

  transRankedMatrix.forEach((exp, expIndex) => {
    relMatrices[expIndex] = myF.createRelationalMatrix(exp,'',alternatives)
  })

  //матрица расстояний
  let distanceMatrix = myF.createDistanceMatrix(relMatrices)

  const indexMinDist = myF.findMinDist(distanceMatrix)

  resRank = transRankedMatrix[indexMinDist]

  return {name: ['Медиана Кемени'], resRank}
};

//Медиана Кемени в виде новой ранжировки
export const newMedianKemeny = (transRankedMatrix,alternatives) => {
  resRank = []
  let relMatrices = []  //массив матриц отношений

  //построение матриц отношений
  transRankedMatrix.forEach((exp, expIndex) => {
    relMatrices[expIndex] = myF.createRelationalMatrix(exp,'',alternatives)
  })

  //создание матрицы потерь
  let lossMatrix = myF.createLossMatrix(relMatrices,alternatives)

  let indexArray = []
  for (let i = 0; i < lossMatrix.length; i++) {
    indexArray[i] = i
  }

  let altIndex
  let tempLossMatrix = lossMatrix.slice()

  do {
    altIndex = myF.findMinDist(tempLossMatrix)
    resRank.push(altIndex + 1)
    indexArray.splice(indexArray.indexOf(altIndex), 1)
    tempLossMatrix = myF.deleteMatrixRowClm(tempLossMatrix, altIndex)

  } while (indexArray.length > 0)

  return {name: ['Медиана  Кемени в виде новой ранжировки'], resRank}
};

//Коэффициент конкордации
export const concordanceCof = (experts,alternatives) => {

  let m = experts.length
  let n = alternatives.length
  let cof
  let s = 0
  let sum
  let mr = 0
  experts.forEach(exp => {
    exp.points.forEach(alt => {
      mr += alt
    })
  })
  mr = mr / n
  for (let i = 0; i < alternatives.length; i++) {
    sum = 0
    for (let j = 0; j < experts.length; j++) {
      sum += experts[j].points[i]
    }
    s = s + Math.pow((sum - mr), 2)

  }
  cof = 12 * s / (Math.pow(m, 2) * (Math.pow(n, 3) - n))

  return cof
};