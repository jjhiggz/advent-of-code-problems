import { isNegative, isPositive, isZero } from "../day-1/depth-increase-counter";

export interface Rates {
  gamma: string;
  epsilon: string;
}

type Bitstring = ("1" | "0")[];
export const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (v, k) => k + start);

export const parseData = (bitstrings: string): string[] =>
  bitstrings.trim().split("\n") as Bitstring;

export const mostCommonBits = (bitstringArray: string[]) => {
  const startRange = range(0, bitstringArray[0].length).map((num) => 0);
  const valueArray = bitstringArray.reduce<number[]>(
    (acc, currentTracker) =>
      currentTracker.split("").map((bitstring, indexOfTracker) => {
        const incrementBy = bitstring === "1" ? 1 : -1;
        return acc[indexOfTracker] + incrementBy;
      }),
    startRange as number[]
  );
  console.log(valueArray)
  const bitArray = valueArray.map(num => isPositive(num) || isZero(num)).map((boolean) => +boolean);
  return bitArray;
};

export const leastCommonBits = (bitstring: string[]) =>
  mostCommonBits(bitstring).map((bit) => (bit === 0 ? 1 : 0));

export const getRates = (bitstringArray: string[]) => {
  const startRange = range(0, bitstringArray[0].length).map((num) => 0);
  const tracker = bitstringArray.reduce<number[]>(
    (acc, currentTracker) =>
      currentTracker.split("").map((bitstring, indexOfTracker) => {
        const incrementBy = bitstring === "1" ? 1 : -1;
        return acc[indexOfTracker] + incrementBy;
      }),
    startRange as number[]
  );

  const gammastring = tracker
    .map((num) => (isPositive(num) ? "1" : "0"))
    .join("");
  const epsilonstring = tracker
    .map((num) => (isPositive(num) ? "0" : "1"))
    .join("");
  return {
    gamma: gammastring,
    epsilon: epsilonstring,
  } as Rates;
};

export const getOxygenGeneratorRating = (bitstrings: string[], position: number, commonBits: number[]): string => {
    if(bitstrings.length === 1){
        return bitstrings[0]
    }
    const newBitstrings = bitstrings.filter(bitstring => bitstring[position] === `${commonBits[position]}`)
    const newMostCommonBits = mostCommonBits(newBitstrings)
    return getOxygenGeneratorRating(newBitstrings, position + 1, newMostCommonBits)
}

export const getCO2GeneratorRating = (bitstrings: string[], position: number, uncommonBits: number[]): string => {
    if(bitstrings.length === 1){
        return bitstrings[0]
    }
    const newBitstrings = bitstrings.filter(bitstring => bitstring[position] === `${uncommonBits[position]}`)
    const newLeastCommonBits = leastCommonBits(newBitstrings)
    return getCO2GeneratorRating(newBitstrings, position + 1, newLeastCommonBits)
}

export const getAnswer = (bitstrings: string) => {
  const parsedStrings = parseData(bitstrings);
  const rates = getRates(parsedStrings);
  const gammaValue = parseInt(rates.gamma, 2);
  const epsilonValue = parseInt(rates.epsilon, 2);
  return gammaValue * epsilonValue;
};
