import { Trie } from "./trie";

const hashNumbers = (value: number) =>
  value
    .toString(2)
    .split("")
    .map(c => c === "1");

test("adding items to trie should increase count", () => {
  const trie = new Trie<number>(hashNumbers);
  trie.add(3);
  trie.add(7);
  expect(trie.contains(3)).toBe(true);
  expect(trie.contains(7)).toBe(true);
  expect(trie.count()).toBe(2);
  expect(trie.contains(8)).toBe(false);
  trie.add(8);
  expect(trie.contains(8)).toBe(true);
  expect(trie.count()).toBe(3);
});

test("removing from trie should decrease count", () => {
  const trie = new Trie<number>(hashNumbers);
  trie.add(3);
  trie.add(7);
  trie.add(8);
  trie.add(10);
  expect(trie.count()).toBe(4);
  expect(trie.contains(8)).toBe(true);
  trie.remove(8);
  expect(trie.contains(8)).toBe(false);
  expect(trie.count()).toBe(3);
});
