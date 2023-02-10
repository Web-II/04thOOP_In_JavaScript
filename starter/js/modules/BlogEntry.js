export default class BlogEntry {
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
    return `On ${this.#toBlogFormat(this.#date)} ${this.author} wrote:\n---\n${this.body
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
