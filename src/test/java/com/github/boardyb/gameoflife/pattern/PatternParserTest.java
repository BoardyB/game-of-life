package com.github.boardyb.gameoflife.pattern;

import ie.corballis.fixtures.annotation.FixtureAnnotations;
import ie.corballis.fixtures.assertion.FixtureAssert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;

import java.io.IOException;
import java.io.InputStream;

@RunWith(MockitoJUnitRunner.class)
public class PatternParserTest {

    @Spy
    private PatternParser patternParser;

    private InputStream testPattern;

    @Before
    public void setUp() throws Exception {
        FixtureAnnotations.initFixtures(this);
    }

    @Test
    public void shouldParsePatternCorrectly() throws IOException {
        testPattern = this.getClass().getResourceAsStream("lifs/test.lif");
        Pattern pattern = patternParser.parsePattern("test.lif", testPattern);
        FixtureAssert.assertThat(pattern).matches("shouldParsePatternCorrectly-result");
    }


    @Test
    public void shouldPutCoordinatesToStartOfTheGridIfParametersWereNotGiven() throws IOException {
        testPattern = this.getClass().getResourceAsStream("lifs/lif-without-parameters.lif");
        Pattern pattern = patternParser.parsePattern("lif-without-parameters.lif", testPattern);
        FixtureAssert.assertThat(pattern).matches("shouldPutCoordinatesToStartOfTheGridIfParametersWereNotGiven-result");
    }
}