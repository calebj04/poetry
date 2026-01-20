let index = -1;
let lineIndex = 0; //This global variable might help you to write the displayNextLine function

let poem_html = {
  id: "poem2",
  name: "HTML Roses",
  author: "Thomas Davidson",
  verses: [
    ["Roses are red", "Violets are blue", "HTML is OG", "People love that too"],
  ],
};

let poem_css = {
  id: "poem3",
  name: "CSS Roses",
  author: "Thomas Davidson",
  verses: [
    ["Roses are red", "Violets are blue", "I love CSS", "Soon you will too"],
    [
      "Colours are tricky",
      "And many are new",
      "But CSS works its magic",
      "In every hue",
    ],
  ],
};

let poem_js = {
  id: "poem4",
  name: "JS Roses",
  author: "Thomas Davidson",
  verses: [
    [
      "Roses are red",
      "Violets are blue",
      "Next up is Javascript",
      "You'll love that too",
    ],
  ],
};

// TODO add W.J.'s poem from https://readwildness.com/30/lofton-flies and any other poems you would like to display
let poem_wj_lofton = {
  id: "poem5",
  name: "to keep the flies away",
  author: "W.J. Lofton",
  verses: [
    [
      "pennies float in bags of water, count by twos",
      "keep the flies from touching what belongs to god",
    ],
    [
      "a mother cries over what belongs to god",
      "and what her body knows belonged to her",
    ],
    [
      "anchor the night, no sun belongs to her",
      "anchor her child in red clay and brown dirt",
    ],
    [
      "boys in heaven kick up red clay and brown dirt",
      "what is the definition for hell, they ask",
    ],
    [
      "men will kiss for high water, for hell they ask",
      "death reminds love of all her questions",
    ],
    [
      "death reminds us of all our questions",
      "now sing y’all, my lord knows my name",
    ],
    [
      "now clapping, the lord jesus knows my name",
      "our names are called; he counts by twos",
    ],
  ],
};

let poem_robert_frost = {
  id: "poem6",
  name: "The Road Not Taken",
  author: "Robert Frost",
  verses: [
    [
      "Two roads diverged in a yellow wood,",
      "And sorry I could not travel both",
      "And be one traveler, long I stood",
      "And looked down one as far as I could",
      "To where it bent in the undergrowth;",
    ],
    [
      "Then took the other, as just as fair,",
      "And having perhaps the better claim,",
      "Because it was grassy and wanted wear;",
      "Though as for that the passing there",
      "Had worn them really about the same,",
    ],
    [
      "And both that morning equally lay",
      "In leaves no step had trodden black.",
      "Oh, I kept the first for another day!",
      "Yet knowing how way leads on to way,",
      "I doubted if I should ever come back.",
    ],
    [
      "I shall be telling this with a sigh",
      "Somewhere ages and ages hence:",
      "Two roads diverged in a wood, and I—",
      "I took the one less traveled by,",
      "And that has made all the difference.",
    ],
  ],
};

//TODO add the new poems to the array
let poems = [poem_html, poem_css, poem_js, poem_wj_lofton, poem_robert_frost];

// TODO edit this function so that it ONLY displays the title and author of the poem and not the full poem content
function displayPoem(poem) {
  // Update the poem element id
  document.querySelector(".poem").id = poem.id;

  // Update the title
  document.querySelector(".poem-title").textContent = poem.name;

  // Update the author
  document.querySelector(".poem-author").textContent =
    "by " + poem.author.toUpperCase();

  if (index == 4) {
    const body = document.querySelector("body");
    body.classList.add("special-body");

    const poemContent = document.querySelector(".poem");
    poemContent.classList.add("special-poem");
  } else {
    const body = document.querySelector("body");
    body.classList.remove("special-body");

    const poemContent = document.querySelector(".poem");
    poemContent.classList.remove("special-poem");
  }
}

function displayNextPoem() {
  //Update the global variable keeping track of the current poem
  index++;

  //If the index gets too big, reset it
  if (index > poems.length - 1) {
    index = 0;
  }

  //Call our first function
  displayPoem(poems[index]);

  //reset lineIndex
  lineIndex = 0;
  displayNextLine();
}

function displayNextLine() {
  //TODO write a function to display the next line of a poem
  //Pointers
  //  consider how to handle poems with multiple verses
  //  consider what to do when it's the first line of a new verse
  //  don't forget to add an event listener (in the main body of the javascript file to tie this function to your new button)
  //If the index gets too big, reset it

  let tmpVerseIndex = 0;
  let tmpLineIndex = 0;

  //Calculate current verse
  for (let i = 0; i < poems[index].verses.length; i++) {
    tmpLineIndex += poems[index].verses[i].length;
    if (lineIndex > tmpLineIndex) {
      tmpVerseIndex++;
    }
  }

  // Update the poem
  const poemContent = document.querySelector(".poem-content");

  poemContent.innerHTML = "";

  let verse = 0;
  let accLineIndex = 0;

  while (verse <= tmpVerseIndex) {
    let line = 0;
    tmpLineIndex = 0;
    const poemVerse = document.createElement("ul");
    poemVerse.classList.add("verse");

    if (index == 4) {
      poemVerse.classList.add("special-verse");
    } else {
      poemVerse.classList.remove("special-verse");
    }

    //Calculate total lines until next verse
    accLineIndex += poems[index].verses[verse].length;

    //Calcualte current line of current verse
    if (verse < tmpVerseIndex) {
      tmpLineIndex = poems[index].verses[verse].length;
    } else {
      tmpLineIndex =
        lineIndex - (accLineIndex - poems[index].verses[verse].length);
    }

    while (line < tmpLineIndex) {
      const lineElement = document.createElement("li");
      lineElement.textContent = poems[index].verses[verse][line];
      poemVerse.appendChild(lineElement);
      line++;
    }
    poemContent.appendChild(poemVerse);
    verse++;
  }

  if (lineIndex < poems[index].verses.flat().length) {
    lineIndex++;
  }
}

displayNextPoem();

//TODO add an event listener to run the displayNextPoem function when the 'display-next-poem-button' is clicked
document
  .getElementById("display-next-poem-button")
  .addEventListener("click", displayNextPoem);
document
  .getElementById("display-next-line-button")
  .addEventListener("click", displayNextLine);
