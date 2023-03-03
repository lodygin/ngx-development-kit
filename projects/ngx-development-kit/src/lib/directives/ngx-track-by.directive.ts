import { Directive, Host, Input, NgIterable } from '@angular/core';
import { NgForOf } from '@angular/common';

@Directive({
  selector: '[ngFor][ngForOf][ngForNgxTrackBy]',
  standalone: true,
})
export class NgxTrackByDirective<T> {
  @Input() public ngForOf!: NgIterable<T>;
  @Input('ngForNgxTrackBy') public property!: keyof T;

  constructor(@Host() private ngFor: NgForOf<T>) {
    this.ngFor.ngForTrackBy = (index: number, item: T): T[keyof T] => item[this.property];
  }
}
