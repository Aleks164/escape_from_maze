export type CoordType = [number, number];
export type MapType = string[];
export type DirectionType = ">" | "<" | "^" | "v";

export type CrossesItemType = {
  [key: string]: {
    way: string[];
    from: null | string;
    coord: CoordType[];
  };
};

export type StepParamType = {
  startPosition: CoordType;
  startDirection: DirectionType;
  coordList: CoordType[];
  currentWay: string[];
  listOfCrosses: CoordType[];
  crossingsParamArray: CrossesItemType[];
  prev: string;
  isEscaped: boolean;
};

export type StartParamType = Omit<
  StepParamType,
  "startPosition" | "startDirection" | "isEscaped"
>;

export type NewMazeParamType = {
  newMaze: MapType;
  mazeMarkup: string;
};

type PostMessageParamsType = {
  mazeParams: {
    height: number;
    width: number;
  };
  key: string;
  type: string;
};

type GetMessageParamsType = {
  newMaze: MapType;
  mazeMarkup: string;
  crossingsParamArray: CrossesItemType[];
};

export type OnPostMessageParamsType = {
  data: PostMessageParamsType;
};

export type OnGetMessageParamsType = {
  data: GetMessageParamsType & PostMessageParamsType;
};
