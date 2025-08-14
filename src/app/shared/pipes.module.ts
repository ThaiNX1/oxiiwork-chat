import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShortNamePipe} from "./pipes/short-name.pipe";
import {AuthMediaS3Pipe} from "./pipes/auth-media-s3.pipe";
import {HighlightSearch} from "./pipes/highlight.pipe";
import {SafeHtmlPipe} from "./pipes/safe-html.pipe";
import {UnescapeRnPipe} from "./pipes/transform-message.pipe";

@NgModule({
  declarations: [
    ShortNamePipe,
    AuthMediaS3Pipe,
    HighlightSearch,
    SafeHtmlPipe,
    UnescapeRnPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShortNamePipe,
    AuthMediaS3Pipe,
    HighlightSearch,
    SafeHtmlPipe,
    UnescapeRnPipe
  ]
})
export class PipesModule {
}
