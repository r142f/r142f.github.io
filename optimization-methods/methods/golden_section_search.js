function golden_section_search(f, a, b, ε = 1e-5) {
  const φ = (-1 + Math.sqrt(5)) / 2;
  const φ2 = (3 - Math.sqrt(5)) / 2;

  let h = b - a;
  if (h <= ε) {
    return (a + b) / 2;
  }

  let [c, d] = [a + φ2 * h, a + φ * h];
  let [yc, yd] = [f(c), f(d)];

  //Required steps to achieve tolerance
  let n = math.floor(math.ceil(math.log(ε / h) / math.log(φ)));

  for (let k = 0; k < n; k++) {
    if (yc < yd) {
      b = d;
      d = c;
      yd = yc;
      h *= φ;
      c = a + φ2 * h;
      yc = f(c);
    } else {
      a = c;
      c = d;
      yc = yd;
      h *= φ;
      d = a + φ * h;
      yd = f(d);
    }
  }

  return yc < yd ? (a + d) / 2 : (c + b) / 2;
}
