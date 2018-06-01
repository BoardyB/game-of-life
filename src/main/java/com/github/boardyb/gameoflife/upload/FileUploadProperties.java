package com.github.boardyb.gameoflife.upload;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "gameoflife.upload")
public class FileUploadProperties {

    private String patternPath;

    public String getPatternPath() {
        return patternPath;
    }

    public void setPatternPath(String patternPath) {
        this.patternPath = patternPath;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("FileUploadProperties{");
        sb.append("patternPath='").append(patternPath).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
