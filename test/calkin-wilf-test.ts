import 'mocha';
import { expect } from 'chai';
import { Q, parent, left, right, next, prev } from '../src';

const expected: [number, number][] = [
  [0,1],
  [1,1],
  [1,2],
  [2,1],
  [1,3],
  [3,2],
  [2,3],
  [3,1],
  [1,4],
  [4,3],
  [3,5],
  [5,2],
  [2,5],
  [5,3],
  [3,4],
  [4,1],
];

describe("Calkin-Wilf tests", () => {
  it("should calculate the Calkin-Wilf series by index", () => {
    for (let i = 0; i < expected.length; i++) {
      expect(Q(i)).to.eql(expected[i]);
    }
  });

  /*for (let i = 1; i < expected.length - 1; i++) {
    it(`S(${expected[i][0]}/${expected[i][1]}) should be ${expected[i+1][0]}/${expected[i+1][1]}`, () => {
      expect(succ(...expected[i])).to.eql(expected[i+1]);
    });
  }*/

  it("should calculate parent & child tree relations", () => {
    for (let i = 2; i < expected.length / 2; i++) {
      expect(parent(...expected[i])).to.eql(expected[i>>>1]);
      expect(left(...expected[i])).to.eql(expected[2*i]);
      expect(right(...expected[i])).to.eql(expected[2*i+1]);
    }
  });

  it("should calculate adjacency relations", () => {
    for (let i = 1; i < expected.length - 1; i++) {
      expect(next(...expected[i])).to.eql(expected[i + 1]);
      expect(prev(...expected[i + 1])).to.eql(expected[i]);
    }
  });
});