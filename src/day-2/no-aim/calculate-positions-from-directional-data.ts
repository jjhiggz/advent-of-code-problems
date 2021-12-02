export type Direction = "forward" | "up" | "down";
export type DirectionInput = `${Direction} ${number}`;

export interface Position {
  depth: number;
  horizontalPosition: number;
}

export type DirectionDataPoint  = {
    up: number,
    down: number,
    forward: number
}


export const getDirectionDataPoint = (directionInput: DirectionInput ) => {
    const splitInput = directionInput.split(" ")
    const direction = splitInput[0]
    const value = +splitInput[1]
    return ({
        up: direction === "up"? value :  0,
        down: direction === "down" ? value :  0,
        forward: direction === "forward" ? value :  0,
    });
}



export const calculatePositionsFromDirectionalData = (
  testData: DirectionInput[]
) => testData.reduce<Position>(
    (acc, directionInput) => {
        const  { up, down, forward } = getDirectionDataPoint(directionInput)
        return ({
            depth: acc.depth - up + down ,
            horizontalPosition: acc.horizontalPosition + forward,
        });
    },
    ({
        depth: 0,
        horizontalPosition: 0,
    }) as Position
);
