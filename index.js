const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "PRODUCT 1",
    images: "1.PNG",
    price: 50000,
  },
  {
    id: 2,
    name: "PRODUCT 2",
    images: "2.PNG",
    price: 12000,
  },
  {
    id: 3,
    name: "PRODUCT 3",
    images: "3.PNG",
    price: 35000,
  },
  {
    id: 4,
    name: "PRODUCT 4",
    images: "4.PNG",
    price: 55000,
  },
  {
    id: 5,
    name: "PRODUCT 5",
    images: "5.PNG",
    price: 75000,
  },
  {
    id: 6,
    name: "PRODUCT 6",
    images: "6.PNG",
    price: 95000,
  },
];

let listCards = [];

const initApp = () => {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src ="images/${value.images}">
            <div class ="title">${value.name}</div>
            <div class ="price">${value.price.toLocaleString()}</div>
            <button onclick= "addToCard(${key})">Add To Card</button>
        `;
    list.appendChild(newDiv);
  });
};

initApp();

const addToCard = (key) => {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
};

const reloadCard = () => {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  listCards.forEach((value, key) => {
    if (value != null) {
      totalPrice = totalPrice + value.price;
      count = count + value.quantity;

      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
        <div><img src="images/${value.images}"></div>
        <div class="cardTitle">${value.name}</div>
        <div class="cardPrice">${value.price.toLocaleString()}</div>
        <div>
          <button onclick="Toggle()" id="bnth1" class="bntlk">
            <i class="fa-solid fa-heart"></i>
          </button>
          <button class="trashButton" onclick="removeProduct(${key})">
            <i style="color: red;" class="fa-solid fa-trash-can"></i>
          </button>
        </div>
        <div>
          <button style="background-color: goldenrod;" class="cardButton" onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
          <div class="count">${value.quantity}</div>
          <button style="background-color: goldenrod;" class="cardButton" onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
        </div>
      `;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
};

const changeQuantity = (key, quantity) => {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
};

const removeProduct = (key) => {
  if (listCards[key] != null) {
    if (listCards[key].quantity > 1) {
      listCards[key].quantity -= 1;
      listCards[key].price -= products[key].price;
    } else {
      delete listCards[key];
    }
    reloadCard();
  }
};
// recalculer le prix total
const recalculateTotal = () => {
  let totalPrice = 0;

  listCards.forEach((value, key) => {
    if (value != null) {
      totalPrice += value.price;
    }
  });

  return totalPrice;
};

const Toggle = () => {
  const likeButton = document.getElementById("bnth1");
  if (likeButton.style.color === "red") {
    likeButton.style.color = "grey";
  } else {
    likeButton.style.color = "red";
  }
};
