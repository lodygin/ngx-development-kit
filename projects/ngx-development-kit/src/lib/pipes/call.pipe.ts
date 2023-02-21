import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'call',
  standalone: true,
})
export class CallPipe implements PipeTransform {
  public transform<T, H, C>(value: T, handler: (input: T) => H, context: C | null = null): H {
    return handler.call(context, value);
  }
}
