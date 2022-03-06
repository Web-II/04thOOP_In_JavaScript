export class BlogEntry {
  static #wordsInShortBody = 5;
  #date = new Date();
  #entryBody;
  #author;

  constructor(body, author) {
    this.#body = body;
    this.#author = author;
  }

  get body() {
    return this.#entryBody;
  }

  set #body(value) {
    this.#entryBody = value || 'This entry is work in progress';
  }

  get author() {
    return this.#author;
  }

  get date() {
    return this.#date;
  }

  get outDated() {
    return new Date().getFullYear() - this.date.getFullYear() >= 5;
  }

  contains(searchText) {
    return searchText
      ? this.body.toUpperCase().includes(searchText.toUpperCase())
      : false;
  }

  static get wordsInShortBody() {
    return BlogEntry.#wordsInShortBody;
  }

  get shortBody() {
    return (
      this.body.split(' ').slice(0, BlogEntry.wordsInShortBody).join(' ') +
      '...'
    );
  }

  contains(searchText) {
    return searchText
      ? this.body.toUpperCase().includes(searchText.toUpperCase())
      : false;
  }

  static createDummy() {
    return new this('Nothing much to say today...');
  }

  toString() {
    return `On ${this.#toBlogFormat(this.#date)} ${this.author} wrote:\n---\n${
      this.body
    }`;
  }

  #toBlogFormat(date) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-NL', options);
  }
}

export class TaggedBlogEntry extends BlogEntry {
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
