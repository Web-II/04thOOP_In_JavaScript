class BlogEntry {
  #date = new Date();
  #body;

  constructor(body) {
    this.#body = body;
  }
}

// ===================================================================
// Declareer klasse Blog met twee fields
// -entries: public, een array van BlogEntry's, initieel leeg
// -creator: private, de naam van de creator van de blog in te stellen
//           via de parameter van de constructor functie
// ===================================================================

// Declareer een constante 'myBlog' en ken er een nieuw
// Blog-object aan toe
// Voeg aan myBlog twee BlogEntry's aan toe, voeg nieuwe entries steeds
// vooraan in de publieke property entries toe!

// zet een breakpoint in het script en bekijk de gemaakte blog...
