// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.getCrosses": {
      type: "done.invoke.getCrosses";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.getZeros": {
      type: "done.invoke.getZeros";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.getCrosses": {
      type: "error.platform.getCrosses";
      data: unknown;
    };
    "error.platform.getZeros": {
      type: "error.platform.getZeros";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    add_cross: "ADD_CROSS";
    add_zero: "ADD_ZERO";
    clearAll: "AGAIN" | "GIVE_UP" | "RESET";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    isCrossesEmpty: "RESET";
    isThereCrossOrZeroAlready: "ADD_CROSS" | "ADD_ZERO";
    isZerosEmpty: "RESET";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "calculatin_zeros"
    | "calculating_crosses"
    | "idle"
    | "player1"
    | "player1_won"
    | "player2"
    | "player2_won";
  tags: never;
}
