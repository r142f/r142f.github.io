const [
  parser,
  {
    parse,
    add,
    multiply,
    subtract,
    norm,
    abs,
    derivative,
    pow,
    det,
    inv,
    mod,
    min
  }
] = [math.parser(), math];

parser.evaluate("f1(x,y) = 100*((y) - (x)^2)^2 + 5*(1 - (x))^2");
parser.evaluate("f2(x,y) = ((x)^2 + (y) - 11)^2 + ((x) + (y)^2 - 7)^2");
let [f1, f2] = [
  {
    node: parse("100*((y) - (x)^2)^2 + 5*(1 - (x))^2"),
    f: parser.get("f1"),
    name: "f₁"
  },
  {
    node: parse("((x)^2 + (y) - 11)^2 + ((x) + (y)^2 - 7)^2"),
    f: parser.get("f2"),
    name: "f₂"
  }
];

let functions = { f1, f2 };

let getGradient = (f, point) => {
  return point
    ? [
        derivative(f, "x").evaluate({ x: point[0], y: point[1] }),
        derivative(f, "y").evaluate({ x: point[0], y: point[1] })
      ]
    : [derivative(f, "x"), derivative(f, "y")];
};

let evaluateGradient = (grad, point) => [
  grad[0].evaluate({ x: point[0], y: point[1] }),
  grad[1].evaluate({ x: point[0], y: point[1] })
];
