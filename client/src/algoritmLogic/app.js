import {
  bordRule, concordanceCof,
  condorcetWinner,
  copelandRule, medianKemeny, newMedianKemeny,
  relativeMajorityRule,
  simpsonRule
} from "./rankingAlgoritms.js";
import {oneDimensionalScaling} from "./scalingAlgoritms.js"
import * as myF from "./helpFunctions.js";
import jStat from "jstat";

export const doAlgoritms = (experts, alternatives) => {
  const start = new Date().getTime();
  let results = []
  const rankedMatrix = myF.createMatrixExpertRang(experts, alternatives)

//транспонированная матрица Эксперт-Ранг для удобного обхода ранжировки
  const transRankedMatrix = jStat.transpose(rankedMatrix)

  const resMajorityRule = relativeMajorityRule(rankedMatrix)
  //console.log(resMajorityRule)
  results.push(resMajorityRule)
  const resCondorcetWinner = condorcetWinner(alternatives, transRankedMatrix)
  //console.log(resCondorcetWinner)
  results.push(resCondorcetWinner)
  const resCopelandRule = copelandRule(alternatives, transRankedMatrix)
  //console.log(resCopelandRule)
  results.push(resCopelandRule)
  const resSimpsonRule = simpsonRule(alternatives, transRankedMatrix)
  //console.log(resSimpsonRule)
  results.push(resSimpsonRule)
  const resBordRule = bordRule(alternatives, transRankedMatrix)
  //console.log(resBordRule)
  results.push(resBordRule)
  const resMedianKemeny = medianKemeny(transRankedMatrix, alternatives)
  // console.log(resMedianKemeny)
  results.push(resMedianKemeny)
  const resNewMedianKemeny = newMedianKemeny(transRankedMatrix, alternatives)
  // console.log(resNewMedianKemeny)
  results.push(resNewMedianKemeny)
  console.log('Коэффицент конкордации: ', concordanceCof(experts, alternatives))

  const oneDimenScale = oneDimensionalScaling(alternatives, transRankedMatrix)
  //console.log(oneDimenScale)
  results.push(oneDimenScale)
  const end = new Date().getTime();
  //console.log(`SecondWay: ${end - start}ms`);
  return (results)
}
