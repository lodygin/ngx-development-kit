import { NgModule } from '@angular/core';
import { NgxEmptyDirective, NgxTrackByDirective } from '../directives';

@NgModule({
  imports: [NgxEmptyDirective, NgxTrackByDirective],
  exports: [NgxEmptyDirective, NgxTrackByDirective],
})
export class NgxForModule {}
