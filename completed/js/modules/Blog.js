import BlogEntry from './BlogEntry.js';
import TaggedBlogEntry from './TaggedBlogEntry.js';

export default class Blog {
  static maxEntries = 3;
  #entries = [];
  #creator;

  constructor(creator) {
    this.creator = creator;
  }

  get creator() {
    return this.#creator;
  }

  set creator(value) {
    this.#creator = value ? value : 'Anonymous';
  }

  get nrOfEntries() {
    return this.#entries.length;
  }

  get freeSpace() {
    return Math.round(
      ((Blog.maxEntries - this.#entries.length) / Blog.maxEntries) * 100
    );
  }

  contains(searchText) {
    for (const entry of this.#entries) {
      if (entry.contains(searchText)) return true;
    }
    return false;
  }

  addEntry(body, author, ...tags) {
    if (tags.length > 0)
      this.#entries.unshift(new TaggedBlogEntry(body, author, ...tags));
    else this.#entries.unshift(new BlogEntry(body, author || this.creator));
    if (this.nrOfEntries > Blog.maxEntries) this.#entries.pop();
  }

  getEntry(index) {
    return this.#entries[index];
  }

  toString() {
    let result = `== A blog created by ${this.creator}. ==\n\n`;
    for (const entry of this.#entries) {
      result += `${entry.toString()}\n\n`;
    }
    return result;
  }
}

