import { depthIncreaseCounter } from "./depth-increase-counter";
import { testData } from "./test-data";

describe("depthIncreaseCounter", () => {
  describe("regular mode", () => {
    it("should exist", () => {
      expect(depthIncreaseCounter).toBeDefined();
    });

    it("Should be 1 with two data points 1 increasing", () => {
      expect(depthIncreaseCounter([1, 2])).toBe(1);
    });

    it("Should be 0 with two data points none increasing", () => {
      expect(depthIncreaseCounter([2, 1])).toBe(0);
    });

    it("should calculate the given example", () => {
      expect(
        depthIncreaseCounter([199, 200, 208, 210, 200, 207, 240, 269, 260, 263])
      ).toBe(7);
    });

    it("should get test data", () => {
      expect(depthIncreaseCounter(testData)).toBe(1681);
    });
  });

  describe("three window", () => {
    it("should work on one iteration", () => {
      expect(
        depthIncreaseCounter([1, 2, 3, 2], "measurementSlidingWindow", 3)
      ).toBe(1);
    });
    it("should work on 2 iterations", () => {
      expect(
        depthIncreaseCounter([1, 2, 3, 2, 4], "measurementSlidingWindow", 3)
      ).toBe(2);
    });

    it("should work on the test case", () => {
      const exampleData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
      expect(
        depthIncreaseCounter(exampleData, "measurementSlidingWindow", 3)
      ).toBe(5);
    });
    it("Should get me the fucking answer", () => {
      expect(
        depthIncreaseCounter(testData, "measurementSlidingWindow", 3)
      ).toBe(1704);
    });
  });
});
