import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngxCall',
  standalone: true,
})
export class NgxCallPipe implements PipeTransform {
  public transform<T, H>(value: T, handler: (input: T) => H): H;
  public transform<T, H, C>(value: T, handler: (input: T) => H, context: C): H;
  public transform<T, H, C>(value: T, handler: (input: T) => H, context: C | null = null): H {
    return handler.call(context, value);
  }
}
