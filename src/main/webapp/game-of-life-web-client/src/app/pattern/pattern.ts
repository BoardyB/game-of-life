export class Pattern {
  title: string;
  coordinates: PatternCoordinate[] = [];

  public static deserialize(obj: any): Pattern {
    const pattern = this.createEmptyPattern();
    pattern.title = obj.title;
    if (obj.coordinates !== undefined && obj.coordinates !== null && obj.coordinates instanceof Array) {
      obj.coordinates.forEach(coordinate => pattern.coordinates.push(PatternCoordinate.deserialize(coordinate)));
    }
    return pattern;
  }

  public static createEmptyPattern(): Pattern {
    return new Pattern(null, []);
  }

  constructor(title: string, coordinates: PatternCoordinate[]) {
    this.title = title;
    this.coordinates = coordinates;
  }
}

export class PatternCoordinate {
  column: number;
  row: number;

  public static deserialize(obj: any): PatternCoordinate {
    const patternCoordinate = this.createEmptyPatternCoordinate();
    patternCoordinate.column = obj.column;
    patternCoordinate.row = obj.row;
    return patternCoordinate;
  }

  public static createEmptyPatternCoordinate(): PatternCoordinate {
    return new PatternCoordinate(null, null);
  }

  constructor(column: number, row: number) {
    this.column = column;
    this.row = row;
  }
}
