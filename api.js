const submitBtn = () => {
  const inputField = document.getElementById("input-field");
  const input = inputField.value;

  if (isNaN(input)) {
    inputField.value = "";
    const divId = document.getElementById("cardsId");
    divId.textContent = "";
    document.getElementById("input-field").style.border = "1px solid red";
    const a = document.getElementById("error");
    a.innerText = "Please give a number";
    a.appendChild(a);
    return;
  } else if (input == "") {
    alert("input empty");
  } else if (input <= 0) {
    alert("negative number");
  } else {
    document.getElementById("input-field").style.border = "1px solid gray";
    const a = document.getElementById("error");
    a.innerText = "";
    callApi(parseInt(input));
  }
  //   console.log(input);
  inputField.value = "";
};

const callApi = (inputNumber) => {
  //   console.log(inputNumber);
  fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputNumber}`)
    .then((res) => res.json())
    .then((data) => displayCards(data.cards));
};

const displayCards = (elements) => {
  const divId = document.getElementById("cardsId");
  divId.textContent = "";
  for (const element of elements) {
    // console.log(element);
    const div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.classList.add("mb-2");
    div.innerHTML = `
            <img src="${element.image}" />
            <h3>${element.suit}</h3>
            <p>${element.code}</p>
            <button onclick="seeButton('${element.code}')" type="button" class="btn btn-primary btn-sm">See Details</button>
        `;

    divId.appendChild(div);
  }
};
const seeButton = (codes) => {
  fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
    .then((res) => res.json())
    .then((data) => {
      const allCards = data.cards;
      console.log(allCards);
      const singleCard = allCards.find((card) => card.code === codes);
      console.log(singleCard);

      const divId = document.getElementById("cardsId");
      const div = document.createElement("div");
      div.classList.add("col-lg-4");
      div.classList.add("mb-2");
      divId.textContent = "";
      div.innerHTML = `
                <img src="${singleCard.image}" />
                <h3>${singleCard.suit}</h3>
                <p>${singleCard.code}</p>
  
            `;

      divId.appendChild(div);
    });
};
