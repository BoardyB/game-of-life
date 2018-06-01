import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {GameControlComponent} from "./game-control.component";
import {PatternModule} from "../pattern/pattern.module";

@NgModule({
  declarations: [
    GameControlComponent
  ],
  imports: [
    CoreModule,
    PatternModule
  ],
  exports: [
    GameControlComponent
  ],
  providers: []
})
export class GameModule {

}
