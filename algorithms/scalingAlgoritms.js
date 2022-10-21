import {alternatives} from "../context";
const jStat = require("jstat");
import * as myF from "./helpFunctions";

export const oneDimensionalScaling = (rankedMatrix) => {
  let relMatrices = []  //массив матриц отношений

  //матрица предпчтений
  rankedMatrix.forEach((exp, expIndex) => {
    relMatrices[expIndex] = myF.createRelationalMatrix(exp, 'scale')
  })

  //частотная матрица предпочтений (p-)
  let preferenceMatrix = multiplyMatrix(sumMatrix(relMatrices), (1 / relMatrices.length))

  //console.log(preferenceMatrix)

  let normDevMatrix = jStat.zeros(alternatives.length) // матрица нормированых отклонений (z-)

  preferenceMatrix.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (colIndex !== rowIndex) {
        normDevMatrix[rowIndex][colIndex] = myF.findNormalInv(col)
      }
    })
  })
  //console.log(normDevMatrix)

  let averageNormDev = []  //среднее значение нормированных отклонений (z~)
  normDevMatrix.forEach((row, rowIndex) => {
    //averageNormDev[rowIndex] = +((jStat.sum(row) / row.length).toFixed(2))
    averageNormDev[rowIndex] = jStat.sum(row) / row.length
  })
  let averagePref = []  // среднее значение частотных предпочтнений (p~)
  for (let i = 0; i < averageNormDev.length; i++) {
    //averagePref[i] = +((jStat.normal.cdf(averageNormDev[i], 0, 1)).toFixed(2))
    averagePref[i] = jStat.normal.cdf(averageNormDev[i], 0, 1)
  }

  let indOfRelImportance = []  //показатель относительной важности (p*)
  let averageInd = jStat.sum(averagePref)
  for (let i = 0; i < averagePref.length; i++) {
    indOfRelImportance[i] = averagePref[i] / averageInd
    //indOfRelImportance[i]=+((averagePref[i]/averageInd).toFixed(2))
  }
  let diffNormDev = jStat.zeros(alternatives.length)  //разности средних нормированных отклоннений (~zi-~zj)
  let frecPref = jStat.zeros(alternatives.length)  //частота предпочтений i перед j
  for (let i = 0; i < alternatives.length - 1; i++) {
    for (let j = i + 1; j < alternatives.length; j++) {
      diffNormDev[i][j] = averageNormDev[i] - averageNormDev[j]
      diffNormDev[j][i] = averageNormDev[j] - averageNormDev[i]
      frecPref[i][j] = jStat.normal.cdf(diffNormDev[i][j], 0, 1)
      frecPref[j][i] = jStat.normal.cdf(diffNormDev[j][i], 0, 1)
    }
  }
  let diffFrecs = []
  let maxFrecs = []
  frecPref.forEach((row, rowIndex) => {
    diffFrecs[rowIndex] = jStat.sum(row)
    maxFrecs[rowIndex] = jStat.max(row)
  })
  let sigma = jStat.sum(diffFrecs) / (alternatives.length * (alternatives.length - 1))

  console.log('наибольшая частоста: ', jStat.max(maxFrecs))
  console.log('3 сигма: ', 3 * sigma)

  if (jStat.max(maxFrecs) < 3 * sigma) {
    return console.log("Экспертные оценки не противоречивы")
  } else {
    return console.log("Экспертные оценки противоречивы")
  }
}