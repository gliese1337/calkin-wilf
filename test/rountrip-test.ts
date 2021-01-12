import 'mocha';
import { expect } from 'chai';
import { Q, N } from '../src';

describe("roundtrip tests", () => {
  // Good up to at least 10,000
  for (let i = 0; i <= 100; i++) {
    const [n, d] = Q(i);
    it(`should roundtrip ${i} through ${n}/${d}`, () => {
      expect(N(n, d)).to.eql(i);
    });
  }

  /*for (let i = 1000;;i++) {
    const [n, d] = Q(i);
    if (N(n, d) !== i) {
      console.log("Limit: ", i);
      break;
    }
  }*/
});