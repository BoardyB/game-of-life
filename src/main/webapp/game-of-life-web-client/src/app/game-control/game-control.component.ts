import {Component, OnInit, ViewChild} from '@angular/core';
import {Pattern} from "../pattern/pattern";
import {PatternGridComponent} from "../pattern/pattern-grid.component";
import {FileUploadComponent} from "../core/file-upload/file-upload.component";
import {PatternLoader} from "../pattern/pattern-grid-loader";

@Component({
  selector: 'gol-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent implements OnInit {

  @ViewChild(PatternGridComponent) patternGrid: PatternGridComponent;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;
  pattern: Pattern = Pattern.createEmptyPattern();
  patterns: Pattern[] = [];
  playInterval: any;
  generationCounter: number = 0;
  private patternLoader: PatternLoader;

  constructor(patternGridLoader: PatternLoader) {
    this.patternLoader = patternGridLoader;
  }

  ngOnInit(): void {
    this.initializePatterns();
  }

  private initializePatterns() {
    this.patterns = [];
    this.patternLoader.getAllPatterns().subscribe(data => {
      data.responseBody.forEach(pattern => {
        this.patterns.push(Pattern.deserialize(pattern));
      });
    });
  }

  patternUploaded(uploadedPattern: Pattern) {
    this.loadPattern(uploadedPattern);
    this.ngOnInit();
  }

  loadPattern(loadedPattern: Pattern) {
    this.patternGrid.pattern = loadedPattern;
    this.patternGrid.ngOnInit();
  }

  reset() {
    this.patternGrid.pattern = Pattern.createEmptyPattern();
    this.patternGrid.ngOnInit();
    this.fileUpload.remove();
    this.generationCounter = 0;
    this.ngOnInit();
  }

  nextGeneration() {
    this.patternGrid.nextGeneration();
    this.generationCounter++;
  }

  play() {
    this.playInterval = setInterval(() => this.nextGeneration(), 150);
  }

  stop() {
    clearInterval(this.playInterval);
  }
}


