const isPositive = (num: number) => num > 0;
const isNegative = (num: number) => num < 0;
const isZero = (num: number) => num === 0;

const regularMode = (depthData: number[]) => {
  let count = 0;
  for (let i = 1; i < depthData.length; i++) {
    const isIncreasing = isPositive(depthData[i] - depthData[i - 1]);
    if (isIncreasing) {
      count++;
    }
  }
  return count;
};

const measurementSlidingWindow = (depthData: number[], windowLength: number): number => {
  let count = 0;
  let prevDepth: null | number = null;

  for (let i = windowLength; i < depthData.length; i++) {
    if (!prevDepth) {
      prevDepth = [0, 1, 2].reduce((acc, index) => {
        return acc + depthData[index];
      }, 0);
    }

    const currentDepth = depthData[i] + depthData[i - 1] + depthData[i - 2];

    const isIncreasing = isPositive(currentDepth - prevDepth);
    prevDepth = currentDepth;

    if (isIncreasing) {
      count++;
    }
  }
  return count;
};

export const depthIncreaseCounter = (
  depthData: number[],
  mode?: "measurementSlidingWindow",
  slidingWindowlength?: number
): number => {
  if (!mode) {
    return regularMode(depthData);
  }

  if (mode === "measurementSlidingWindow") {
    if (!slidingWindowlength) {
      throw new Error(
        "Must provide sliding window length if you are in measurementslidingwindow mode"
      );
    }
    return measurementSlidingWindow(depthData, slidingWindowlength)
  } 

  throw new Error("fuckkkkkkkk")
};
