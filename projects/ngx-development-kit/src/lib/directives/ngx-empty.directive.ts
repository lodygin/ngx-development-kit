import {
  Directive,
  EmbeddedViewRef,
  Input,
  NgIterable,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngFor][ngForOf][ngForNgxEmpty]',
  standalone: true,
})
export class NgxEmptyDirective<T, B> implements OnChanges {
  @Input() public ngForOf!: NgIterable<T>;
  @Input('ngForNgxEmpty') public ngForEmpty!: TemplateRef<B>;

  private embeddedViewRef: EmbeddedViewRef<unknown> | null = null;

  constructor(private readonly viewContainerRef: ViewContainerRef) {}

  public ngOnChanges(): void {
    this.embeddedViewRef?.destroy();

    if (!Array.from(this.ngForOf).length) {
      this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.ngForEmpty);
    }
  }
}
