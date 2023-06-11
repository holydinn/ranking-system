import jStat from "jstat";
import _ from "lodash";


export const createCompareMatrix = (rankMatrix,alternatives) => {
  //матрица попарных сравнений альтернатив
  let comparisonMatrix = jStat.zeros(alternatives.length)
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
};

export const sortByKey = (altsPoints,alternatives) => {
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
  if (res.length === alternatives.length) {
    res = res.flat(1)
  }
  return res
};

export const toNumber = (arr) => {
  if (arr.length === 1)
    return +arr
  return arr.map(value => +value)
};

export const createMatrixExpertRang = (experts,alternatives) => {
  let rankedMatrix = Array(alternatives.length).fill(0).map(() => Array(experts.length))

  for (let i = 0; i < experts.length; i++) {
    for (let j = 0; j < alternatives.length; j++) {
      rankedMatrix[experts[i].points[j] - 1][i] = j + 1
    }
  }
  return rankedMatrix
};

//создание матрицы отношений
export const createRelationalMatrix = (matrix, key ,alternatives) => {
  let expertRank = matrix.slice()

  let relMatrix = jStat.zeros(alternatives.length)
  let preferredItems = []  //массив предпочтительных альтернатив

  do {
    //удаляем предпочтительную альтернативу из дальнейшей обработки
    preferredItems.unshift(expertRank.shift() - 1)
    relMatrix[preferredItems[0]].forEach((value, index, array) => {
      // 1 - если альт-вы нет в preferredItems, т.е. она лучше
      // -1 - если альт-ва есть в preferredItems, т.е. она хуже
      if (!preferredItems.includes(index)) {
        array[index] = 1
      } else if (preferredItems.includes(index) && key !== 'scale') {
        array[index] = -1
      }
      array[preferredItems[0]] = 0
    })
  } while (expertRank.length > 0)
  preferredItems.length = 0
  return relMatrix
};

//поиск растояния между ранжировками по Кемени
export const findDistance = (matrix1, matrix2) => {
  let dist = 0
  let i, j

  for (i = 0; i < matrix1.length - 1; i++) {
    for (j = i + 1; j < matrix1.length; j++) {
      dist += Math.abs((matrix1[i][j] - matrix2[i][j]))
    }
  }
  return dist
};

//Матрица расстояний для ранжировок по Кемени
export const createDistanceMatrix = (matrixArray) => {
  let distMatrix = jStat.zeros(matrixArray.length)
  let curMatrix, nextMatrix

  for (curMatrix = 0; curMatrix < matrixArray.length - 1; curMatrix++) {
    for (nextMatrix = curMatrix + 1; nextMatrix < matrixArray.length; nextMatrix++) {
      distMatrix[curMatrix][nextMatrix] = distMatrix[nextMatrix][curMatrix] = findDistance(matrixArray[curMatrix], matrixArray[nextMatrix])
    }
  }
  return distMatrix
};

//Поиск индекса минимальной суммы ранжировки
export const findMinDist = (distMatrix) => {

  let sumDist = []  //сумма растояний

  distMatrix.forEach((elem, index) => {
    sumDist[index] = elem.reduce((acc, val) => acc + val, 0)
  })

  let minDist
  if (!sumDist.includes(0)) {
    minDist = Math.min.apply(null, sumDist)
  } else {
    let temp = sumDist.filter((val) => {
      return val !== 0
    })
    if (temp.length === 0) {
      return 0
    }else {
      minDist = Math.min.apply(null, temp)
    }
  }
  return sumDist.indexOf(minDist)
};

//Матрица потерь для новой медианы Кемени
export const createLossMatrix = (matrixArray,alternatives) => {
  let i, j
  let lossMatrix = jStat.zeros(alternatives.length)

  matrixArray.forEach(matrix => {
    for (i = 0; i < matrix.length; i++) {
      for (j = 0; j < matrix.length; j++) {
        switch (matrix[i][j]) {
          case 0:
            lossMatrix[i][j] += 1
            break
          case -1:
            lossMatrix[i][j] += 2
            break
        }
      }
    }
  })
  return lossMatrix
};

export const deleteMatrixRowClm = (matrix, altIndex) => {

  matrix[altIndex].forEach((item, index) => {
    matrix[altIndex][index] = 0
  })

  for (let i = 0; i < matrix.length; i++) {
    matrix[i][altIndex] = 0
  }
  return matrix
};

export const findNormalInv = (x) => {
  let res
  if (x === 0) {
    res = -3.9
  } else if (x === 1) {
    res = 3.9
  } else {
    res = jStat.normal.inv(x, 0, 1)
  }

  return res
}

export const multiplyMatrix = (matrix, num) => {
  return jStat.map(matrix, function (x) {
    return x * num
  })
}

export const sumMatrix = (matrixArray) => {
  let resMatrix = jStat.zeros(matrixArray[0].length)

  matrixArray.forEach(matr => {
    for (let i = 0; i < matr.length; i++) {
      for (let j = 0; j < matr.length; j++) {
        resMatrix[i][j] += matr[i][j]
      }
    }
  })
  return resMatrix
}