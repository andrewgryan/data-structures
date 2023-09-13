// Demonstrate back-trace mechanism in recursive function
function russianDoll(n, stack) {
  if (n === 0) {
    console.log("back trace")
    while (stack.length > 0) {
      console.log(stack.pop())
    }
    return
  }
  console.log(n, stack)
  return russianDoll(n - 1, [...stack, n])
}

russianDoll(5, [])
