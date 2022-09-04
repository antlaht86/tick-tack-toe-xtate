import { useState } from "react";
import { Coordinates } from "../../machines/mainMachine/main.model";
import "./gameTable.css";

export const SIZE = 15;
type Props = {
  click: (col: number, row: number) => void;
  crosses: Coordinates[];
  whoseTurn: "cross" | "zero" | undefined;
  winLines: null | Coordinates[];
  zeros: Coordinates[];
};

export default function GameTable({
  click,
  crosses,
  whoseTurn,
  winLines,
  zeros,
}: Props) {
  const [hoverTarge, setHoverTarget] = useState<Coordinates | undefined>(
    undefined
  );
  const handleClick = (col: number, row: number) => {
    click(col, row);
  };

  const getMark = (col: number, row: number) => {
    const className = winLines
      ? [
          "selected",
          winLines.find((item) => item.col === col && item.row === row)
            ? "win-slot"
            : "",
        ]
      : ["selected"];

    if (
      crosses.find(
        (coordination) => coordination.col === col && coordination.row === row
      )
    ) {
      return <div className={className.join(" ")}>X</div>;
    } else if (
      zeros.find(
        (coordination) => coordination.col === col && coordination.row === row
      )
    ) {
      return <div className={className.join(" ")}>0</div>;
    }

    if (hoverTarge?.col === col && hoverTarge.row === row && whoseTurn) {
      if (whoseTurn === "cross") {
        return <div className="selected">X</div>;
      } else {
        return <div className="selected">0</div>;
      }
    }
  };

  const rowClassName = whoseTurn ? ["row", "pointer"] : ["row"];

  return (
    <div>
      <div>
        <h5 style={{ visibility: whoseTurn ? "visible" : "hidden" }}>
          {whoseTurn === "cross"
            ? "Now it's the cross's turn"
            : "Now it's zero's turn"}
        </h5>
      </div>
      <div className="root">
        {Array.from(Array(SIZE).keys()).map((col) => {
          return (
            <div key={col + "_row"} className={"col"}>
              {Array.from(Array(SIZE).keys()).map((row) => {
                return (
                  <div
                    onClick={() => handleClick(col + 1, row + 1)}
                    className={rowClassName.join(" ")}
                    key={row + "row"}
                    onMouseEnter={() =>
                      setHoverTarget({ col: col + 1, row: row + 1 })
                    }
                    onMouseLeave={() => setHoverTarget(undefined)}
                  >
                    {getMark(col + 1, row + 1)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
