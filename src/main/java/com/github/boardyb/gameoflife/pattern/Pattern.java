package com.github.boardyb.gameoflife.pattern;

import java.util.List;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Lists.newArrayList;

public class Pattern {

    private String title;
    private List<PatternCoordinates> coordinates = newArrayList();

    public Pattern() {
    }

    public Pattern(String title, List<PatternCoordinates> coordinates) {
        this.title = title;
        this.coordinates = coordinates;
    }

    public boolean hasTitle() {
        return !isNullOrEmpty(title);
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<PatternCoordinates> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<PatternCoordinates> coordinates) {
        this.coordinates = coordinates;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Pattern{");
        sb.append("title='").append(title).append('\'');
        sb.append(", coordinates=").append(coordinates);
        sb.append('}');
        return sb.toString();
    }
}
