// @ts-check

import { bst, summary, leftRotate, rightRotate, leftRightRotate, rightLeftRotate } from "./lib.js"

/// Executable code
let node = bst(42, 41, 43, 44, 45, 46);

summary(node);
node = leftRotate(node);
summary(node);
if (node.right !== null) {
  node.right = leftRotate(node.right);
  summary(node);
}

// Duplicate insert
summary(bst(42, 42));

// Right rotate test
let right = bst(5, 4, 3, 2, 1);
summary(right);
right = rightRotate(right);
summary(right);

// Right left rotate scenario
console.log("-- Right left rotate --");
let rightLeft = bst(10, 20, 19, 18);
summary(rightLeft);
rightLeft = rightLeftRotate(rightLeft);
summary(rightLeft);

// Left right rotate scenario
console.log("-- Left right rotate --");
let leftRight = bst(30, 20, 21, 22);
summary(leftRight);
leftRight = leftRightRotate(leftRight);
summary(leftRight);
