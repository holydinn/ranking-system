// const _ = require('lodash')
// const jStat = require('jstat')
//
// const experts = [
//   {
//     name: 'exp1',
//     index: 1,
//     points: [4, 5, 3, 6, 2, 1]
//   },
//   {
//     name: 'exp2',
//     index: 2,
//     points: [5, 1, 4, 6, 2, 3]
//   },
//   {
//     name: 'exp3',
//     index: 3,
//     points: [5, 2, 4, 6, 1, 3]
//   }
// ]
// let participants = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6']
// let resRank = []
//
// createExpert('exp4', [3, 4, 5, 6, 1, 2])
// createExpert('exp5', [6, 1, 4, 5, 3, 2])
// createExpert('exp6', [6, 4, 3, 1, 2, 5])
//
//
// function createExpert(name, points) {
//   experts.push({name: name, index: experts.length + 1, points: points})
// }
//
// // function transposeMatrix(matrix) {
// //   matrix = matrix[0].map((column, index) => matrix
// //     .map(row => row[index]))
// //   return matrix
// // }
//
// function createCompareMatrix(rankMatrix) {
//   //матрица попарных сравнений альтернатив
//   let comparisonMatrix = Array(participants.length).fill(0).map(() => Array(participants.length).fill(0))
//   let copyExpRank = []  // массив для обрабатываемой ранжировки
//   let preferredItems = []  //массив предпочтительных альтернатив
//
//   rankMatrix.forEach(exp => {
//     copyExpRank = exp.slice()
//     do {
//       //удаляем предпочтительную альтернативу из дальнейшей обработки
//       preferredItems.unshift(copyExpRank.shift() - 1)
//       comparisonMatrix[preferredItems[0]].forEach((value, index, array) => {
//
//         //увеличиваем число экспертов для которых данная альт-ва предпочтительна
//         if (!preferredItems.includes(index)) {
//           array[index]++
//         }
//       })
//     } while (copyExpRank.length > 0)
//     preferredItems.length = 0
//   })
//   return comparisonMatrix
// }
//
// function sortByKey(altsPoints) {
//   let temp, i
//   let res = []
//
//   temp = _.reduce(altsPoints, function (result, val, key) {
//     (result[val] || (result[val] = [])).push(key + 1)
//     return result
//   }, {})
//
//   //сортируем по убыванию очков(ключу)
//   let keys = Object.keys(temp)
//   keys.sort(function (a, b) {
//     return +b - +a
//   })
//
//   for (i = 0; i < keys.length; i++) {
//     res[i] = temp[keys[i]]
//   }
//   return res
// }
//
// function toNumber(arr) {
//   if (arr.length === 1)
//     return +arr
//   return arr.map(value => +value)
// }
//
// //построение матрицы Эксперт-альтернатива
// function createMatrixExpertRang() {
//   let rankedMatrix = Array(participants.length).fill(0).map(() => Array(experts.length))
//
//   for (let i = 0; i < experts.length; i++) {
//     for (let j = 0; j < participants.length; j++) {
//       rankedMatrix[experts[i].points[j] - 1][i] = j + 1
//     }
//   }
//
//   return rankedMatrix
// }
//
// //Правило относительного большинства
// function relativeMajorityRule(rankedMatrix) {
//   resRank = []
//
//   rankedMatrix.forEach((item, index) => {
//     const hashmap = item.reduce((acc, val) => {
//       acc[val] = (acc[val] || 0) + 1
//       return acc
//     }, {})
//
//     let temp = (Object.keys(hashmap)
//       .filter(
//         key => {
//           return hashmap[key] === Math.max.apply(null,
//             Object.values(hashmap))
//         }
//       ))
//
//     resRank[index] = toNumber(temp)
//   })
//
//   return {name: 'Правило относительного большинства', resRank}
// }
//
// //Победитель по Кондорсе
// function condorcetWinner(rankedMatrix) {
//   let altsPoints = Array(participants.length).fill(0)  //очки альтернативы в попарном сравнении
//
//   //матрица сравнений
//   let comparisonMatrix = createCompareMatrix(rankedMatrix)
//
//   //находим наилучшую альт-ву
//   for (let i = 0; i < participants.length - 1; i++) {
//     for (let j = i + 1; j < participants.length; j++) {
//       if (comparisonMatrix[i][j] > comparisonMatrix[j][i]) {
//         altsPoints[i]++
//         continue
//       } else if (comparisonMatrix[i][j] === comparisonMatrix[j][i]) {
//         altsPoints[j]++
//         altsPoints[i]++
//         continue
//       }
//       altsPoints[j]++
//     }
//   }
//
//   resRank = sortByKey(altsPoints)
//
//   return {name: 'Победитель по Кондорсе', resRank}
// }
//
// //Правило Копленда
// function copelandRule(rankedMatrix) {
//   let altsPoints = Array(participants.length).fill(0)  //очки альтернативы в попарном сравнении
//   resRank = []
//
//   //матрица сравнений
//   let comparisonMatrix = createCompareMatrix(rankedMatrix)
//
//   //находим наилучшую альт-ву
//   for (let i = 0; i < participants.length - 1; i++) {
//     for (let j = i + 1; j < participants.length; j++) {
//       if (comparisonMatrix[i][j] > comparisonMatrix[j][i]) {
//         altsPoints[i]++
//         altsPoints[j]--
//       } else if (comparisonMatrix[i][j] < comparisonMatrix[j][i]) {
//         altsPoints[j]++
//         altsPoints[i]--
//       }
//     }
//   }
//   resRank = sortByKey(altsPoints)
//
//   return {name: 'Правило Копленда', resRank}
// }
//
// //Правило Симпсона
// function simpsonRule(rankedMatrix) {
//   let altsPoints = Array(participants.length).fill(0)  //очки альтернативы в попарном сравнении
//   let temp = []
//   resRank = []
//
//   //матрица сравнений
//   let comparisonMatrix = createCompareMatrix(rankedMatrix)
//
//   //находим наилучшую альт-ву
//   for (let i = 0; i < participants.length; i++) {
//     temp = comparisonMatrix[i].slice()
//     temp.splice(i, 1)
//     altsPoints[i] = Math.min(...temp)
//   }
//   resRank = sortByKey(altsPoints)
//
//   return {name: 'Правило Симпсона', resRank}
// }
//
// //Правило Борда
// function bordRule(rankedMatrix) {
//   let altsPoints = Array(participants.length).fill(0)  //очки альтернатив в сравнении
//   resRank = []
//
//   rankedMatrix.forEach(exp => {
//     exp.forEach((alt, altIndex) => {
//       altsPoints[alt - 1] += exp.length - (altIndex - 1)
//     })
//   })
//
//   resRank = sortByKey(altsPoints)
//
//   return {name: 'Правило Борда>', resRank}
//
// }
//
// //создание матрицы отношений
// function createRelationalMatrix(matrix, key = '') {
//   let expertRank = matrix.slice()
//
//   let relMatrix = jStat.zeros(participants.length)
//   let preferredItems = []  //массив предпочтительных альтернатив
//
//   do {
//     //удаляем предпочтительную альтернативу из дальнейшей обработки
//     preferredItems.unshift(expertRank.shift() - 1)
//     relMatrix[preferredItems[0]].forEach((value, index, array) => {
//
//       // 1 - если альт-вы нет в preferredItems, т.е. она лучше
//       // -1 - если альт-ва есть в preferredItems, т.е. она хуже
//       if (!preferredItems.includes(index)) {
//         array[index] = 1
//       } else if (preferredItems.includes(index) && key != 'scale') {
//         array[index] = -1
//       }
//       array[preferredItems[0]] = 0
//     })
//   } while (expertRank.length > 0)
//   preferredItems.length = 0
//   return relMatrix
// }
//
// //поиск растояния между ранжировками по Кемени
// function findDistance(matrix1, matrix2) {
//   let dist = 0
//   let i, j
//
//   for (i = 0; i < matrix1.length - 1; i++) {
//     for (j = i + 1; j < matrix1.length; j++) {
//       dist += Math.abs((matrix1[i][j] - matrix2[i][j]))
//     }
//   }
//
//   return dist
// }
//
// //Матрица расстояний для ранжировок по Кемени
// function createDistanceMatrix(matrixArray) {
//   let distMatrix = jStat.zeros(matrixArray.length)
//   let curMatrix, nextMatrix
//
//   for (curMatrix = 0; curMatrix < matrixArray.length - 1; curMatrix++) {
//     for (nextMatrix = curMatrix + 1; nextMatrix < matrixArray.length; nextMatrix++) {
//       distMatrix[curMatrix][nextMatrix] = distMatrix[nextMatrix][curMatrix] = findDistance(matrixArray[curMatrix], matrixArray[nextMatrix])
//     }
//   }
//   return distMatrix
// }
//
// //Поиск индекса минимальной суммы ранжировки
// function findMinDist(distMatrix) {
//
//   let sumDist = []  //сумма растояний
//
//   distMatrix.forEach((elem, index) => {
//     sumDist[index] = elem.reduce((acc, val) => acc + val, 0)
//   })
//
//   let minDist
//   if (!sumDist.includes(0)) {
//     minDist = Math.min.apply(null, sumDist)
//   } else {
//     let temp = sumDist.filter((val) => {
//       return val !== 0
//     })
//     minDist = Math.min.apply(null, temp)
//   }
//
//   return sumDist.indexOf(minDist)
// }
//
// //Медиана Кемени
// function medianKemeny(rankedMatrix) {
//
//   resRank = []
//   let relMatrices = []  //массив матриц отношений
//
//   rankedMatrix.forEach((exp, expIndex) => {
//     relMatrices[expIndex] = createRelationalMatrix(exp)
//   })
//
//   //матрица расстояний
//   let distanceMatrix = createDistanceMatrix(relMatrices)
//
//   const indexMinDist = findMinDist(distanceMatrix)
//
//   resRank = rankedMatrix[indexMinDist]
//
//   return {name: 'Медиана Кемени', resRank}
// }
//
// //Матрица потерь для новой медианы Кемени
// function createLossMatrix(matrixArray) {
//   let i, j
//   let lossMatrix = jStat.zeros(participants.length)
//
//   matrixArray.forEach(matrix => {
//     for (i = 0; i < matrix.length; i++) {
//       for (j = 0; j < matrix.length; j++) {
//         switch (matrix[i][j]) {
//           case 0:
//             lossMatrix[i][j] += 1
//             break
//           case -1:
//             lossMatrix[i][j] += 2
//             break
//         }
//       }
//     }
//   })
//
//   return lossMatrix
// }
//
// //Медиана Кемени в виде новой ранжировки
// function newMedianKemeny(rankedMatrix) {
//   resRank = []
//   let relMatrices = []  //массив матриц отношений
//
//   //построение матриц отношений
//   rankedMatrix.forEach((exp, expIndex) => {
//     relMatrices[expIndex] = createRelationalMatrix(exp)
//   })
//
//   //создание матрицы потерь
//   let lossMatrix = createLossMatrix(relMatrices)
//
//   let indexArray = []
//   for (let i = 0; i < lossMatrix.length; i++) {
//     indexArray[i] = i
//   }
//
//   let altIndex
//   let tempLossMatrix = lossMatrix.slice()
//
//   do {
//     altIndex = findMinDist(tempLossMatrix)
//     resRank.push(altIndex + 1)
//     indexArray.splice(indexArray.indexOf(altIndex), 1)
//     tempLossMatrix = deleteMatrixRowClm(tempLossMatrix, altIndex)
//
//   } while (indexArray.length > 0)
//
//   return {name: 'Медиана Кемени в виде новой ранжировки', resRank}
// }
//
// function deleteMatrixRowClm(matrix, altIndex) {
//
//   matrix[altIndex].forEach((item, index) => {
//     matrix[altIndex][index] = 0
//   })
//
//   for (let i = 0; i < matrix.length; i++) {
//     matrix[i][altIndex] = 0
//   }
//   return matrix
//
// }
//
// //Коэффициент конкордации
// function concordanceCof() {
//
//   let m = experts.length
//   let n = participants.length
//   let cof = 0
//   let s = 0
//   let sum
//   let mr = 0
//   experts.forEach(exp => {
//     exp.points.forEach(alt => {
//       mr += alt
//     })
//   })
//   for (let i = 0; i < participants.length; i++) {
//     sum = 0
//     for (let j = 0; j < experts.length; j++) {
//       sum += experts[j].points[i]
//     }
//     s = s + Math.pow((sum - mr), 2)
//
//   }
//   cof = 12 * s / (Math.pow(m, 2) * (Math.pow(n, 3) - n))
//
//   return cof
// }
//
// function oneDimensionalScaling(rankedMatrix) {
//   let relMatrices = []  //массив матриц отношений
//
//   //матрица предпчтений
//   rankedMatrix.forEach((exp, expIndex) => {
//     relMatrices[expIndex] = createRelationalMatrix(exp, 'scale')
//   })
//
//   //частотная матрица предпочтений (p-)
//   let preferenceMatrix = multiplyMatrix(sumMatrix(relMatrices), (1 / relMatrices.length))
//
//   //console.log(preferenceMatrix)
//
//   let normDevMatrix = jStat.zeros(participants.length) // матрица нормированых отклонений (z-)
//
//   preferenceMatrix.forEach((row, rowIndex) => {
//     row.forEach((col, colIndex) => {
//       if (colIndex !== rowIndex) {
//         normDevMatrix[rowIndex][colIndex] = findNormalInv(col)
//       }
//     })
//   })
//   //console.log(normDevMatrix)
//
//   let averageNormDev = []  //среднее значение нормированных отклонений (z~)
//   normDevMatrix.forEach((row, rowIndex) => {
//     //averageNormDev[rowIndex] = +((jStat.sum(row) / row.length).toFixed(2))
//     averageNormDev[rowIndex] = jStat.sum(row) / row.length
//   })
//   let averagePref = []  // среднее значение частотных предпочтнений (p~)
//   for (let i = 0; i < averageNormDev.length; i++) {
//     //averagePref[i] = +((jStat.normal.cdf(averageNormDev[i], 0, 1)).toFixed(2))
//     averagePref[i] = jStat.normal.cdf(averageNormDev[i], 0, 1)
//   }
//
//   let indOfRelImportance = []  //показатель относительной важности (p*)
//   let averageInd = jStat.sum(averagePref)
//   for (let i = 0; i < averagePref.length; i++) {
//     indOfRelImportance[i] = averagePref[i] / averageInd
//     //indOfRelImportance[i]=+((averagePref[i]/averageInd).toFixed(2))
//   }
//   let diffNormDev = jStat.zeros(participants.length)  //разности средних нормированных отклоннений (~zi-~zj)
//   let frecPref = jStat.zeros(participants.length)  //частота предпочтений i перед j
//   for (let i = 0; i < participants.length - 1; i++) {
//     for (let j = i + 1; j < participants.length; j++) {
//       diffNormDev[i][j] = averageNormDev[i] - averageNormDev[j]
//       diffNormDev[j][i] = averageNormDev[j] - averageNormDev[i]
//       frecPref[i][j] = jStat.normal.cdf(diffNormDev[i][j], 0, 1)
//       frecPref[j][i] = jStat.normal.cdf(diffNormDev[j][i], 0, 1)
//     }
//   }
//   let diffFrecs = []
//   let maxFrecs = []
//   frecPref.forEach((row, rowIndex) => {
//     diffFrecs[rowIndex] = jStat.sum(row)
//     maxFrecs[rowIndex] = jStat.max(row)
//   })
//   let sigma = jStat.sum(diffFrecs) / (participants.length * (participants.length - 1))
//
//   console.log('наибольшая частоста: ', jStat.max(maxFrecs))
//   console.log('3 сигма: ', 3 * sigma)
//
//   if (jStat.max(maxFrecs) < 3 * sigma) {
//     return console.log("Экспертные оценки не противоречивы")
//   } else {
//     return console.log("Экспертные оценки противоречивы")
//   }
// }
//
// function findNormalInv(x) {
//   let res
//   if (x === 0) {
//     res = -3.9
//   } else if (x === 1) {
//     res = 3.9
//   } else {
//     //res = +((jStat.normal.inv(x, 0, 1)).toFixed(2))
//     res = jStat.normal.inv(x, 0, 1)
//   }
//
//   return res
// }
//
// function multiplyMatrix(matrix, num) {
//   let resMatrix = jStat.map(matrix, function (x) {
//     //return +((x * num).toFixed(2))
//     return x * num
//   })
//
//   return resMatrix
// }
//
// function sumMatrix(matrixArray) {
//   let resMatrix = jStat.zeros(matrixArray[0].length)
//
//   matrixArray.forEach(matr => {
//     for (let i = 0; i < matr.length; i++) {
//       for (let j = 0; j < matr.length; j++) {
//         resMatrix[i][j] += matr[i][j]
//       }
//     }
//   })
//   return resMatrix
//
// }
//
// const expertRangMatrix = createMatrixExpertRang()
// //console.log(expertRangMatrix)
//
// const transRankedMatrix = jStat.transpose(expertRangMatrix)  //транспонированная матрица Эксперт-Ранг для удобного обхода ранжировки
// const oneDimenScale = oneDimensionalScaling(transRankedMatrix)
//
// //console.log(resNewMedianKemeny)
//
// // const start = new Date().getTime();
// // const resMajorityRule = relativeMajorityRule(expertRangMatrix)
// // console.log(resMajorityRule)
// //
// // const resCondorcetWinner = condorcetWinner(transRankedMatrix)
// // console.log(resCondorcetWinner)
// //
// // const resCopelandRule = copelandRule(transRankedMatrix)
// // console.log(resCopelandRule)
// //
// // const resSimpsonRule = simpsonRule(transRankedMatrix)
// // console.log(resSimpsonRule)
// //
// // const resBordRule = bordRule(transRankedMatrix)
// // console.log(resBordRule)
// //
// // const resMedianKemeny = medianKemeny(transRankedMatrix)
// // console.log(resMedianKemeny)
// //
// // const resNewMedianKemeny = newMedianKemeny(transRankedMatrix)
// // console.log(resNewMedianKemeny)
// //
// // console.log('Коэффицент конкордации: ',concordanceCof())
// //
// // const end = new Date().getTime();
// // console.log(`SecondWay: ${end - start}ms`);