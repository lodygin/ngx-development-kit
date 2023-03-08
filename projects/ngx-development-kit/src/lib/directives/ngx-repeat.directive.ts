import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngxRepeat]',
  standalone: true,
})
export class NgxRepeatDirective {
  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<unknown>,
  ) {}

  @Input('ngxRepeat')
  public set repeatTimes(value: number) {
    this.viewContainerRef.clear();

    for (let i = 0; i < value; i++) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
