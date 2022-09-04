import { SIZE } from "../../components/GameTable/gameTable";
import { Coordinates } from "./main.model";
export function isThereCrossOrZeroAlready(
  square: Coordinates,
  crosses: Coordinates[],
  zeros: Coordinates[]
) {
  return (
    isCrossThereAlready(square, crosses) || isZerosThereAlready(square, zeros)
  );
}

export function isCrossThereAlready(
  square: Coordinates,
  crosses: Coordinates[]
) {
  return crosses.some(
    (item) => item.col === square.col && item.row === square.row
  );
}
export function isZerosThereAlready(square: Coordinates, zeros: Coordinates[]) {
  return zeros.some(
    (item) => item.col === square.col && item.row === square.row
  );
}

export function check(items: Coordinates[]): Coordinates[] | null {
  return (
    isThereFiveItemsInRow(items) ||
    isThereFiveItemsInColumn(items) ||
    isThereFiveItemsInSideways(items)
  );
}

export function isThereFiveItemsInRow(items: Coordinates[]) {
  let tempRow = 0;
  let retVal: Coordinates[] = [];

  for (let row = 1; row < SIZE + 1; row++) {
    for (let col = 1; col < SIZE + 1; col++) {
      if (items.find((item) => item.row === row && item.col === col)) {
        tempRow += 1;
        retVal.push({ col, row });
        if (tempRow === 5) {
          return retVal;
        }
      } else {
        tempRow = 0;
        retVal = [];
      }
    }
  }

  return null;
}

export function isThereFiveItemsInColumn(items: Coordinates[]) {
  let tempCol = 0;
  let retVal: Coordinates[] = [];

  for (let col = 1; col < SIZE + 1; col++) {
    for (let row = 1; row < SIZE + 1; row++) {
      if (items.find((item) => item.row === row && item.col === col)) {
        tempCol += 1;
        retVal.push({ col, row });
        if (tempCol === 5) {
          return retVal;
        }
      } else {
        tempCol = 0;
        retVal = [];
      }
    }
  }
  return null;
}

export function isThereFiveItemsInSideways(items: Coordinates[]) {
  let temp = 0;
  let temp2 = 0;
  let retVal: Coordinates[] = [];

  for (const item of items) {
    const { col, row } = item;
    retVal.push({ col, row });
    for (let i = 1; i < 6; i++) {
      const isIn = items.find((s) => s.col === col + i && s.row === row + i);
      if (isIn) {
        temp += 1;
        retVal.push({ col: col + i, row: row + i });

        if (temp === 4) {
          return retVal;
        }
      } else {
        temp = 0;
        retVal = [];
      }
    }
    retVal.push({ col, row });

    for (let i = 1; i < 6; i++) {
      const isIn = items.find((s) => s.col === col - i && s.row === row + i);

      if (isIn) {
        temp2 += 1;
        retVal.push({ col: col - i, row: row + i });

        if (temp2 === 4) {
          return retVal;
        }
      } else {
        temp2 = 0;
        retVal = [];
      }
    }
  }

  return null;
}
