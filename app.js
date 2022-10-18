const _ = require('lodash')

const experts = [
  {
    name: 'exp1',
    index: 1,
    points: [1, 2, 5, 6, 4, 3]
  },
  {
    name: 'exp2',
    index: 2,
    points: [5, 6, 1, 3, 4, 2]
  },
  {
    name: 'exp3',
    index: 3,
    points: [4, 5, 6, 2, 1, 3]
  }
]
let participants = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6']
let resRank = []

createExpert('exp4', [4, 6, 5, 3, 1, 2])

function createExpert(name, points) {
  experts.push({name: name, index: experts.length + 1, points: points})
}

function transposeMatrix(matrix) {
  matrix = matrix[0].map((column, index) => matrix
    .map(row => row[index]))
  return matrix
}

function createCompareMatrix(rankMatrix) {
  //матрица попарных сравнений альтернатив
  let comparisonMatrix = Array(participants.length).fill(0).map(() => Array(participants.length).fill(0))
  let copyExpRank = []  // массив для обрабатываемой ранжировки
  let preferredItems = []  //массив предпочтительных альтернатив

  rankMatrix.forEach(exp => {
    copyExpRank = exp.slice()
    do {
      //удаляем предпочтительную альтернативу из дальнейшей обработки
      preferredItems.unshift(copyExpRank.shift() - 1)
      comparisonMatrix[preferredItems[0]].forEach((value, index, array) => {

        //увеличиваем число экспертов для которых данная альт-ва предпочтительна
        if (!preferredItems.includes(index)) {
          array[index]++
        }
      })
    } while (copyExpRank.length > 0)
    preferredItems.length = 0
  })
  return comparisonMatrix
}

function sortByKey(altsPoints) {
  let temp, i
  let res = []

  temp = _.reduce(altsPoints, function (result, val, key) {
    (result[val] || (result[val] = [])).push(key + 1)
    return result
  }, {})

  //сортируем по убыванию очков(ключу)
  let keys = Object.keys(temp)
  keys.sort(function (a, b) {
    return +b - +a
  })

  for (i = 0; i < keys.length; i++) {
    res[i] = temp[keys[i]]
  }
  return res
}

function toNumber(arr) {
  if (arr.length === 1)
    return +arr
  return arr.map(value => +value)
}

//построение матрицы Эксперт-альтернатива
function createMatrixExpertRang() {
  let rankedMatrix = Array(participants.length).fill(0).map(() => Array(experts.length))

  for (let i = 0; i < experts.length; i++) {
    for (let j = 0; j < participants.length; j++) {
      rankedMatrix[experts[i].points[j] - 1][i] = j + 1
    }
  }

  return rankedMatrix
}

//Правило относительного большинства
function relativeMajorityRule(rankedMatrix) {
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

    resRank[index] = toNumber(temp)
  })

  return {name: 'Правило относительного большинства', resRank}
}

//Победитель по Кондорсе
function condorcetWinner(rankedMatrix) {
  let altsPoints = Array(participants.length).fill(0)  //очки альтернативы в попарном сравнении

  //транспонированная матрица Эксперт-Ранг для удобного обхода ранжировки
  rankedMatrix = transposeMatrix(rankedMatrix)

  //матрица сравнений
  let comparisonMatrix = createCompareMatrix(rankedMatrix)

  //находим наилучшую альт-ву
  for (let i = 0; i < participants.length - 1; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      if (comparisonMatrix[i][j] > comparisonMatrix[j][i]) {
        altsPoints[i]++
      } else if (comparisonMatrix[i][j] === comparisonMatrix[j][i]) {
        altsPoints[j]++
        altsPoints[i]++
        continue
      }
      altsPoints[j]++
    }
  }

  resRank = sortByKey(altsPoints)

  return {name: 'Победитель по Кондорсе', resRank}
}

//Правило Копленда
function copelandRule(rankedMatrix) {
  let altsPoints = Array(participants.length).fill(0)  //очки альтернативы в попарном сравнении
  resRank = []

  //транспонированная матрица Эксперт-Ранг для удобного обхода ранжировки
  rankedMatrix = transposeMatrix(rankedMatrix)

  //матрица сравнений
  let comparisonMatrix = createCompareMatrix(rankedMatrix)

  //находим наилучшую альт-ву
  for (let i = 0; i < participants.length - 1; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      if (comparisonMatrix[i][j] > comparisonMatrix[j][i]) {
        altsPoints[i]++
        altsPoints[j]--
      } else if (comparisonMatrix[i][j] < comparisonMatrix[j][i]) {
        altsPoints[j]++
        altsPoints[i]--
      }
    }
  }
  resRank = sortByKey(altsPoints)

  return {name: 'Правило Копленда', resRank}
}

//Правило Симпсона
function simpsonRule(rankedMatrix) {
  let altsPoints = Array(participants.length).fill(0)  //очки альтернативы в попарном сравнении
  let temp = []
  resRank = []

  //транспонированная матрица Эксперт-Ранг для удобного обхода ранжировки
  rankedMatrix = transposeMatrix(rankedMatrix)

  //матрица сравнений
  let comparisonMatrix = createCompareMatrix(rankedMatrix)

  //находим наилучшую альт-ву
  for (let i = 0; i < participants.length; i++) {
    temp = comparisonMatrix[i].slice()
    temp.splice(i, 1)
    altsPoints[i] = Math.min(...temp)
  }
  resRank = sortByKey(altsPoints)

  return {name: 'Правило Симпсона', resRank}
}

const expertRangMatrix = createMatrixExpertRang()
//console.log(expertRangMatrix)

const resMajorityRule = relativeMajorityRule(expertRangMatrix)
console.log(resMajorityRule)

const resCondorcetWinner = condorcetWinner(expertRangMatrix)
console.log(resCondorcetWinner)

const resCopelandRule = copelandRule(expertRangMatrix)
console.log(resCopelandRule)

const resSimpsonRule = simpsonRule(expertRangMatrix)
console.log(resSimpsonRule)