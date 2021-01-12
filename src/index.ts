const a = [0, 1, 1, 2, 1, 3, 2, 3, 1, 4, 3, 5, 2, 5, 3, 4];
export function fusc(n: number) {
  for (let i = a.length; i <= n; i++) {
    a[i] = i & 1 ? a[(i-1)/2] + a[(i+1)/2] : a[i/2];
  }
  return a[n];
}

export function Q(n: number) {
  const s = Math.sign(n);
  n *= s;
  const den = fusc(n+1);
  return [s * a[n], den];
}

export function F(i: number) {
  if (i === 0) return [0, 1];
  const s = Math.sign(i);
  i *= s;

  let n = 1;
  let d = 1;
  let digit = (1 << (Math.log2(i) | 0)) >> 1;
  while(digit) {
    if (i & digit) n += d; // x + 1
    else d += n; // x / (x + 1)
    digit >>= 1;
  }

  const pair = _reduce(n, d);
  pair[0] *= s;
  return pair;
}

function _reduce(n: number, d: number) {
  let [a, b] = [n, d];
  while (b) [a, b] = [b, a % b];
  return [n / a, d / a];
}

export function reduce(n: number, d: number) {
  if (n === 0) return d === 0 ? [0, 0] : [0, 1];
  let s = Math.sign(n);
  if (d === 0) return [s, d];
  s *= Math.sign(d);
  const pair = _reduce(Math.abs(n), Math.abs(d));
  pair[0] *= s;
  return pair;
}

export function left(n: number, d: number) {
  if (n <= 0 || d <= 0) throw new Error('Non-positive argument');
  return _reduce(n, n + d);
}

export function right(n: number, d: number) {
  if (n <= 0 || d <= 0) throw new Error('Non-positive argument');
  return _reduce(n + d, d);
}

export function parent(n: number, d: number) {
  if (n <= 0 || d <= 0) throw new Error('Non-positive argument');
  return (n > d) ? _reduce(n - d, d) : _reduce(n, d - n);
}

export function N(n: number, d: number) {
  if (d === 0) return Math.sign(n) * Infinity;
  if (n === 0) return 0;
  if (n === d) return 1;
  
  const s = Math.sign(n) * Math.sign(d);
  [n, d] = _reduce(Math.abs(n), Math.abs(d));

  let acc = 0;
  let digit = 1;
  while (n !== d) {
    if (n < d) do {
      d -= n;
      digit *= 2;
    } while (n < d);
    else do {
      n -= d
      acc += digit;
      digit *= 2;
    } while (d < n);
  }

  return s * (acc + digit);
}

export function next(n: number, d: number) {
  if (n < 0 || d <= 0) throw new Error('Invalid argument');
  return Q(N(n, d) + 1);
}

export function S(n: number, d: number) {
  // 1 / (2*floor([n,d]) - [n,d] + 1)
  // 1 / (2*[d*floor(n/d), d] - [n,d] + [d,d])
  // 1 / (2*[d*floor(n/d), d] + [d - n, d])
  // 1 / [2*(d*floor(n/d) + d - n), d]
  return _reduce(d, 2 * (d * (1 + Math.floor(n / d)) - n));
}

export function P(n: number, d: number) {
  // (-1 / [n, d]) - 1 - 2 * floor(-1 / [n, d])
  // [-d, n] - [n, n] - 2 * floor([-d, n])
  // [-d - n, n] - 2 * floor([-d, n])
  // [-d - n, n] + 2 * [d * floor(d/n), n]
  // [2 * d * floor(d/n) - d - n, n]
  // [2 * d * (floor(d/n) - 1) - n, n]
  return _reduce(2 * d * (Math.floor(d/n) - 1) - n, n);
}

export function prev(n: number, d: number) {
  if (n < 0 || d <= 0) throw new Error('Invalid argument');
  const i = N(n, d);
  if (i === 0) throw new Error("No previous element");
  return Q(i - 1);
}