/**
 * References
 * https://blog.fullstacktraining.com/adapter-pattern-in-typescript/
 * https://github.com/kamranahmedse/design-patterns-for-humans#-adapter
 * https://www.carloscaballero.io/design-patterns-adapter/
 *  */

interface IPaymentProvider {
  getDisplayTotal: () => string;
}

class PaymentProvider implements IPaymentProvider {
  private paymentTotal: number;

  constructor(cartTotal: number) {
    this.paymentTotal = cartTotal;
  }

  getTotal(): number {
    return this.paymentTotal + this.paymentTotal * 0.2;
  }

  getDisplayTotal() {
    return `Total amount: ${this.getTotal()}`;
  }
}

class PaymentProviderAdapter implements IPaymentProvider {
  private adaptee: ThirdPartyPaymentProvider;

  constructor(adaptee: ThirdPartyPaymentProvider) {
    this.adaptee = adaptee;
  }

  getDisplayTotal() {
    return `Total amount: ${this.adaptee.getTotal()}`;
  }
}

interface IThirdPartyPaymentProvider {
  getTotal: () => number;
}

class ThirdPartyPaymentProvider implements IThirdPartyPaymentProvider {
  private paymentTotal: number;

  constructor(cartTotal: number) {
    this.paymentTotal = cartTotal;
  }

  getTotal(): number {
    return this.paymentTotal;
  }
}

/**
 * Usage
 *
 * */

const defaultPaymentProvider = new PaymentProvider(100);
const thirdPartyPaymentProvider = new ThirdPartyPaymentProvider(100);

console.log(defaultPaymentProvider.getDisplayTotal());
// doesn't work
//console.log(thirdPartyPaymentProvider.getDisplayTotal())
// so we use an adapter for the missing part

const thirdPartyPaymentProviderAdapter = new PaymentProviderAdapter(thirdPartyPaymentProvider);
console.log(thirdPartyPaymentProviderAdapter.getDisplayTotal());
