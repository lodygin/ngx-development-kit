import { CallPipe } from './call.pipe';

describe('CallPipe', () => {
  let pipe!: CallPipe;

  class ValueStore {
    constructor(private value: string) {}

    public getValue(): string {
      return this.value;
    }
  }

  beforeEach(() => {
    pipe = new CallPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform input value using provided function', () => {
    const double = (value: number): number => value * 2;
    const inputValue = 2;
    const outputValue = double(2);

    expect(pipe.transform(inputValue, double)).toBe(outputValue);
  });

  it('should transform input value using provided function with context parameter', () => {
    const value = 'foo';
    const foo = new ValueStore(value);

    expect(pipe.transform(value, foo.getValue, foo)).toBe(value);
  });

  it('should transform input value using provided function with bounded context', () => {
    const valueBar = 'bar';
    const valueFoo = 'foo';
    const bar = new ValueStore(valueBar);
    const foo = new ValueStore(valueFoo);

    expect(pipe.transform(valueBar, bar.getValue.bind(foo))).toBe(valueFoo);
  });
});
