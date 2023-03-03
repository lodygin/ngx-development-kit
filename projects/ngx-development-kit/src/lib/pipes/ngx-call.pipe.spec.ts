import { NgxCallPipe } from './ngx-call.pipe';

describe('NgxCallPipe', () => {
  let pipe!: NgxCallPipe;

  beforeEach(() => {
    pipe = new NgxCallPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform input value using provided function', () => {
    const double = (value: number): number => value * 2;

    expect(pipe.transform(2, double)).toBe(4);
  });

  it('should transform input value using provided function with context parameter', () => {
    class ValueStore {
      constructor(private value: string) {}

      public getValue(): string {
        return this.value;
      }
    }

    const value = 'foo';
    const foo = new ValueStore(value);

    expect(pipe.transform(value, foo.getValue, foo)).toBe(value);
  });
});
