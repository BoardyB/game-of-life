import {NgModule} from "@angular/core";
import {PatternGridComponent} from "./pattern-grid.component";
import {CoreModule} from "../core/core.module";
import {PatternLoader} from "./pattern-grid-loader";

@NgModule({
  declarations: [
    PatternGridComponent
  ],
  imports: [
    CoreModule
  ],
  exports: [
    PatternGridComponent
  ],
  providers: [
    PatternLoader
  ]
})
export class PatternModule {

}
