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

function _reduce(n: number, d: number) {
  let [a, b] = [n, d];
  while (a !== b) {
    if (a > b) a = a - b;
    else b = b - a;
  }

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

  let stack = 1;
  while (n !== d) {
    stack = stack << 1;
    if (n < d) d -= n;
    else {
      n -= d
      stack |= 1;
    }
  }

  let acc = 1;
  while(stack > 1) {
    acc = (acc << 1) | (stack & 1);
    stack >>= 1;
  }

  return s * acc;
}

export function next(n: number, d: number) {
  if (n < 0 || d <= 0) throw new Error('Invalid argument');
  return Q(N(n, d) + 1)
}

export function prev(n: number, d: number) {
  if (n < 0 || d <= 0) throw new Error('Invalid argument');
  const i = N(n, d);
  if (i === 0) throw new Error("No previous element");
  return Q(i - 1);
}