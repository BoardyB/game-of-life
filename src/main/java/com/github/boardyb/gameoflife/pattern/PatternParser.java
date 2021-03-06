package com.github.boardyb.gameoflife.pattern;

import com.github.boardyb.gameoflife.upload.FileUploadProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

import static java.lang.Integer.parseInt;
import static java.util.Objects.isNull;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

@Component
public class PatternParser {

    private static final int columns = 70;
    private static final int rows = 35;

    @Autowired
    private FileUploadProperties fileUploadProperties;

    /**
     * Creates Pattern object from MultipartFile.
     * This method converts MultipartFile to File object and calls createPattern(File file)
     * @param multipartFile multipart file to parse.
     * @return Pattern object parsed from the file.
     * @throws Exception if an error occurs during file conversion or parsing.
     */
    public Pattern createPattern(MultipartFile multipartFile) throws Exception {
        File file = new File(fileUploadProperties.getPatternPath(), multipartFile.getOriginalFilename());
        writeByteArrayToFile(file, multipartFile.getBytes());
        return this.createPattern(file);
    }

    /**
     * Create Pattern object from given file.
     * Pattern title will be the file name, coordinates will be parsed from file content.
     * @param file to parse Pattern from
     * @return Pattern object parsed from the file.
     * @throws IOException if an error occurs during reading file.
     */
    public Pattern createPattern(File file) throws IOException {
        InputStream fileInputStream = new FileInputStream(file);
        return parsePattern(file.getName(), fileInputStream);
    }

    /**
     * Creates Pattern object from given InputStream.
     * Pattern coordinates will be parsed from center of the grid and #P parameter values.
     * In .lif files '*' represents an alive tile, whenever an alive tile is found a pattern coordinate will be
     * added to the Pattern object at the grid position.
     * @param fileName title of the pattern
     * @param fileInputStream InputStream to parse.
     * @return Pattern object parsed from the file.
     * @throws IOException if any error occurs during file reading.
     */
    protected Pattern parsePattern(String fileName, InputStream fileInputStream) throws IOException {
        String line;
        BufferedReader reader = new BufferedReader(new InputStreamReader(fileInputStream));
        Pattern patternMap = new Pattern();
        double currentCol = 0;
        double currentRow = 0;

        if (!patternMap.hasTitle()) {
            patternMap.setTitle(fileName);
        }

        while (!isNull((line = reader.readLine()))) {
            if (line.substring(0, 1).equals("#")) {
                if (line.substring(0, 2).equals("#P")) {
                    String[] params = line.substring(2).trim().split(" ");
                    currentCol = getCenterByColumns() + parseInt(params[0]);
                    currentRow = getCenterByRows() + parseInt(params[1]);
                }
            } else {
                String[] chars = line.split("");

                for (int c = 0; c < chars.length; c++) {
                    if (chars[c].equals("*")) {
                        boolean columnInBounds = currentCol + c >= 0 && currentCol + c < columns;
                        boolean rowInBounds = currentRow >= 0 && currentRow < rows;
                        if (columnInBounds && rowInBounds) {
                            patternMap.getCoordinates().add(new PatternCoordinates(currentCol + c, currentRow));
                        }
                    }
                }
                currentRow++;
            }

        }

        return patternMap;
    }

    private double getCenterByColumns() {
        return Math.floor(columns / 2);
    }

    private double getCenterByRows() {
        return Math.floor(rows / 2);
    }

    public void setFileUploadProperties(FileUploadProperties fileUploadProperties) {
        this.fileUploadProperties = fileUploadProperties;
    }
}
