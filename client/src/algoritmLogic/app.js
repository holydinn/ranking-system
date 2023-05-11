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

export const doAlgoritms = async (experts, alternatives) => {
  let results = []
  const rankedMatrix = myF.createMatrixExpertRang(experts, alternatives)

//транспонированная матрица Эксперт-Ранг для удобного обхода ранжировки
  const transRankedMatrix = jStat.transpose(rankedMatrix)
  const resMajorityRule = relativeMajorityRule(rankedMatrix)
  results.push(resMajorityRule)

  const resCondorcetWinner = condorcetWinner(alternatives, transRankedMatrix)
  results.push(resCondorcetWinner)

  const resCopelandRule = copelandRule(alternatives, transRankedMatrix)
  results.push(resCopelandRule)

  const resSimpsonRule = simpsonRule(alternatives, transRankedMatrix)
  results.push(resSimpsonRule)

  const resBordRule = bordRule(alternatives, transRankedMatrix)
  results.push(resBordRule)

  const resMedianKemeny = medianKemeny(transRankedMatrix, alternatives)
  results.push(resMedianKemeny)

  const resNewMedianKemeny = newMedianKemeny(transRankedMatrix, alternatives)
  results.push(resNewMedianKemeny)


  const resRankMap = new Map();
  for (const obj of results) {
    const resRankKey = JSON.stringify(obj.resRank);

    if (!resRankMap.has(resRankKey)) {
      resRankMap.set(resRankKey, {name: [obj.name], resRank: obj.resRank});
    } else {
      const existingObj = resRankMap.get(resRankKey);
      existingObj.name.push(obj.name);
    }
  }

  const result = Array.from(resRankMap.values());
  return (result)
}

export const concordanceCoef = (experts, alternatives) => {
  return (concordanceCof(experts, alternatives))
}

export const thurstone = (experts, alternatives) => {
  const rankedMatrix = myF.createMatrixExpertRang(experts, alternatives)

//транспонированная матрица Эксперт-Ранг для удобного обхода ранжировки
  const transRankedMatrix = jStat.transpose(rankedMatrix)
  const oneDimenScale = oneDimensionalScaling(alternatives, transRankedMatrix)

  return (oneDimenScale)

}
