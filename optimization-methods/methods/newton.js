function newton({ node: f_node, f, name }, x, Ɛ) {
  let first_grad = getGradient(f_node),
    second_grad = [getGradient(first_grad[0]), getGradient(first_grad[1])],
    x_k,
    i = 0;

  do {
    x_k = x;
    calculated_first_grad = evaluateGradient(first_grad, x_k);
    calculated_second_grad = [
      evaluateGradient(second_grad[0], x_k),
      evaluateGradient(second_grad[1], x_k)
    ];

    inversed_second_grad = inv(calculated_second_grad);
    let p_k = multiply(
      -1,
      multiply(inversed_second_grad, calculated_first_grad)
    );

    // вычисление f(x_k + α*p_k)
    let [x1, x2] = [`${x_k[0]} + α * ${p_k[0]}`, `${x_k[1]} + α * ${p_k[1]}`];
    parser.evaluate(
      `f(α) = ${math
        .string(f_node)
        .replace(/x/g, x1)
        .replace(/y/g, x2)}`
    );
    fα = parser.get("f");
    let α = golden_section_search(fα, 0, 1e3);
    x = add(x_k, multiply(α, p_k));

    logCalculation(4, name, i, x, f(...x));
  } while (
    i++ < 5000 &&
    (norm(subtract(x, x_k)) >= Ɛ || norm(f(...x) - f(...x_k)) >= Ɛ)
  );

  logResult(4, name, x, f(...x));
}
