function Node(value) {
  return {
    value,
    left: null,
    right: null,
  };
}

function insertMany(node, values) {
  values.forEach((value) => {
    node = insert(node, value);
  });
  return node;
}

function insert(node, value) {
  if (node === null) return Node(value);
  if (value < node.value) {
    node.left = insert(node.left, value);
  } else if (value > node.value) {
    node.right = insert(node.right, value);
  }
  return node;
}

function height(tree) {
  return _height(tree, 0);
}

function _height(node, edges) {
  if (node === null) return edges;
  if (isLeaf(node)) return edges;
  return Math.max(_height(node.left, edges), _height(node.right, edges)) + 1;
}

function isLeaf(node) {
  return node.left === null && node.right === null;
}

function balance_factor(node) {
  return height(node.left) - height(node.right);
}

function leftRotate(node) {
  let root = node;
  let pivot = node.right;
  root.right = pivot.left;
  pivot.left = root;
  return pivot;
}

function rightRotate(node) {
  let root = node;
  let pivot = node.left;
  root.left = pivot.right;
  pivot.right = root;
  return pivot;
}

function rightLeftRotate(node) {
  let child = node.right;
  node.right = rightRotate(child);
  return leftRotate(node);
}

function leftRightRotate(node) {
  let child = node.left;
  node.left = leftRotate(child);
  return rightRotate(node);
}

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

function summary(node) {
  console.log({ height: height(node), balance_factor: balance_factor(node) });
  postOrder(node, 0, (n) => n.value);
  postOrder(node, 0, balance_factor);
}

/// Executable code
let node = insertMany(Node(42), [41, 43, 44, 45, 46]);

summary(node);
node = leftRotate(node);
summary(node);
node.right = leftRotate(node.right);
summary(node);

// Duplicate insert
summary(insert(Node(42), 42));

// Right rotate test
let right = insertMany(Node(5), [4, 3, 2, 1]);
summary(right);
right = rightRotate(right);
summary(right);

// Right left rotate scenario
console.log("-- Right left rotate --");
let rightLeft = insertMany(Node(10), [20, 19, 18]);
summary(rightLeft);
rightLeft = rightLeftRotate(rightLeft);
summary(rightLeft);

// Left right rotate scenario
console.log("-- Left right rotate --");
let leftRight = insertMany(Node(30), [20, 21, 22]);
summary(leftRight);
leftRight = leftRightRotate(leftRight);
summary(leftRight);
