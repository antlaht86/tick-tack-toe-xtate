import { assign } from "xstate";
import { Coordinates, mainModel } from "./main.model";
import { check, isThereCrossOrZeroAlready } from "./utils";

export const mainMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgWVQYwDp0IAbMAYgGUAVAQQCVrFQAHAe1nQBd03NmQAD0QBaACwBWAEwEAHAAYAjAHZlAZgCc8iQDYFOiQBoQAT1GLFYglPU6psnTrWzF8sWoC+H42iy5CLCSoJmAATorktAAiUQD6AML0APKUlALsnDx8AsIIIiqyBHay7hLKimUWxmYIikXKEmLyalIaYjqKsrLKYmJePhg4+ASBwWER9ACilJNMSCAZ3Lz887kishoEGuqKehoaLar21eayagTyNtISu00arX3eIL5DAUEh4eQA4gCSAGqTWIAVQACukOEtsqtRO5NlJrlomspmmo1CcEE4LmJWoo1CpsRonBp+s9Bv4Ru8wlJIjFYgAtSbJcGZZY5UQ3eQEMRnBqWKTuKSXdGtCQXCSNDQSeSE5QGEkvcmjD7UqYzOasCFZFagNZ4nQENRShqSnT7eyydGyUVdcpie7SsTI6TysnDJVU77-QGg5mQ7VCRAyeyaZT8xTbHnyBzChrWKVSQ2yy7yJwSF1+N2U8KxADufEiX1oPwAcr6tWyEO0ZK4KqHBYopK02uiRFK5Ps1MntMi8bJ068CHhUCQ8ABXII8TBQWJ4UIcWBwcjxJLF6gloGTMus6F5fEG5Qlez2CzqNGmQOSsUSqUygzyZT98lDkfj1CT6ez+eLqIrzfzRbljunQyEceLSjY5Q3EY561PUjTNA8HQ2lGj7DM+Y4TlgsQAF5hBwS4rmuxYbluUI6uy5RcnaGx4moki7FILYVNYlwSBoFgSA40g6JcqGEOhr6TjheGwOQP7Fn+GosmRAZ5ISVjwrIR52AcdoaOimJuA8eLSDY0pyk8CqZmMoRSLm+a0IWJakf6ayuNsBCylIewODoDQuC2lG9CmNxSBY3INlIXhPJgbAQHAAhGYQxBkDZFatvInIHpIBgtGIuzQTU+SxmobklOlDhuNijwDBmbwmYocU7iIgpWMihJuOKBzOIxMHrDIOhVqenbaDRfEUiZUhVeReQtJy2xlB03JWuGrU1Ki5yuPedpKLKLh9oZrrlR8ijmf6AHbiNeKbBoGysSmhraGeNSCkGZycT1nEHJK-UCZhU4znOsALvA-6aodslaFyUbOKmzT6HNiCdHUoYHt27S6OGr3Dhhb5YbhX3DbJIimsoFwlMibn8lcmVQ44RTaHali4nRXSeJtZUDcqe1Y2sdNyA4qKnfYTQNsKbEELidgdAYNiOHxrPmA2MPCxsrnuYoLbwqKlwNAmPHSC1OjBR4QA */
  mainModel.createMachine(
    {
      tsTypes: {} as import("./main.machine.typegen").Typegen0,
      id: "mainMac",
      initial: "idle", // TODO: idle
      states: {
        idle: {
          on: {
            START: {
              target: "player1",
            },
          },
        },
        player1: {
          on: {
            ADD_CROSS: {
              target: "calculating_crosses",
              actions: ["add_cross"],
              cond: "isThereCrossOrZeroAlready",
            },
            RESET: {
              cond: "isCrossesEmpty",
              target: "idle",
              actions: ["clearAll"],
            },
            GIVE_UP: {
              target: "player2_won",
              actions: ["clearAll"],
            },
          },
        },
        player2: {
          on: {
            ADD_ZERO: {
              target: "calculatin_zeros",
              actions: ["add_zero"],
              cond: "isThereCrossOrZeroAlready",
            },
            RESET: {
              cond: "isZerosEmpty",
              target: "idle",
              actions: ["clearAll"],
            },
            GIVE_UP: {
              target: "player1_won",
              actions: ["clearAll"],
            },
          },
        },
        player1_won: {
          on: {
            AGAIN: {
              target: "player1",
              actions: ["clearAll"],
            },
          },
        },
        calculating_crosses: {
          invoke: {
            id: "getCrosses",
            src: (context, event) =>
              new Promise((resolve, reject) => {
                const result = check(context.crosses);

                if (result) {
                  resolve(result);
                } else {
                  reject([]);
                }
              }),
            onDone: {
              target: "player1_won",
              actions: assign({ winLine: (context, event) => event.data }),
            },
            onError: {
              target: "player2",
              actions: assign({ winLine: (context, event) => event.data }),
            },
          },
        },
        calculatin_zeros: {
          invoke: {
            id: "getZeros",
            src: (context, event) =>
              new Promise<Coordinates[] | null>((resolve, reject) => {
                const result = check(context.zeros);
                if (result) {
                  resolve(result);
                } else {
                  reject([]);
                }
              }),
            onDone: {
              target: "player2_won",
              actions: assign({ winLine: (context, event) => event.data }),
            },
            onError: {
              target: "player1",
              actions: assign({ winLine: (context, event) => event.data }),
            },
          },
        },
        player2_won: {
          on: {
            AGAIN: {
              actions: ["clearAll"],
              target: "player1",
            },
          },
        },
      },
    },
    {
      actions: {
        add_cross: assign({
          crosses: (context, event) => context.crosses.concat([event.cross]),
        }),
        add_zero: assign({
          zeros: (context, event) => context.zeros.concat([event.zero]),
        }),
        clearAll: assign((context, event) => ({
          zeros: [],
          crosses: [],
          winLine: [],
        })),
      },
      guards: {
        isCrossesEmpty: (context, event) => context.crosses.length === 0,
        isZerosEmpty: (context, event) => context.zeros.length === 0,
        isThereCrossOrZeroAlready: (context, event) => {
          if (event && "cross" in event && event.cross) {
            event;
            return !isThereCrossOrZeroAlready(
              event.cross,
              context.crosses,
              context.zeros
            );
          } else if (event && "zero" in event && event.zero) {
            return !isThereCrossOrZeroAlready(
              event.zero,
              context.crosses,
              context.zeros
            );
          } else {
            throw new Error("Something went wrong");
          }
        },
      },
    }
  );
