package com.github.boardyb.gameoflife.pattern;

public class PatternCoordinates {

    private double column;
    private double row;

    public PatternCoordinates(double column, double row) {
        this.column = column;
        this.row = row;
    }

    public double getColumn() {
        return column;
    }

    public void setColumn(double column) {
        this.column = column;
    }

    public double getRow() {
        return row;
    }

    public void setRow(double row) {
        this.row = row;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("PatternCoordinate{");
        sb.append("column=").append(column);
        sb.append(", row=").append(row);
        sb.append('}');
        return sb.toString();
    }
}
