function gradient_descent({ node: f_node, f, name }, x, Ɛ, α) {
  let grad = getGradient(f_node),
    fx,
    x_k,
    i = 0;

  do {
    x_k = x;
    let calculated_grad = evaluateGradient(grad, x_k);
    x = subtract(x_k, multiply(α, calculated_grad));
    fx = f(...x);

    logCalculation(2, name, i, x, fx);

  } while (
    i++ < 5000 &&
    (norm(subtract(x, x_k)) >= Ɛ || norm(fx - f(...x_k)) >= Ɛ)
  );

  logResult(2, name, x, fx);
}
