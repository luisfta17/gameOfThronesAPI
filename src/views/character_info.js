const CharacterInfo = function() {
}

CharacterInfo.prototype.displayInfo = function (characters, element) {
  element.innerHTML= " "
  characters.forEach((character) => {
    const characterName = document.createElement('h4');
    characterName.textContent = character.name;
    element.appendChild(characterName);
    if (character.imageLink) {
      const link = character.imageLink;
      const characterImage = document.createElement('img');
      characterImage.src = `https://api.got.show${link}`
      element.appendChild(characterImage);
    }
    if(character.titles.length != 0) {
      const titles = document.createElement('p')
      titles.textContent = "Titles "
      element.appendChild(titles);
      const titleList = document.createElement("ul");
      for (title of character.titles) {
        const titlename = document.createElement("li");
        titlename.textContent = title;
        titleList.appendChild(titlename);
        element.appendChild(titleList);
      }
    }
    if(character.books.length != 0){
      const bookAppeareances = document.createElement('p')
      bookAppeareances.textContent = "Book appearances "
      element.appendChild(bookAppeareances);
      const bookList = document.createElement("ul");
      for (bookname of character.books) {
        const book = document.createElement("li");
        book.textContent = bookname;
        bookList.appendChild(book);
        element.appendChild(bookList);
      }
    }
  });
};


module.exports = CharacterInfo;
