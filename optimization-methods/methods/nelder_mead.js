function nelder_nead({ f, node, name }, [V1, V2, V3], Ɛ) {
  const α = 1,
    β = 0.5,
    γ = 2;

  let i = 0,
    x,
    fx;

  do {
    let [[b, fb], [g, fg], [w, fw]] = [
      [V1, f(...V1)],
      [V2, f(...V2)],
      [V3, f(...V3)]
    ].sort((a, b) => a[1] - b[1]);

    mid = [(g[0] + b[0]) / 2, (g[1] + b[1]) / 2]; // середина bg

    //отражение
    x_r = add(mid, multiply(α, subtract(mid, w))); // mid + α * (mid - w)
    fx_r = f(...x_r);

    if (fx_r < fb) {
      //растяжение
      x_e = add(mid, multiply(γ, subtract(x_r, mid))); // mid + γ * (x_r - mid)
      fx_e = f(...x_e);
      w = fx_e < fx_r ? x_e : x_r;
    } else if (fb < fx_r && fx_r <= fg) {
      w = x_r;
    } else {
      //сжатие
      x_c = add(mid, multiply(β, subtract(w, mid)));
      fx_c = f(...x_c);

      if (fx_c < fw) {
        w = x_c;
      } else {
        // глобальное сжатие
        [w, g] = [
          add(b, multiply(1 / 2, subtract(w, b))), // b + 1/2(w - b)
          add(b, multiply(1 / 2, subtract(g, b))) // b + 1/2(g - b)
        ];
      }
    }

    [V1, V2, V3] = [b, g, w];

    [x, fx] = [
      [V1, f(...V1)],
      [V2, f(...V2)],
      [V3, f(...V3)]
    ].sort((a, b) => a[1] - b[1])[0];
    logCalculation(1, name, i, x, fx);
  } while (
    i++ < 5000 &&
    norm(det([subtract(V1, V3), subtract(V2, V3)])) > 2 * Ɛ
  );

  logResult(1, name, x, fx);
}
