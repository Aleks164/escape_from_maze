export type CoordType = [number, number];
export type MapType = string[];

export type CrossesItemType = {
  [key: string]: {
    way: string[];
    from: null | string;
    coord: CoordType[];
  };
};

// export type NewMazeParamType = {
//     startPosition: CoordType;
//     startDirection: string;
//     coordList: CoordType[];
//     currentWay: string[];
//     listOfCrosses: CoordType[];
//     crossingsParamArray: CrossesItemType[];
//     prev: string;
//     isEscaped: boolean;
// };

export type NewMazeParamType = {
  newMaze: MapType;
  mazeMarkup: string;
};
