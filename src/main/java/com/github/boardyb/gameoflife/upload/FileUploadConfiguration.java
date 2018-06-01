package com.github.boardyb.gameoflife.upload;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileUploadConfiguration {

    @Bean
    public FileUploadProperties fileUploadProperties() {
        return new FileUploadProperties();
    }

}
