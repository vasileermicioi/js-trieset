export class TrieNode<T> {
  left: TrieNode<T>;
  right: TrieNode<T>;
  trieCount: number = 0;
  values: T[];
}

export class Trie<T> {
  head: TrieNode<T>;

  constructor(private hashFunction: (value: T) => Array<boolean>) {
    this.head = new TrieNode<T>();
  }

  add(value: T) {
    if (this.contains(value)) {
      return;
    }
    const bits = this.hashFunction(value);
    let node = this.head;
    node.trieCount++;
    for (let bit in bits) {
      if (bit) {
        node.right = node.right || new TrieNode<T>();
      } else {
        node.left = node.left || new TrieNode<T>();
      }
      node = bit ? node.right : node.left;
      node.trieCount++;
    }
    node.values = node.values || [];
    node.values.push(value);
  }

  remove(value: T) {
    if (!this.contains(value)) {
      return;
    }
    const bits = this.hashFunction(value);
    let node = this.head;
    node.trieCount--;
    for (let bit in bits) {
      node = bit ? node.right : node.left;
      node.trieCount--;
    }
    node.values = node.values.filter(v => v !== value);
  }

  contains(value: T): boolean {
    const bits = this.hashFunction(value);
    let node = this.head;
    for (let bit in bits) {
      node = bit ? node.right : node.left;
      if (!node) {
        return false;
      }
    }
    return node.values && node.values.includes(value);
  }

  count(): number {
    return (this.head && this.head.trieCount) || 0;
  }
}
