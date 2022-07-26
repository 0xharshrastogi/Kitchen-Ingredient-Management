export class Multiplier {
  private currentValue: number;

  constructor(private initial = 1, private minValue = 1, private maxValue = 100) {
    this.currentValue = initial;
  }

  get value(): number {
    return this.currentValue;
  }

  private set value(newValue: number) {
    if (newValue >= this.minValue && newValue <= this.maxValue) {
      this.currentValue = newValue;
    }
  }

  increase() {
    this.value++;
  }

  decrease() {
    this.value--;
  }

  setValue(value: number) {
    this.value = value;
  }

  reset() {
    this.value = this.initial;
    console.log('ResetCalled', this);
  }
}
