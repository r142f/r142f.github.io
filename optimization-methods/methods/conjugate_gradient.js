function conjugate_gradient({ node: f_node, f, name }, x, Ɛ) {
  let grad = getGradient(f_node),
    calculated_grad = evaluateGradient(grad, x),
    d = multiply(-1, calculated_grad),
    x_k,
    i = 0;

  do {
    x_k = x;
    let d_k = d;

    // вычисление f(x_k + α*d_k)
    let [x1, x2] = [`${x_k[0]} + α * ${d_k[0]}`, `${x_k[1]} + α * ${d_k[1]}`];
    parser.evaluate(
      `f(α) = ${math
        .string(f_node)
        .replace(/x/g, x1)
        .replace(/y/g, x2)}`
    );
    fα = parser.get("f");

    α = golden_section_search(fα, 0, 1e3);
    x = add(x_k, multiply(α, d_k));
    let new_calculated_grad = evaluateGradient(grad, x);

    let β = // Полак-Рибьер
      i + (1 % 2)
        ? 0
        : multiply(
            new_calculated_grad,
            subtract(new_calculated_grad, calculated_grad)
          ) /
          norm(calculated_grad) ** 2;
    d = add(multiply(-1, new_calculated_grad), multiply(β, d_k));

    calculated_grad = new_calculated_grad;
    logCalculation(3, name, i, x, f(...x));

  } while (
    i++ < 10000 &&
    (norm(subtract(x, x_k)) >= Ɛ || norm(f(...x) - f(...x_k)) >= Ɛ || norm(calculated_grad) >= Ɛ)
  );

  logResult(3, name, x, f(...x));
}
