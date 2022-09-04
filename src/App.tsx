import { useMachine } from "@xstate/react";
import "./App.css";
import GameTable from "./components/GameTable/gameTable";
import { mainMachine } from "./machines/mainMachine/main.machine";

function App() {
  const [state, send] = useMachine(mainMachine, {});

  const handleOnClick = (col: number, row: number) => {
    if (state.matches("idle")) {
      send("START");
    }

    if (state.can({ type: "ADD_CROSS", cross: { col, row } })) {
      send("ADD_CROSS", { cross: { col, row } });
    } else {
      send({ type: "ADD_ZERO", zero: { col, row } });
    }
  };
  console.log("➡️ state: ", state.context.winLine, " ", state.value);

  return (
    <div className="App container">
      <h1>Tic Tac Toe</h1>
      <GameTable
        winLines={
          state.context.winLine.length > 0 ? state.context.winLine : null
        }
        whoseTurn={
          state.value === "player2"
            ? "zero"
            : state.value === "player1"
            ? "cross"
            : undefined
        }
        click={handleOnClick}
        crosses={state.context.crosses}
        zeros={state.context.zeros}
      />
      <div
        style={{
          visibility:
            state.value === "player1_won" || state.value === "player2_won"
              ? "visible"
              : "hidden",
        }}
      >
        <h3>
          {state.value === "player1_won" ? "The crosses won!" : " Zeros won!"}
        </h3>
      </div>
      <div className="button-wrapper">
        {state.can("START") && (
          <button onClick={() => send("START")}>Start</button>
        )}
        {state.can("RESET") && (
          <button onClick={() => send("RESET")}>reset</button>
        )}
        {state.can("GIVE_UP") && (
          <button onClick={() => send("GIVE_UP")}>give up</button>
        )}
        {state.can("AGAIN") && (
          <button onClick={() => send("AGAIN")}>again?</button>
        )}
      </div>
    </div>
  );
}

export default App;
