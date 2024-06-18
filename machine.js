import { createMachine } from "xstate";
export const machine = createMachine(
  {
    context: {
      level: 1,
      lives: 3,
      score: 0,
    },
    id: "game",
    initial: "Initializing",
    states: {
      Initializing: {
        description:
          "The game is initializing, setting up initial parameters and resources.",
        on: {
          start: [
            {
              target: "Playing",
              actions: [],
            },
          ],
        },
      },
      Playing: {
        description:
          "The game is currently being played. Player input is accepted and the game state updates accordingly.",
        entry: [
          {
            type: "initMap",
          },
          {
            type: "initScore",
          },
          {
            type: "initLevel",
          },
        ],
        initial: "New state 1",
        states: {
          "New state 1": {},
          "New state 2": {},
        },
        on: {
          pause: [
            {
              target: "Paused",
              actions: [],
            },
          ],
          end: [
            {
              target: "Game Over",
              actions: [],
            },
          ],
        },
      },
      Paused: {
        description:
          "The game is paused. No player input is accepted and the game state is static.",
        on: {
          resume: [
            {
              target: "Playing",
              actions: [],
            },
          ],
          end: [
            {
              target: "Game Over",
              actions: [],
            },
          ],
        },
      },
      "Game Over": {
        description:
          "The game has ended. This could be due to losing all lives, completing all levels, or a player choice to end the game.",
        on: {
          restart: [
            {
              target: "Initializing",
              actions: [],
            },
          ],
        },
      },
      "New state 1": {},
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      initScore: (context, event) => {},
      initLevel: (context, event) => {},
      initMap: (context, event) => {},
    },
    services: {},
    guards: {},
    delays: {},
  },
);
