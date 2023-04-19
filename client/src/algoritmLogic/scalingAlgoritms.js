import jStat from "jstat";
import * as myF from "./helpFunctions.js";

export const oneDimensionalScaling = (alternatives,transRankedMatrix) => {
  let relMatrices = []  //массив матриц отношений

  //матрица предпочтений
  transRankedMatrix.forEach((exp, expIndex) => {
    relMatrices[expIndex] = myF.createRelationalMatrix(exp, 'scale',alternatives)
  })

  //частотная матрица предпочтений (p-)
  let preferenceMatrix = myF.multiplyMatrix(myF.sumMatrix(relMatrices), (1 / relMatrices.length))

  // матрица нормированых отклонений (z-)
  let normDevMatrix = jStat.zeros(alternatives.length)

  preferenceMatrix.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (colIndex !== rowIndex) {
        normDevMatrix[rowIndex][colIndex] = myF.findNormalInv(col)
      }
    })
  })

  //среднее значение нормированных отклонений (z~)
  let averageNormDev = []
  normDevMatrix.forEach((row, rowIndex) => {
    averageNormDev[rowIndex] = jStat.sum(row) / row.length
  })

  // среднее значение частотных предпочтнений (p~)
  let averagePref = []
  for (let i = 0; i < averageNormDev.length; i++) {
    averagePref[i] = jStat.normal.cdf(averageNormDev[i], 0, 1)
  }

  let indOfRelImportance = []  //показатель относительной важности (p*)
  let averageInd = jStat.sum(averagePref)
  for (let i = 0; i < averagePref.length; i++) {
    indOfRelImportance[i] = averagePref[i] / averageInd
  }

  let resRank = myF.sortByKey(indOfRelImportance,alternatives)

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

  // console.log('наибольшая частоста: ', jStat.max(maxFrecs))
  // console.log('3 сигма: ', 3 * sigma)

  if (jStat.max(maxFrecs) < 3 * sigma) {
    return {name: ["Согласно модели Терстоуна экспертные оценки не противоречивы"], resRank}
  }
  return {name: ["Согласно модели Терстоуна экспертные оценки противоречивы"]}

};