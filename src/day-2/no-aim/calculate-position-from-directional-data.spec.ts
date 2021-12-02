import {
  calculatePositionsFromDirectionalData,
  DirectionInput,
} from "./calculate-positions-from-directional-data";
import { testData2 } from "./test-data";

describe("calculate positions from directional data", () => {
  it("should do shit", () => {
    const testData = ["forward 1", "down 1"] as DirectionInput[]; // horizontal 1 vertical 1

    expect(calculatePositionsFromDirectionalData(testData)).toEqual({
      depth: 1,
      horizontalPosition: 1,
    });
  });

  it("should work on their test data", () => {
    const testData = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"] as DirectionInput[];
    expect(calculatePositionsFromDirectionalData(testData)).toEqual({
        depth: 10,
        horizontalPosition: 15
    })
  });
  it("should give me the fucking answer", () => {
      console.log(933 * 2165)

    expect(calculatePositionsFromDirectionalData(testData2)).toEqual({
        depth: 933,
        horizontalPosition: 2165
    })

  });

});
