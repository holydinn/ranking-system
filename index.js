// let i, j, k, m;
// let repeatedFlag = false; //флаг повторного ранга
// let repeatedRank = Array(numParticipants).fill(0);  //вспомогательный массив
// let tempArray = Array(numParticipants).fill(0);
// let rankedArr = Array(numExperts).fill(0).map(() => Array(numParticipants)); //двумерный массив эксперты-альтернативы
// rankedArr = [
//   [1, 2, 5, 6, 4, 3],
//   [5, 6, 1, 3, 4, 2],
//   [4, 5, 6, 2, 1, 3]
// ];
// let newRankedArr = Array(numExperts).fill(0).map(() => Array(numParticipants));
// for (i = 0; i < numExperts; i++) {  //проврка на повторный ранг
//   for (j = 0; j < (numParticipants - 1); j++) {
//     for (k = j + 1; k < numParticipants; k++) {
//       if (rankedArr[i][j] === rankedArr[i][k]) {
//         repeatedFlag = true;
//         repeatedRank[rankedArr[i][j] - 1]++;
//         break;
//       }
//     }
//   }
//   let count = 0;
//   let standardRank = 0;
//   if (repeatedFlag) {
//     repeatedRank.forEach(function (item, index) {
//       count++;
//       if (item === 0 && tempArray[index] === 0) {
//         tempArray[index] = count;
//       } else if (item != 0) {
//         for (m = 0; m <= item; m++) {
//           standardRank += (count + m);
//         }
//         standardRank /= (item + 1);
//         for (m = 0; m <= item; m++) {
//           tempArray[index] = standardRank;
//         }
//         standardRank = 0;
//         count += item;
//       }
//     })
//     for (j = 0; j < numParticipants; j++) {
//       newRankedArr[i][j] = tempArray[(rankedArr[i][j]) - 1]
//     }
//     repeatedFlag = false;
//   } else {
//     for (j = 0; j < numParticipants; j++) {
//       newRankedArr[i][j] = rankedArr[i][j]
//     }
//   }
//   repeatedRank.fill(0);
// }
// let sum = 0;
// let resultRang = new Map();
// for (i = 0; i < numParticipants; i++) {
//   for (j = 0; j < numExperts; j++) {
//     sum += newRankedArr[j][i];
//   }
//   resultRang.set(i, sum);
//   sum = 0;
// }
// console.log(resultRang)
//
// /*
// console.log(resultRang.sort(function (a,b){
//     return a-b;
// }))*/
//
// function relativeMajorityRule(rangMatrix) {
//   let arrStud = Array(numParticipants).fill(0);
//   let resOtnBol = Array(numParticipants).fill(0);
//   let nomPoint, nomExpert, nomStud, nomSearch, nomSearch1;
//   let searchOk = false;
//   for (nomPoint = 0; nomPoint < arrStud.length; nomPoint++) {
//     arrStud.fill(0);//обнуляем буфер
//     for (nomExpert = 0; nomExpert < arrStud.length; nomExpert++) {
//       arrStud[rangMatrix[nomExpert][nomPoint]]++;
//     }
//     let max = 0;
//     nomStud = 0;
//     while (nomStud < arrStud.length) {
//       if (arrStud[nomStud] > max) {
//         nomSearch = 0;
//         searchOk = false;
//         while (nomSearch < nomPoint) {//&&resOtnBol[nomSearch].)
//           nomSearch1 = 0;
//
//         }
//       }
//     }
//   }
// }

function sumInput() {

  let arr = []
  while (true) {
    let value = prompt('enter the number',0)
    if (value === '' || value === null || isFinite(value)) {
      break
    }
    arr.push(+value)

  }
  return (arr.reduce((previousValue, currentValue) => previousValue + currentValue))

}

console.log(sumInput())