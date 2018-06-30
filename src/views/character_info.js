const CharacterInfo = function() {
  this.element = null;
}

CharacterInfo.prototype.displayInfo = function (characters, element) {
  element.innerHTML= " "
  this.element = element;
  characters.forEach((character) => {
    this.setName(character);
    this.setImage(character);
    this.setTitles(character);
    this.setBookAppearances(character)
  });
};


CharacterInfo.prototype.setName = function (character) {
  const characterName = document.createElement('h4');
  characterName.textContent = character.name;
  this.element.appendChild(characterName);
};

CharacterInfo.prototype.setImage = function (character) {
  if (character.imageLink) {
    const link = character.imageLink;
    const characterImage = document.createElement('img');
    characterImage.src = `https://api.got.show${link}`
    this.element.appendChild(characterImage);
  }
};

CharacterInfo.prototype.setTitles = function (character) {
  if(character.titles.length != 0) {
    const titles = document.createElement('p')
    titles.textContent = "Titles "
    this.element.appendChild(titles);
    const titleList = document.createElement("ul");
    for (title of character.titles) {
      const titlename = document.createElement("li");
      titlename.textContent = title;
      titleList.appendChild(titlename);
      this.element.appendChild(titleList);
    }
  }
};

CharacterInfo.prototype.setBookAppearances = function (character) {
  if(character.books.length != 0){
    const bookAppeareances = document.createElement('p')
    bookAppeareances.textContent = "Book appearances "
    this.element.appendChild(bookAppeareances);
    const bookList = document.createElement("ul");
    for (bookname of character.books) {
      const book = document.createElement("li");
      book.textContent = bookname;
      bookList.appendChild(book);
      this.element.appendChild(bookList);
    }
  }
};



module.exports = CharacterInfo;
