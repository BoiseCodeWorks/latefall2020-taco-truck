// NOTE
// things we need
// menu with some items
// cart or order up area
// buy function
// draw menu function
// draw order function
// eat function

let menu = {
  tacos: {
    title: "Tacos",
    ingredients: "Tortilla, meat, cheese",
    vegan: false,
    price: "$5.00",
    time: 4
  },
  burrito: {
    title: "Burrito",
    ingredients: "Tortilla, meat, cheese",
    vegan: false,
    price: "$7.00",
    time: 7
  },
  churro: {
    title: "Churro",
    ingredients: "cinnamon, sugar, delciousness",
    vegan: true,
    price: "$1.00",
    time: 1
  },
  enchilada: {
    title: "Enchilada",
    ingredients: 'Tortilla, "meat", "cheeze"',
    vegan: true,
    price: "$12.00",
    time: 2
  }
}


let cart = []

// NOTE
// take each menu item and create a col or card for it and add it into our menu items row.
// take the properties of each menu item and format them into a col
// i need to have access to the menu obj(done) and the row element to add them to
function drawMenu() {
  let template = ""
  let menuItemsElem = document.getElementById("menu-items")
  for (const key in menu) {
    if (menu.hasOwnProperty(key)) {
      const menuItem = menu[key];
      template += /* html */`
      <div class="col-3 shadow-lg border rounded">
        <h1>${menuItem.title}</h1>
        <p>${menuItem.ingredients}</p>
        `
      if (menuItem.vegan) {
        template += '<h5>"Vegan"</h5>'
      } else {
        template += '<h5>"NOT Vegan"</h5>'
      }
      template +=/* html */ `
        <h5>${menuItem.price}</h5>
        <button class="btn btn-success btn-block" onclick="buy('${key}')">Buy</button>
      </div>
      `
      // NOTE this is the same, using a ternary instead for vegan
      // template += /* html */`
      // <div class="col-3">
      //   <h1>${menuItem.title}</h1>
      //   <p>${menuItem.ingredients}</p>
      //   <h5>${menuItem.vegan ? "Vegan" : "NOT Vegan"}</h5>
      //   <h5>${menuItem.price}</h5>
      //   <button>Order</button>
      // </div>
      // `
    }
  }
  menuItemsElem.innerHTML = template
}

//  NOTE
// draw items from our cart into cols and add them into the ordered items row
function drawCart() {
  let template = ""
  cart.forEach((item, index) => {
    template +=/*html*/`
    <div class="col-3">
       <h1>${item.title}</h1>
       <p>${item.ingredients}</p>
       <h5>${item.vegan ? "Vegan" : "NOT Vegan"}</h5>
       <h5>${item.price}</h5>
       <button class="btn btn-warning" onclick="eat(${index})">Eat</button>
     </div>
    `
  })
  document.getElementById("cart").innerHTML = template
  toggleButtons()

}

function eat(itemIndex) {
  cart.splice(itemIndex, 1)
  drawCart()
}


function buy(menuItemKey) {
  let menuItem = menu[menuItemKey]
  cart.push(menuItem)
  toggleButtons(true)

  // NOTE timeout works like setInterval but only calls the handler function(drawCart) once
  setTimeout(drawCart, menuItem.time * 1000)
}


function toggleButtons(isDisabled = false) {
  let buttons = document.getElementsByTagName("button")
  for (let index = 0; index < buttons.length; index++) {
    const btn = buttons[index];
    btn.disabled = isDisabled
  }
}

drawMenu()
drawCart()