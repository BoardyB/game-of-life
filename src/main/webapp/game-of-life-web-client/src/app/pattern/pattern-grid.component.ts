import {Component, Input, OnInit} from "@angular/core";
import {Pattern, PatternCoordinate} from "./pattern";
import {Tile} from "./tile";
import {isPresent} from "../core/util";

@Component({
  selector: 'gol-pattern-grid',
  templateUrl: './pattern-grid.component.html',
  styleUrls: ['./pattern-grid.component.scss']
})
export class PatternGridComponent implements OnInit {

  @Input() pattern: Pattern = Pattern.createEmptyPattern();
  tiles = new Map<number, Tile>();
  rows = Array(35).fill(1, 0, 35).map((x, i) => i);
  columns = Array(70).fill(1, 0, 70).map((x, i) => i);
  aliveTiles = new Set<Tile>();

  constructor() {
    this.initializeTiles();
  }

  ngOnInit(): void {
    this.resetTiles();
    this.markAliveTiles();
  }

  /**
   * Marks all tiles dead.
   */
  resetTiles(): void {
    this.tiles.forEach((value, key, map) => {
      value.alive = false;
    });
  }

  /**
   * Creates tiles map which consist of an index of the file as key and Tile object as value.
   */
  private initializeTiles() {
    for (let i = 0; i < 2450; i++) {
      const row = Math.floor(i / 70);
      const column = Math.floor(i - row * 70);
      this.tiles.set(i, new Tile(false, row, column));
    }
  }

  /**
   * Marks alive patterns cased off pattern object coordinates.
   */
  private markAliveTiles() {
    this.aliveTiles = new Set<Tile>();
    this.pattern.coordinates.forEach((coordinate: PatternCoordinate) => {
      let coordinateNumber = this.getTileIndexFromRowAndColumn(coordinate.row, coordinate.column);
      const tile = this.tiles.get(coordinateNumber);
      tile.alive = true;
      this.aliveTiles.add(tile);
    });
  }

  getTileIndexFromRowAndColumn(row: number, column: number): number {
    return row * 70 + column;
  }

  public markTile(tile: Tile): void {
    tile.alive = tile.alive !== true;
    this.aliveTiles.add(tile);
  }

  getTileIndex(tile: Tile): number {
    return this.getTileIndexFromRowAndColumn(tile.row, tile.column)
  }

  /**
   * Calculates next generation of the game.
   * The calculation start from the currently alive tiles.
   * It collects all neighbors of the tiles and checks if the tile has less neighbors than 2 or more neighbors than 3.
   * If any of the above occurs the tile will be dead next generation so it will be collected in the dead tiles.
   * The method iterates the above collected neighbors and collects the neighbor tiles which will be alive
   * next generation. This happens if a tile is dead and has exactly 3 alive neighbors.
   * Lastly the dead tiles will be marked dead, the alive tiles will be marked alive.
   */
  nextGeneration(): void {
    const tilesDeadNextGeneration = new Set<Tile>();
    const tilesBornNextGeneration = new Set<Tile>();
    this.aliveTiles.forEach((tile: Tile) => {
      const neighborsOfTile = this.collectNeighborsOfTile(tile);
      neighborsOfTile.forEach((neighbor: Tile) => {
        const neighborTiles = this.collectNeighborsOfTile(neighbor);
        const aliveNeighbors = neighborTiles.filter((tile: Tile) => tile.alive).length;
        if (!neighbor.alive && aliveNeighbors === 3) {
          tilesBornNextGeneration.add(neighbor);
        }
      });
      const aliveNeighborCount = neighborsOfTile.filter((tile: Tile) => tile.alive).length;
      if (aliveNeighborCount < 2 || aliveNeighborCount > 3) {
        tilesDeadNextGeneration.add(tile);
      }
    });
    tilesDeadNextGeneration.forEach((tile: Tile) => this.aliveTiles.delete(tile));
    tilesDeadNextGeneration.forEach((tile: Tile) => tile.alive = false);
    tilesBornNextGeneration.forEach((tile: Tile) => tile.alive = true);
    tilesBornNextGeneration.forEach((tile: Tile) => this.aliveTiles.add(tile));
  }

  /**
   * Collects all neighbors of a tile.
   * This method collects tiles exactly beside the current tile,then it collects the tiles exactly above and below the
   * given tile and collects their neighbors too.
   * @param {Tile} tile to load neighbors of.
   * @returns {Tile[]} neighbors of given tile.
   */
  collectNeighborsOfTile(tile: Tile): Tile[] {
    let neighbors: Tile[] = [];
    const indexOfTile = this.getTileIndex(tile);
    neighbors = neighbors.concat(this.getSideNeighborsOf(indexOfTile));

    const indexOfTileInPreviousRow = this.getTileIndexFromRowAndColumn(tile.row - 1, tile.column);
    neighbors = neighbors.concat(this.getSideNeighborsOf(indexOfTileInPreviousRow));
    const upperNeighbor = this.tiles.get(indexOfTileInPreviousRow);
    if (isPresent(upperNeighbor)) {
      neighbors.push(upperNeighbor)
    }

    const indexOfTileInNextRow = this.getTileIndexFromRowAndColumn(tile.row + 1, tile.column);
    neighbors = neighbors.concat(this.getSideNeighborsOf(indexOfTileInNextRow));
    const lowerNeighbor = this.tiles.get(indexOfTileInNextRow);
    if (isPresent(lowerNeighbor)) {
      neighbors.push(lowerNeighbor)
    }

    return neighbors;
  }

  /**
   * This method loads the tiles exactly beside the indexed tile.
   * @param {number} indexOfTile index of tile which neighbor needs to be loaded
   * @returns {Tile[]} neighbors of indexed tile.
   */
  private getSideNeighborsOf(indexOfTile: number): Tile[] {
    const sideNeighbors: Tile[] = [];
    const tileLeftOfTheTile = this.tiles.get(indexOfTile - 1);
    if (isPresent(tileLeftOfTheTile)) {
      sideNeighbors.push(tileLeftOfTheTile);
    }
    const tileRightOfTheTile = this.tiles.get(indexOfTile + 1);
    if (isPresent(tileRightOfTheTile)) {
      sideNeighbors.push(tileRightOfTheTile);
    }
    return sideNeighbors;
  }
}
