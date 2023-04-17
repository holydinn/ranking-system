import {
  bordRule, concordanceCof,
  condorcetWinner,
  copelandRule, medianKemeny, newMedianKemeny,
  relativeMajorityRule,
  simpsonRule
} from "./algorithms/rankingAlgoritms.js";
import {oneDimensionalScaling} from "./algorithms/scalingAlgoritms.js"
import {createExpert1} from "./algorithms/helpFunctions.js";


// createExpert1('exp4', [3, 4, 5, 6, 1, 2])
// createExpert1('exp5', [6, 1, 4, 5, 3, 2])
// createExpert1('exp6', [6, 4, 3, 1, 2, 5])


const start = new Date().getTime();

const resMajorityRule = relativeMajorityRule()
console.log(resMajorityRule)

const resCondorcetWinner = condorcetWinner()
console.log(resCondorcetWinner)

const resCopelandRule = copelandRule()
console.log(resCopelandRule)

const resSimpsonRule = simpsonRule()
console.log(resSimpsonRule)

const resBordRule = bordRule()
console.log(resBordRule)

const resMedianKemeny = medianKemeny()
console.log(resMedianKemeny)

const resNewMedianKemeny = newMedianKemeny()
console.log(resNewMedianKemeny)

console.log('Коэффицент конкордации: ',concordanceCof())

const oneDimenScale = oneDimensionalScaling()
console.log(oneDimenScale)

const end = new Date().getTime();
console.log(`SecondWay: ${end - start}ms`);