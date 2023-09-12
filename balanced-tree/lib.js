// @ts-check

/**
 * @typedef {object} BinaryNode
 * @property {number} value
 * @property {BinaryNode | null} left
 * @property {BinaryNode | null} right
 */

/**
 *  @param {number} value
 *  @returns {BinaryNode} new search tree
 */
function BinaryNode(value) {
  return {
    value,
    left: null,
    right: null,
  };
}

/**
 *  @param {BinaryNode} node
 *  @param {number[]} values
 */
function insertMany(node, values) {
  values.forEach((value) => {
    node = insert(node, value);
  });
  return node;
}

/**
 *  @param {BinaryNode | null} node
 *  @param {number} value
 *  @returns {BinaryNode} new search tree
 */
function insert(node, value) {
  if (node === null) return BinaryNode(value);
  if (value < node.value) {
    node.left = insert(node.left, value);
  } else if (value > node.value) {
    node.right = insert(node.right, value);
  }
  return node;
}

/**
 *  @param {BinaryNode | null} tree
 */
function height(tree) {
  return _height(tree, 0);
}

/**
 *  @param {BinaryNode | null} node
 *  @param {number} edges
 */
function _height(node, edges) {
  if (node === null) return edges;
  if (isLeaf(node)) return edges;
  return Math.max(_height(node.left, edges), _height(node.right, edges)) + 1;
}

/**
 *  @param {BinaryNode} node
 */
function isLeaf(node) {
  return node.left === null && node.right === null;
}

/**
 *  @param {BinaryNode} node
 */
function balance_factor(node) {
  return height(node.left) - height(node.right);
}

/**
 *  @param {BinaryNode} node
 *  @returns {BinaryNode}
 */
function leftRotate(node) {
  let root = node;
  let pivot = node.right;
  if (pivot === null) return root
  root.right = pivot.left;
  pivot.left = root;
  return pivot;
}

/**
 *  @param {BinaryNode} node
 *  @returns {BinaryNode}
 */
function rightRotate(node) {
  let root = node;
  let pivot = node.left;
  if (pivot === null) return root
  root.left = pivot.right;
  pivot.right = root;
  return pivot;
}

/**
 *  @param {BinaryNode} node
 *  @returns {BinaryNode}
 */
function rightLeftRotate(node) {
  let child = node.right;
  if (child === null) return node
  node.right = rightRotate(child);
  return leftRotate(node);
}

/**
 *  @param {BinaryNode} node
 *  @returns {BinaryNode}
 */
function leftRightRotate(node) {
  let child = node.left;
  if (child === null) return node
  node.left = leftRotate(child);
  return rightRotate(node);
}

/**
 *  @param {BinaryNode} node
 *  @param {number} indent
 *  @param {(n: BinaryNode) => number} fn
 */
function postOrder(node, indent, fn) {
  if (node !== null) {
    // Format
    if (indent > 0) {
      let pad = "\u2514\u2500".padStart(indent, " ");
      let s = `${pad}${fn(node)}`;
      console.log(s);
    } else {
      console.log(fn(node));
    }

    if (node.left !== null) {
      postOrder(node.left, indent + 2, fn);
    }

    if (node.right !== null) {
      postOrder(node.right, indent + 2, fn);
    }
  }
}

/**
 *  @param {BinaryNode} node
 */
function summary(node) {
  console.log({ height: height(node), balance_factor: balance_factor(node) });
  postOrder(node, 0, (n) => n.value);
  postOrder(node, 0, balance_factor);
}

/**
 * @param {number} root
 * @param {number[]} data
 * @returns {BinaryNode} binary search tree
 */
function bst(root, ...data) {
  return insertMany(BinaryNode(root), data)
}

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
