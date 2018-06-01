package com.github.boardyb.gameoflife.pattern;

import com.github.boardyb.gameoflife.upload.FileUploadProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Maps.newHashMap;
import static java.util.stream.Collectors.toList;

@Component
public class PatternManager {

    private Logger logger = LoggerFactory.getLogger(PatternManager.class);

    private Map<String, Pattern> storedPatterns = newHashMap();

    @Autowired
    private PatternParser patternParser;

    @Autowired
    private FileUploadProperties fileUploadProperties;

    /**
     * This method initializes the stored patterns from .lif files from the file system.
     * It does not initialize patterns is FileUploadProperties patternPath is not configured in application.properties.
     */
    @PostConstruct
    private void initializeDefaultPatterns() {
        if (!isNullOrEmpty(fileUploadProperties.getPatternPath())) {
            loadDefaultPatterns();
        }
    }

    /**
     * This method is responsible for creating Pattern objects and storing it.
     * It handles errors if path given in properties is not valid.
     */
    private void loadDefaultPatterns() {
        try {
            List<File> collectedFiles = loadLifFiles();
            for (File file : collectedFiles) {
                Pattern pattern = patternParser.createPattern(file);
                storedPatterns.put(file.getName(), pattern);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error while loading default .lif files from " + fileUploadProperties.getPatternPath(), e);
        }
    }

    /**
     * This method is responsible for loading .lif files from file system.
     * Only files with .lif extension will be loaded from the folder.
     * @return List of .lif files.
     * @throws Exception if an error occurs during reading of files.
     */
    private List<File> loadLifFiles() throws Exception {
        Stream<Path> patternFolderStream = Files.walk(Paths.get(fileUploadProperties.getPatternPath()));
        return patternFolderStream
                .filter((Path path) -> path.toString().toLowerCase().endsWith(".lif"))
                .map(Path::toFile)
                .collect(toList());
    }

    /**
     * This method is responsible for storing patterns parsed from multipart files.
     * @param multipartFile to parse Pattern object from.
     * @return Pattern object parsed from multipart file.
     * @throws Exception if an error occurs during parsing of the multipart file.
     */
    public Pattern storePattern(MultipartFile multipartFile) throws Exception {
        Pattern pattern = patternParser.createPattern(multipartFile);
        storedPatterns.put(multipartFile.getOriginalFilename(), pattern);
        logger.debug("Pattern object [{}] has been stored successfully.", pattern);
        return pattern;
    }

    /**
     * This method returns all the previously stored patterns.
     * @return collection of Pattern objects.
     */
    public Collection<Pattern> getAllPatterns() {
        Collection<Pattern> values = this.storedPatterns.values();
        logger.debug("Patterns have been loaded [{}]", values);
        return values;
    }

    public void setPatternParser(PatternParser patternParser) {
        this.patternParser = patternParser;
    }

    public void setFileUploadProperties(FileUploadProperties fileUploadProperties) {
        this.fileUploadProperties = fileUploadProperties;
    }
}
