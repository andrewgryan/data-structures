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
export function BinaryNode(value) {
  return {
    value,
    left: null,
    right: null,
  };
}

/**
 *  @param {BinaryNode | null} node
 *  @param {number} value
 *  @returns {BinaryNode} new search tree
 */
export function insertMut(node, value) {
  if (node === null) return BinaryNode(value);
  if (value < node.value) {
    node.left = insertMut(node.left, value);
  } else if (value > node.value) {
    node.right = insertMut(node.right, value);
  }
  return node;
}

/**
 *  @param {BinaryNode | null} node
 *  @param {number} value
 *  @returns {BinaryNode} new search tree
 */
export function insert(node, value) {
  if (node === null) return BinaryNode(value);
  if (value < node.value) {
    return {...node, left: insert(node.left, value) }
  } else if (value > node.value) {
    return {...node, right: insert(node.right, value) }
  } else {
    return node
  }
}

/**
 *  @param {BinaryNode | null} node
 *  @param {number} value
 *  @returns {BinaryNode} new search tree
 */
function balancedInsert(node, value) {
  // TODO: Balance the tree as an insert takes place
  // TODO: Print retracing balanceFactors
  return insertMut(node, value)
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
 *  @returns {number}
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
export function balanceFactor(node) {
  return height(node.left) - height(node.right);
}

/**
 *  @param {BinaryNode} node
 *  @returns {BinaryNode}
 */
export function leftRotate(node) {
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
export function rightRotate(node) {
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
export function rightLeftRotate(node) {
  let child = node.right;
  if (child === null) return node
  node.right = rightRotate(child);
  return leftRotate(node);
}

/**
 *  @param {BinaryNode} node
 *  @returns {BinaryNode}
 */
export function leftRightRotate(node) {
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
export function summary(node) {
  console.log({ height: height(node), balance_factor: balanceFactor(node) });
  postOrder(node, 0, (n) => n.value);
  postOrder(node, 0, balanceFactor);
}

/**
 *  @param {BinaryNode} node
 */
export function show(node) {
  postOrder(node, 0, (n) => n.value);
}

/**
 * @param {number} root
 * @param {number[]} data
 * @returns {BinaryNode} binary search tree
 */
export function bst(root, ...data) {
  return data.reduce(insert, BinaryNode(root))
}

/**
 * @param {number} root
 * @param {number[]} data
 * @returns {BinaryNode} binary search tree
 */
export function avl(root, ...data) {
  // TODO: implement automatic balancing
  return data.reduce(balancedInsert, BinaryNode(root))
}

/**
 * @param {BinaryNode} tree
 * @param {number} value
 * @returns {boolean} binary search tree
 */
export function search(tree, value) {
  if (value > tree.value) {
    if (tree.right === null) return false
    return search(tree.right, value)
  } else if (value < tree.value) {
    if (tree.left === null) return false
    return search(tree.left, value)
  }
  return true
}

/**
 *  @param {BinaryNode} node
 *  @returns {BinaryNode} balanced search tree
 */
export function balance(node) {
  if (balanceFactor(node) === -2) {
    return leftRotate(node)
  }
  if (balanceFactor(node) === +2) {
    let child = node.left
    if ((child !== null) && (balanceFactor(child) === -1)) {
      node.left = leftRotate(child)
    }
    return rightRotate(node)
  }
  return node
}
