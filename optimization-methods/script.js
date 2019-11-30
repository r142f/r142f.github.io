document.querySelector(".method1 button").addEventListener("click", e => {
  nelder_nead(
    functions[getChoosenFunction(1)],
    getStartCoordinates(1),
    getTolerance(1)
  );
});

document.querySelector(".method2 button").addEventListener("click", e => {
  gradient_descent(
    functions[getChoosenFunction(2)],
    getStartCoordinates(2),
    getTolerance(2),
    Number(document.querySelector(".method2__step").value)
  );
});

document.querySelector(".method3 button").addEventListener("click", e => {
  conjugate_gradient(
    functions[getChoosenFunction(3)],
    getStartCoordinates(3),
    getTolerance(3)
  );
});

document.querySelector(".method4 button").addEventListener("click", e => {
  newton(
    functions[getChoosenFunction(4)],
    getStartCoordinates(4),
    getTolerance(4)
  );
});

let getChoosenFunction = n =>
  document.querySelector(`.method${n}__function`).value;

let getStartCoordinates = n => {
  let points = [...document.querySelectorAll(`.method${n}__coordinate`)].map(
    input =>
      input.value
        .replace(/\s+/g, "")
        .split(",")
        .map(coord => Number(coord))
  );
  return points.length - 1 ? points : points[0];
};

let getTolerance = n =>
  Number(document.querySelector(`#method${n}__tolerance`).value);

let logCalculation = (n, name, i, x, fx) => {
  document.querySelector(
    `.method${n}__logs`
  ).value += `${i}: ${name}(${x[0]}, ${x[1]}) = ${fx}\n`;
};

let logResult = (n, name, x, fx) => {
  let textarea = document.querySelector(`.method${n}__logs`);
  textarea.value += `\nОтвет: ${name}(${x[0]}, ${x[1]}) = ${fx}\n\n`;
  textarea.scrollTop = textarea.scrollHeight;
};
