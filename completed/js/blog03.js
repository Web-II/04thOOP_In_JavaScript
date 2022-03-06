class BlogEntry {
  #date = new Date();
  #entryBody;

  constructor(body) {
    this.#body = body;
  }

  get body() {
    return this.#entryBody;
  }

  set #body(value) {
    this.#entryBody = value || 'This entry is work in progress';
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
}

// Voorbeelden gebruik BlogEntry
// const aBlogEntry = new BlogEntry('This is a brand new blog entry');
// let word = 'hello';
// for (const word of ['hello', 'brand', 'BLOG']) {
//   console.log(
//     `aBlogEntry ${
//       aBlogEntry.contains(word) ? 'contains' : 'does not contain'
//     } the word "${word}".`
//   );
// }

// ========================================================================
// Kopieer hieronder de klasse Blog uit blog02.js en pas de klasse aan.
// - voorzie een publieke methode contains(searchText). De methode
//   retourneert true indien in 1 van de entries de searchText voorkomt;
//   maak gebruik van de methode searchText uit de klasse BlogEntry.
// - voorzie een publieke methode addEntry(body) die een nieuwe entry
//   maakt met de gegeven body en deze entry vooraan aan entries toevoegt.
// - voorzie een publieke methode getEntry(index) die de entry op plaats
//   index retourneert. De methode retourneert undefined indien op
//   index geen entry aanwezig is.
// ========================================================================

class Blog {
  #entries = [];
  #creator;

  constructor(creator) {
    this.creator = creator;
  }

  get creator() {
    return this.#creator;
  }

  set creator(value) {
    this.#creator = value || 'Anonymous';
  }

  get nrOfEntries() {
    return this.#entries.length;
  }

  contains(searchText) {
    for (const entry of this.#entries) {
      if (entry.contains(searchText)) return true;
    }
    return false;
  }

  addEntry(body) {
    this.#entries.unshift(new BlogEntry(body));
  }

  getEntry(index) {
    return this.#entries[index];
  }
}

// Test je code:
const blog = new Blog('Nafi Thiam');
blog.addEntry('So excited I received the World Athlete of the Year award!');
blog.addEntry('This is the story of my back-to-back Olympic gold medal.');
console.log(blog.nrOfEntries); // 2
console.log(blog.contains('athlete')); // true
console.log(blog.contains('heptathlete')); // false
console.log(blog.getEntry(0)?.body); // This is the story of my back-to-back Olympic gold medal.
console.log(blog.getEntry(5)?.body); // undefined
