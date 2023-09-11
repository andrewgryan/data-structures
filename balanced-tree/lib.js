function Node(value) {
  return {
    value,
    left: null,
    right: null,
  };
}

function insertMany(node, values) {
  for (let i = 0; i < values.length; i++) {
    node = insert(node, values[i]);
  }
  return node;
}

function insert(node, value) {
  if (node === null) return Node(value);
  if (value < node.value) {
    node.left = insert(node.left, value);
  } else {
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
console.log({height: height(node),
             balance_factor: balance_factor(node)});
postOrder(node, 0, (n) => n.value);
postOrder(node, 0, balance_factor);
  
}

/// Executable code
let node = insertMany(Node(42), [43, 44, 45, 46]);


summary(node)
node = leftRotate(node);
summary(node)
node.right = leftRotate(node.right);
summary(node)

