import 'mocha';
import { expect } from 'chai';
import { fusc } from '../src';

const expected = [0, 1, 1, 2, 1, 3, 2, 3, 1, 4, 3, 5, 2, 5, 3, 4];

describe("fusc tests", () => {
  it("should calculate Stern's Diatomic series", () => {
    for (let i = 0; i < expected.length; i++) {
      expect(fusc(i)).to.eql(expected[i]);
    }
  });
});