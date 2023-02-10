import Blog from "./Blog.js";
export default class GroupBlog extends Blog {
  #authors = [];
  constructor(creator, ...authors) {
    super(creator);
    for (const author of authors) {
      this.addAuthor(author);
    }
    this.addAuthor(creator);
  }

  get authors() {
    return this.#authors.sort();
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
