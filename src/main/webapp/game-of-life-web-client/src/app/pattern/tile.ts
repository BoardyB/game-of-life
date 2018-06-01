export class Tile {
  alive: boolean;
  row: number;
  column: number;

  constructor(alive: boolean, row: number, column: number) {
    this.alive = alive;
    this.row = row;
    this.column = column;
  }
}
