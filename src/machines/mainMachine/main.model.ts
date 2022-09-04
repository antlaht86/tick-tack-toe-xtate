import { createModel } from "xstate/lib/model";

export type Coordinates = { col: number; row: number };
export const mainModel = createModel(
  {
    crosses: [] as Coordinates[],
    zeros: [] as Coordinates[],
    winLine: [] as Coordinates[],
  },
  {
    events: {
      START: () => ({}), // no payload
      ADD_CROSS: (cross: Coordinates) => ({ cross }), // no payload
      ADD_ZERO: (zero: Coordinates) => ({ zero }), // no payload
      RESET: () => ({}), // no payload
      GIVE_UP: () => ({}), // no payload
      AGAIN: () => ({}), // no payload
      CONTINUE: () => ({}), // no payload
      DONE: () => ({}), // no payload
    },
  }
);
