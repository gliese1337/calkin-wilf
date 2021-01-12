const a = [0, 1, 1, 2, 1, 3, 2, 3, 1, 4, 3, 5, 2, 5, 3, 4];
export function fusc(n: number): number {
  for (let i = a.length; i <= n; i++) {
    a[i] = i & 1 ? a[(i-1)/2] + a[(i+1)/2] : a[i/2];
  }
  return a[n];
}

export function Q(i: number): [number, number] {
  const s = Math.sign(i);
  i *= s;
  // d must be calculated first to ensure a[i] exists
  const d = fusc(i+1);
  return [s * a[i], d];
}

function _reduce(n: number, d: number): [number, number] {
  let [a, b] = [n, d];
  while (b) [a, b] = [b, a - b * Math.floor(a/b)];
  return [n / a, d / a];
}

export function F(i: number): [number, number] {
  if (i === 0) return [0, 1];
  const s = Math.sign(i);
  i *= s;

  let n = 1;
  let d = 1;
  let digit = (1 << (Math.log2(i) | 0)) >> 1;
  while(digit) {
    if (i & digit) n += d; // x + 1, right branch
    else d += n; // x / (x + 1), left branch
    digit >>= 1;
  }

  const pair = _reduce(n, d);
  pair[0] *= s;
  return pair;
}

export function reduce(n: number, d: number): [number, number] {
  if (n === 0) return d === 0 ? [0, 0] : [0, 1];
  let s = Math.sign(n);
  if (d === 0) return [s, d];
  s *= Math.sign(d);
  const pair = _reduce(Math.abs(n), Math.abs(d));
  pair[0] *= s;
  return pair;
}

export function left(n: number, d: number): [number, number] {
  if (n <= 0 || d <= 0) throw new Error('Non-positive argument');
  return _reduce(n, n + d);
}

export function right(n: number, d: number): [number, number] {
  if (n <= 0 || d <= 0) throw new Error('Non-positive argument');
  return _reduce(n + d, d);
}

export function parent(n: number, d: number): [number, number] {
  if (n <= 0 || d <= 0) throw new Error('Non-positive argument');
  return (n > d) ? _reduce(n - d, d) : _reduce(n, d - n);
}

export function Sd(n: number, d: number): number {
  return n - 2 * (n - d * Math.floor(n / d)) + d;
}

export function S(n: number, d: number): [number, number] {
  return [d, Sd(n, d)];
}

export function Pn(n: number, d: number): number {
  return 2 * n * Math.ceil(d / n) - n - d;
}

export function P(n: number, d: number): [number, number] {
  return [Pn(n, d), n];
}

export function N(n: number, d: number): number {
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
      n -= d;
      acc += digit;
      digit *= 2;
    } while (d < n);
  }

  return s * (acc + digit);
}

export function add(a: number, b: number, c: number, d: number): [number, number] {
  return reduce(a * d + c * b, b * d);
}

export function sub(a: number, b: number, c: number, d: number): [number, number] {
  return reduce(a * d - c * b, b * d);
}

export function mul(a: number, b: number, c: number, d: number): [number, number] {
  return reduce(a * c, b * d);
}

export function div(a: number, b: number, c: number, d: number): [number, number] {
  return reduce(a * d, b * c);
}

export function cmp(a: number, b: number, c: number, d: number): -1|0|1 {
  return Math.sign(Math.sign(b) * a * d - Math.sign(d) * c * b) as -1|0|1;
}