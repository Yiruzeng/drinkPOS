const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
const orderLists = document.querySelector('[data-order-lists]')
const checkoutButton = document.querySelector('[data-alpha-pos="checkout"')
const alphaPos = new AlphaPos()

addDrinkButton.addEventListener('click', function () {
  // 1. 取得店員選擇的飲料品項、甜度和冰塊
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')
  // console.log(`${drinkName}, ${ice}, ${sugar}`)

  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert('please choose at least one items')
    return
  }
  // 3. 建立飲料實例，並取得飲料價格
  const drink = new Drink(drinkName, sugar, ice)
  console.log(drink)
  console.log(drink.price())
  // 4. 將飲料實例產生成左側訂單區的畫面
  AlphaPos.prototype.addDrink = function (drink) {
    let orderListCard = `
  <div class="card mb-3">
          <div class="card-body pt-3 pr-3">
            <!-- delete drink icon -->
            <div class="text-right">
              <span data-alpha-pos="delete-drink">x</span>
            </div>

            <h6 class="card-title mb-1">${drink.name}</h6>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
          </div >
      <div class="card-footer text-right py-2">
        <div class="card-text text-muted">
          $<span data-drink-price>${drink.price()}</span></div>
      </div>
        </div >
      `
    orderLists.insertAdjacentHTML('afterbegin', orderListCard)
  }
  alphaPos.addDrink(drink)

})


// delete card
orderLists.addEventListener('click', function (event) {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeleteButton) {
    return
  }
  // delete the card element
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

//DeleteDrink contructor
AlphaPos.prototype.deleteDrink = function (target) {
  target.remove()
}




checkoutButton.addEventListener('click', function () {
  // 1. 計算訂單總金額
  alert(`Total amout of drink: $${alphaPos.checkout()}`)
  // 2. 清空訂單
  alphaPos.clearOrder(orderLists)
})

// Constructor function for Alpha Pos System
function AlphaPos() { }

AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name = ${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}

AlphaPos.prototype.checkout = function () {
  let totalAmout = 0
  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    totalAmout += Number(drink.textContent)
  })
  return totalAmout
}

AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(function (card) {
    card.remove()
  })
}

// Constructor function for Drinks
function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}

