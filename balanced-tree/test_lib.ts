import { assertEquals, assertNotEquals } from "https://deno.land/std@0.201.0/assert/mod.ts";
import { bst, balanceFactor, balance, insert, BinaryNode } from "./lib.js"

Deno.test("immutable insert", () => {
  const original = BinaryNode(1)
  const modified = insert(original, 2)
  assertEquals(original.right, null)
  assertEquals(modified.right, BinaryNode(2))
})

Deno.test("immutable insert deeply nested", () => {
  const original = BinaryNode(1)
  const modified = insert(insert(original, 2), 0)
  assertEquals(original.right, null)
  assertEquals(original.left, null)
  assertEquals(modified.right, BinaryNode(2))
  assertEquals(modified.left, BinaryNode(0))
})

Deno.test("bst", () => {
  const tree = bst(1, 2, 3);
  assertEquals(tree.right?.right?.value, 3);
});

Deno.test("balanceFactor right heavy", () => {
  const tree = bst(1, 2, 3, 4);
  let actual = balanceFactor(tree)
  let expected = -2
  assertEquals(actual, expected)
});

Deno.test("balanceFactor left heavy", () => {
  const tree = bst(4, 3, 2, 1);
  let actual = balanceFactor(tree)
  let expected = 2
  assertEquals(actual, expected)
});

Deno.test("balance right rotate", () => {
  const tree = bst(4, 3, 2, 1);
  let actual = balance(tree)
  let expected = {
    value: 3,
    left: {
      value: 2,
      left: {
        value: 1,
        left: null,
        right: null
      },
      right: null
    },
    right: {
      value: 4,
      left: null,
      right: null
    }
    
  }
  assertEquals(actual, expected)
})

Deno.test("balance left rotate", () => {
  const tree = bst(1, 2, 3, 4);
  let actual = balance(tree)
  let expected = {
    value: 2,
    left: {
      value: 1,
      left: null,
      right: null
    },
    right: {
      value: 3,
      right: {
        value: 4,
        left: null,
        right: null
      },
      left: null
    },
    
  }
  assertEquals(actual, expected)
})
