// ===================================================================
// Importeer BlogEntry en TaggedBlogEntry uit het bestand entry_taggedEntry.js
// Exporteer de klassen Blog en GroupBlog
// ===================================================================

class Blog {
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

class GroupBlog extends Blog {
  #authors = [];
  constructor(creator, ...authors) {
    super(creator);
    for (const author of authors) {
      this.addAuthor(author);
    }
    this.addAuthor(creator);
  }

  get authors() {
    return this.#authors;
  }

  addAuthor(author) {
    if (!this.#authors.includes(author)) this.#authors.push(author);
  }

  removeAuhtor(author) {
    if (author !== creator) {
      const index = this.authors.indexOf(author);
      if (index !== -1) {
        this.authors.splice(index, 1);
      }
    }
  }

  addEntry(body, author, ...tags) {
    if (this.authors.includes(author)) super.addEntry(body, author, ...tags);
  }
}
