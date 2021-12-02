import { testData2 } from "../test-data";
import {
  calculateNextPosition,
  calculatePositionFromDirectionalData,
  DirectionDataPoint,
  DirectionInput,
  Position,
} from "./calculate-positions-from-directional-data";

describe("calculate positions from directional data", () => {
  it("doesn't explode", () => {});
});

describe("calculate next position", () => {
  it("Should calculate correctly when not moving and no aim", () => {
    const currentPosition: Position = {
      depth: 0,
      aim: 0,
      horizontalPosition: 0,
    };

    const directionDataPoint: DirectionDataPoint = {
      up: 0,
      down: 0,
      forward: 0,
    };

    expect(calculateNextPosition(currentPosition, directionDataPoint)).toEqual({
      depth: 0,
      aim: 0,
      horizontalPosition: 0,
    });
  });
  it("Should calculate correctly when not moving and with aim", () => {
    const currentPosition: Position = {
      depth: 0,
      aim: 5,
      horizontalPosition: 0,
    };

    const directionDataPoint: DirectionDataPoint = {
      up: 0,
      down: 0,
      forward: 0,
    };

    expect(calculateNextPosition(currentPosition, directionDataPoint)).toEqual({
      depth: 0,
      aim: 5,
      horizontalPosition: 0,
    });
  });

  it("With no aim, moving forward will not change depth", () => {
    const currentPosition: Position = {
      depth: 0,
      aim: 0,
      horizontalPosition: 0,
    };

    const directionDataPoint: DirectionDataPoint = {
      up: 0,
      down: 0,
      forward: 1,
    };

    expect(calculateNextPosition(currentPosition, directionDataPoint)).toEqual({
      depth: 0,
      aim: 0,
      horizontalPosition: 1,
    });
  });

  it("With aim, moving forward will change depth by distance multiplied by aim ", () => {
    const currentPosition: Position = {
      depth: 0,
      aim: 2,
      horizontalPosition: 0,
    };

    const directionDataPoint: DirectionDataPoint = {
      up: 0,
      down: 0,
      forward: 1,
    };

    expect(calculateNextPosition(currentPosition, directionDataPoint)).toEqual({
      depth: 2,
      aim: 2,
      horizontalPosition: 1,
    });
  });

  it("Works with the test example", () => {
    const data = [
      "forward 5",
      "down 5",
      "forward 8",
      "up 3",
      "down 8",
      "forward 2",
    ] as DirectionInput[];

    const position = calculatePositionFromDirectionalData(data);
    expect(position.horizontalPosition).toBe(15);
    expect(position.depth).toBe(60);
  });
  it("Gets me the fucking answer", () => {
    const position = calculatePositionFromDirectionalData(testData2);
    console.log(738712 * 2165);
    expect(position).toEqual({
      aim: 933,
      depth: 738712,
      horizontalPosition: 2165,
    });
  });
});
