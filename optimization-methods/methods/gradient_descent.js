function gradient_descent({ node: f_node, f, name }, x, Ɛ, α) {
  let grad = getGradient(f_node), calculated_grad,
    fx,
    x_k,
    i = 0;

  do {
    x_k = x;
    calculated_grad = evaluateGradient(grad, x_k);
    x = subtract(x_k, multiply(α, calculated_grad));
    fx = f(...x);

    logCalculation(2, name, i, x, fx);

  } while (
    i++ < 10000 &&
    (norm(subtract(x, x_k)) >= Ɛ || norm(fx - f(...x_k)) >= Ɛ || norm(calculated_grad) >= Ɛ)
  );

  logResult(2, name, x, fx);
}
