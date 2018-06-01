import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PatternGridComponent} from "./pattern-grid.component";
import {Tile} from "./tile";
import {Pattern, PatternCoordinate} from "./pattern";

describe('PatternGridComponent', () => {
  let component: PatternGridComponent;
  let fixture: ComponentFixture<PatternGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatternGridComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternGridComponent);
    component = fixture.componentInstance;
  });

  it('should create pattern grid with dead tiles', () => {
    fixture.detectChanges();
    fixture.componentInstance.tiles.forEach((tile: Tile) => {
      expect(tile.alive).toBeFalsy();
    });
  });

  it('should create pattern grid with initialized tiles', () => {
    fixture.componentInstance.pattern = new Pattern("pattern.lif", [new PatternCoordinate(0, 0), new PatternCoordinate(1, 0)]);
    fixture.detectChanges();
    expect(fixture.componentInstance.tiles.get(0).alive).toBeTruthy();
    expect(fixture.componentInstance.tiles.get(1).alive).toBeTruthy();
  });

  it('should load next generation correctly', () => {
    fixture.componentInstance.pattern = new Pattern("pattern.lif", [
      new PatternCoordinate(2, 1),
      new PatternCoordinate(3, 1),
      new PatternCoordinate(4, 1)
    ]);
    fixture.detectChanges();
    expect(fixture.componentInstance.tiles.get(72).alive).toBeTruthy();
    expect(fixture.componentInstance.tiles.get(73).alive).toBeTruthy();
    expect(fixture.componentInstance.tiles.get(74).alive).toBeTruthy();
    fixture.componentInstance.nextGeneration();
    fixture.detectChanges();
    expect(fixture.componentInstance.tiles.get(72).alive).toBeFalsy();
    expect(fixture.componentInstance.tiles.get(73).alive).toBeTruthy();
    expect(fixture.componentInstance.tiles.get(74).alive).toBeFalsy();
    expect(fixture.componentInstance.tiles.get(3).alive).toBeTruthy();
    expect(fixture.componentInstance.tiles.get(143).alive).toBeTruthy();

  });

});
