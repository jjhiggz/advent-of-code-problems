export type Direction = "forward" | "up" | "down";
export type DirectionInput = `${Direction} ${number}`;

export interface Position {
  depth: number;
  horizontalPosition: number;
  aim: number;
}

export type DirectionDataPoint = {
  up: number;
  down: number;
  forward: number;
};

export const getDirectionDataPoint = (directionInput: DirectionInput) => {
  const splitInput = directionInput.split(" ");
  const direction = splitInput[0];
  const value = +splitInput[1];
  return {
    up: direction === "up" ? value : 0,
    down: direction === "down" ? value : 0,
    forward: direction === "forward" ? value : 0,
  };
};

export const calculateAim = (
  currentPosition: Position,
  directions: DirectionDataPoint
): number => {
  const { up, down } = directions;
  const { aim } = currentPosition;
  return aim - up + down;
};

export const calculateDepth = (
  currentPosition: Position,
  directions: DirectionDataPoint
): number => {
  const { aim, depth } = currentPosition;
  const { forward } = directions;
  return depth + aim * forward;
};

export const calculateNextPosition = (
  currentPosition: Position,
  directionDataPoint: DirectionDataPoint
): Position => ({
  aim: calculateAim(currentPosition, directionDataPoint),
  depth: calculateDepth(currentPosition, directionDataPoint),
  horizontalPosition:
    currentPosition.horizontalPosition + directionDataPoint.forward,
});


export const calculatePositionFromDirectionalData = (
  testData: DirectionInput[]
) =>
  testData.reduce<Position>(
    (currentPosition, directionInput) =>
      calculateNextPosition(
        currentPosition,
        getDirectionDataPoint(directionInput)
      ),
    {
      depth: 0,
      horizontalPosition: 0,
      aim: 0,
    } as Position
  );

