import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {TRANSLATE_MODULE_CONFIG} from "./translate.config";
import {MaterialModule} from "./material/material.module";
import {BootstrapModule} from "./bootstrap/bootstrap.module";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BootstrapModule,
    HttpClientModule,
    FileUploadModule,
    TranslateModule.forRoot(TRANSLATE_MODULE_CONFIG)
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BootstrapModule,
    TranslateModule,
    FileUploadModule,
    FileUploadComponent
  ],
  providers: []
})
export class CoreModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
