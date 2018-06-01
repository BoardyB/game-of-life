package com.github.boardyb.gameoflife.upload;

import com.github.boardyb.gameoflife.pattern.Pattern;
import com.github.boardyb.gameoflife.pattern.PatternManager;
import com.github.boardyb.gameoflife.response.ResponseMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

import java.util.Collection;

import static java.util.Objects.isNull;

@RestController
@RequestMapping("/api/pattern/upload")
public class FileUploadController {

    private final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Autowired
    private PatternManager patternManager;

    @PostMapping
    public ResponseMessage upload(@RequestPart(value = "file") @Valid MultipartFile multipartFile) throws Exception {
        if (isNull(multipartFile)) {
            return ResponseMessage.errorResponseFor("");
        }
        Pattern pattern = patternManager.storePattern(multipartFile);
        return ResponseMessage.successfulResponseFor(pattern);
    }

    @GetMapping("/patterns")
    public ResponseMessage getAllPatterns() {
        Collection<Pattern> patterns = patternManager.getAllPatterns();
        return ResponseMessage.successfulResponseFor(patterns);
    }

}
