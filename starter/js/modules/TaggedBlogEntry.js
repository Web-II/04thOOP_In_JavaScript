import BlogEntry from "./BlogEntry.js";

export default class TaggedBlogEntry extends BlogEntry {
  #tags;

  constructor(body, author, ...tags) {
    super(body, author);
    this.#tags = tags;
  }

  get tags() {
    return this.#tags;
  }

  addTag(tag) {
    this.tags.push(tag);
  }

  removeTag(tag) {
    const index = this.tags.indexOf(tag);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
  }

  contains(searchText) {
    return super.contains(searchText) || this.tags.includes(searchText);
  }

  toString() {
    return `${super.toString()}\nTags: ${this.tags.join(', ')}`;
  }
}
