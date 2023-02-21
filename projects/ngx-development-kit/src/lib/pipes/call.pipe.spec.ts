import { CallPipe } from './call.pipe';

describe('CallPipe', () => {
  let pipe!: CallPipe;

  beforeEach(() => {
    pipe = new CallPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a value via provided function', () => {
    const double = (value: number): number => value * 2;
    const inputValue = 2;
    const outputValue = double(2);

    expect(pipe.transform(inputValue, double)).toBe(outputValue);
  });

  it('should transform a value via provided function and context', () => {
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
