import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

export class NgxLetContext<T> {
  constructor(private readonly dir: Pick<NgxLetDirective<T>, 'ngxLet'>) {}

  public get $implicit(): T {
    return this.dir.ngxLet;
  }

  public get ngxLet(): T {
    return this.dir.ngxLet;
  }
}

@Directive({
  selector: '[ngxLet]',
  standalone: true,
})
export class NgxLetDirective<T> implements OnInit {
  @Input() public ngxLet!: T;

  constructor(
    private readonly viewContainer: ViewContainerRef,
    private readonly templateRef: TemplateRef<NgxLetContext<T>>,
  ) {}

  public static ngTemplateContextGuard<K>(
    dir: NgxLetDirective<K>,
    ctx: unknown,
  ): ctx is NgxLetContext<K> {
    return true;
  }

  public ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.templateRef, new NgxLetContext<T>(this));
  }
}
