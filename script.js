document.addEventListener("DOMContentLoaded", function () {

  const gameboard = document.getElementById("gameboard");
  const resetBtn = document.getElementById("reset");

  const MATCH_COUNT = 4;

  let symbols = [
    'images/apple.png',
    'images/banana.jpg',
    'images/grapes.jpg',
    'images/mango.jpg',
    'images/guava.avif'
  ];
  symbols = [...symbols, ...symbols, ...symbols, ...symbols];

  let selectedCards = [];
  let isChecking = false;

  // Shuffle helper
  const shuffle = () => symbols.sort(() => Math.random() - 0.5);

  // Preview cards
  const previewCards = () => {
    isChecking = true;
    const allCards = document.querySelectorAll(".card");

    allCards.forEach(card => {
      card.style.backgroundImage = `url(${card.dataset.symbols})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';
      card.innerText = '';
      card.classList.add("flipped");
    });

    setTimeout(() => {
      allCards.forEach(card => {
        card.innerText = "?";
        card.style.backgroundImage = '';
        card.classList.remove("flipped");
      });
      isChecking = false;
    }, 1500);
  };

  // Win check
  const checkWin = () => {
    const allCards = document.querySelectorAll(".card");
    const matchedCards = document.querySelectorAll(".card.matched");

    if (allCards.length === matchedCards.length) {
      setTimeout(() => alert("YOU WIN!"), 300);
    }
  };

  // Match check
  const checkMatch = () => {
    const symbolsMatch = selectedCards.every(
      card => card.dataset.symbols === selectedCards[0].dataset.symbols
    );

    if (symbolsMatch) {
      selectedCards.forEach(card => card.classList.add("matched"));
      selectedCards = [];
      isChecking = false;
      checkWin();
    } else {
      setTimeout(() => {
        selectedCards.forEach(card => {
          card.innerText = "?";
          card.style.backgroundImage = '';
          card.classList.remove("flipped");
        });
        selectedCards = [];
        isChecking = false;
      }, 600);
    }
  };

  // Create cards
  shuffle();

  symbols.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerText = "?";
    card.dataset.symbols = symbol;

    card.addEventListener("click", () => {
      if (isChecking) return;
      if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

      card.style.backgroundImage = `url(${card.dataset.symbols})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';
      card.innerText = '';
      card.classList.add("flipped");
      selectedCards.push(card);

      if (selectedCards.length === MATCH_COUNT) {
        isChecking = true;
        checkMatch();
      }
    });

    gameboard.appendChild(card);
  });

  // Initial preview
  previewCards();

  // Reset game
  resetBtn.addEventListener("click", () => {
    isChecking = true;
    selectedCards = [];
    shuffle();

    const allCards = document.querySelectorAll(".card");

    allCards.forEach((card, index) => {
      card.innerText = "?";
      card.style.backgroundImage = '';
      card.classList.remove("flipped", "matched");
      card.dataset.symbols = symbols[index];
    });

    previewCards();
  });

});