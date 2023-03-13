// !!! Merk op !!!
// BlogEntry heeft hier een extra property, met getter, gekregen:
// ===>  author - de schrijver van de BlogEntry

class BlogEntry {
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
      day: 'numeric',
    };
    return date.toLocaleDateString('en-NL', options);
  }
}

class TaggedBlogEntry extends BlogEntry {
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

// Voorbeelden gebruik TaggedBlogEntry
// const myTaggedEntry = new TaggedBlogEntry(
//   'A day in the life of a UNICEF Goodwill Ambassador',
//   'Nafi Thiam',
//   ['United Nations', 'UNICEF']
// );
// console.log(myTaggedEntry.body); // A day in the life of a UNICEF Goodwill Ambassador
// myTaggedEntry.addTag('children');
// console.log(myTaggedEntry.tags); // [ "United Nations", "UNICEF", "children" ]
// console.log(myTaggedEntry.contains('life')); // true
// console.log(myTaggedEntry.contains('children')); // true
// myTaggedEntry.removeTag('United Nations');
// console.log(myTaggedEntry.tags); // [ "UNICEF", "children" ]
// console.log(myTaggedEntry instanceof TaggedBlogEntry); // true
// console.log(myTaggedEntry instanceof BlogEntry); // true
// console.log(myTaggedEntry instanceof Object); // true

// console.log(Object.entries(myTaggedEntry));
// console.log(Object.values(myTaggedEntry));
// console.log(Object.keys(myTaggedEntry));

// console.log(myTaggedEntry.toString());

// ========================================================================
// Gegeven onderstaande klasse Blog.
// Wijzigingen tov blog04.js:
// - de toString methode werd toegevoegd
// - addEntry voegt nu, indien er tags worden opgegeven, een TaggedBlogEntry
//   toe ipv een gewone BlogEntry
// ========================================================================

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

// ========================================================================
// Maak de klasse GroupBlog, dit is een subklasse van Blog.
// Aan een GroupBlog werken verschillende auteurs...
// - declareer een private field #authors; dit wordt een array die de namen
//   van de auteurs die meewerken aan de GroupBlog bevat
// - voorzie een constructor voor GroupBlog; naast creator moet je
//   ook een willekeurig aantal auteurs kunnnen opgeven, gebruik een rest-parameter
// - maak in de constructor gebruik van de methode addAuthor (zie verderop); zorg dat de
//   creator van de Blog ook wordt toegevoegd aan de lijst van authors
// - voorzie een getter voor de property authors
//   ! deze retourneert de authors in alfabetische volgorde !
// - voorzie een methode addAuthor(author)
//   ! let op: een author kan geen twee keer in de lijst van authors voorkomen !
// - voorzie een methode removeAuthor(author)
//   ! let op: de creator van de blog mag je nooit verwijderen !
// - override de methode addEntry
//   ! Indien de author niet voorkomt in de lijst van authors wordt geen entry toegevoegd !
// ========================================================================

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
    return this.#authors.sort();
  }

  addAuthor(author) {
    if (!this.#authors.includes(author)) this.#authors.push(author);
  }

  removeAuthor(author) {
    if (author !== this.creator) {
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

// Test je code:
const ourGroupBlog = new GroupBlog(
  'Nafi Thiam',
  'Matthias Casse',
  'Bashir Abdi'
);
ourGroupBlog.addEntry(
  'Running for bronze in the 2020 Summer Olympics',
  'Bashir Abdi'
);
ourGroupBlog.addEntry(
  'An entry by Nina who is not yet an author, it should not be added...',
  'Nina Derwael'
);
ourGroupBlog.addAuthor('Nina Derwael');
ourGroupBlog.addEntry(
  'An entry with tags by Nina who is a registered author...',
  'Nina Derwael',
  'gymnastics',
  'olympics',
  'gold',
  'uneven bars'
);

console.log(ourGroupBlog.nrOfEntries); // 2
console.log(ourGroupBlog.authors); // ["Bashir Abdi", "Matthias Casse", "Nafi Thiam", "Nina Derwael"]
console.log(ourGroupBlog.toString());
// == A blog created by Nafi Thiam. ==

// On Sunday, 6 March 2022 Nina Derwael wrote:
// ---
// An entry with tags by Nina who is a registered author...
// Tags: gymnastics, olympics, gold, uneven bars

// On Sunday, 6 March 2022 Bashir Abdi wrote:
// ---
// Running for bronze in the 2020 Summer Olympics
