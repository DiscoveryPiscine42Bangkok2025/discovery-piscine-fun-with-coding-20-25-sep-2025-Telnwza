function isnum(str) {
  return /^\d+$/.test(str);
}

function compute(leftStr, op, rightStr) {
  if (!isnum(leftStr) || !isnum(rightStr)) {
    alert("Error :(");
    console.log("Error :(");
    return;
  }

  const a = parseInt(leftStr, 10);
  const b = parseInt(rightStr, 10);

  if ((op === "/" || op === "%") && b === 0) {
    alert("It's over 9000!");
    console.log("It's over 9000!");
    return;
  }

  let result;
  switch (op) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/": result = a / b; break;
    case "%": result = a % b; break;
    default:
      alert("Error :(");
      console.log("Error :(");
      return;
  }

  alert(String(result));
  console.log(result);
}

document.addEventListener("DOMContentLoaded", () => {
  const form  = document.getElementById("calForm");
  const left  = document.getElementById("left");
  const right = document.getElementById("right");
  const op    = document.getElementById("op");

  form.addEventListener("submit", (e) => {
    e.preventDefault();               // ไม่ให้ reload หน้า
    compute(left.value.trim(), op.value, right.value.trim());
  });

  // เด้งเตือนทุก 30 วินาที
  setInterval(() => {
    alert("Please, use me...");
  }, 30_000);
});