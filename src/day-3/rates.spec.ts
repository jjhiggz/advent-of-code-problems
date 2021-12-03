import { exampleData } from "./exampleData";
import { getAnswer, getCO2GeneratorRating, getOxygenGeneratorRating, getRates, leastCommonBits, mostCommonBits, parseData } from "./rates";
import { testData3 } from "./testData";

describe("parse data", () => {
  it("should fucking work", () => {
    expect(parseData(exampleData)).toEqual([
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ]);
  });
});

describe("Get Data", () => {
  it("should fucking work", () => {
    expect(
      getRates([
        "00100",
        "11110",
        "10110",
        "10111",
        "10101",
        "01111",
        "00111",
        "11100",
        "10000",
        "11001",
        "00010",
        "01010",
      ])
    ).toEqual({
      gamma: "10110",
      epsilon: "01001",
    });
  });
});

describe("get answer", () => {
  it("should work for the example problem", () => {
    expect(getAnswer(exampleData)).toBe(198);
  });

  it("should work for the test data", () => {
    expect(getAnswer(testData3)).toBe(2003336);
  });

});

describe("most commons", () => {
    it("should work for example data", () => {
        expect(mostCommonBits(parseData(exampleData))).toEqual([1, 0, 1, 1, 0])
    })

    it("least commons", () => {
        expect(leastCommonBits(parseData(exampleData))).toEqual([0, 1, 0, 0, 1])
    })
})

describe.skip("oxygen", () => {
    it("should explore", () => {
        const bitstrings = parseData(exampleData)
        expect(getOxygenGeneratorRating(bitstrings, 0, commonBits)).toBe("10111")
    })

    it("should get the CO2", () => {
        const bitstrings = parseData(exampleData)
        const uncommonBits = leastCommonBits(bitstrings)
        expect(getCO2GeneratorRating(bitstrings, 0, uncommonBits)).toBe("10111")
    })
    it("logs me the fucking answer", () => {
        const bitstrings = parseData(testData3)
        const uncommonBits = leastCommonBits(bitstrings)
        const commonBits = mostCommonBits(bitstrings)
        const co2 = parseInt(getCO2GeneratorRating(bitstrings, 0, uncommonBits), 2)
        const o2 = parseInt(getOxygenGeneratorRating(bitstrings, 0, commonBits), 2)
        console.log(co2, o2)
        console.log("answer: ", co2 * o2)
        expect(true).toBe(true)
    })
})
