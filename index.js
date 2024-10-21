import { menuArray } from './data.js'

let orderItems = []
let isFormDisplayed = false

function getMenuHtml() {
    
    return menuArray.map((menuItems) => {  

        const { name, ingredients, price, emoji, id } = menuItems

        const menuIngredients = ingredients.reduce((total, current) => total + ', ' + current)
        return `
            <section >
                <div class="menu">
                    <div class="image-menu">
                        <div>
                            <img class="emoji" alt="${name}" src="/images/${emoji}">
                        </div>
                        <div class="additional-menu-details">
                            <h1 class="name" data-name=${id}>${name}</h1>
                            <p class="ingredients">${menuIngredients}</p>
                            <h2 class="price" data-price=${id}>$${price}</h2>
                        </div>
                    </div>
                    <div>
                        <button class="menu-button" data-id="${id}">+</button>
                    </div>
                </div>
                <hr/>                            
            </section>`
    }).join(' ')

}

document.addEventListener('click', function(e) {
    if(e.target.classList.contains('menu-button')) {
        handleClickOrderHtml(e.target.dataset.id)
    } else if(e.target.classList.contains('remove-button')) {
        handleRemoverOrderHtml(e.target.dataset.id)
    } else if (e.target && e.target.id === ('complete-button')) {
        if(!isFormDisplayed) {
            showForm()
            isFormDisplayed = true
        }
    } else if (e.target && e.target.id === 'pay') {
        e.preventDefault()
        handleClickPayHtml()
    }
})

function handleClickOrderHtml (menuId) {
    

     const targetMenuItem = menuArray.find(menuItem => menuItem.id === parseInt(menuId, 10))
     console.log(targetMenuItem)


     if (targetMenuItem) {
        const { name, price, id } = targetMenuItem

        orderItems.push({id, price})

        const totalPrice = orderItems.reduce((total, item) => total + item.price, 0)

        document.getElementById('order').innerHTML = `<h1 class="order"> Your Order </h1>`

        document.getElementById('order-summary').innerHTML += `
                <div class="name-price" id="order-item-${id}">
                    <div class="name-remove">
                        <p>${name}</p>
                        <button class="remove-button" data-id="${id}">remove</button>
                    </div>
                    <p class="order-price">$${price}</p>
                </div>
            </div>`

        document.getElementById('total-price').innerHTML = `
            <hr class="hr-bold"/>
            <p class="total">Total Price: <span class="total-price"> $${totalPrice} </span></p>
            <button id="complete-button" type="submit" class="complete-button" >Complete Order</button>
            `
     } else {
        console.log('Menu item not found.')
     }
}

function handleRemoverOrderHtml(menuId) {

    // Find the index of the item to remove
    const itemIndex = orderItems.findIndex(orderItem => orderItem.id === parseInt(menuId, 10))

    if (itemIndex !== -1) {

        // Remove the item from the orderItems array
        orderItems.splice(itemIndex, 1)

        // Remove the corresponding element from the DOM
        document.getElementById(`order-item-${menuId}`).remove()

        // Recalculate the total price
        const totalPrice = orderItems.reduce((total, item) => total + item.price, 0)

         // Update the total price in the DOM
         document.getElementById(`total-price`).innerHTML =`
            <hr/>
            <p class="total">Total Price: <span class="total-price"> $${totalPrice} </span></p>
            <button id="complete-button" class="complete-button" type="submit">Complete Order</button>
         `

    }
}

function showForm () {
    const formContainer = document.getElementById('form-container')

    formContainer.innerHTML = `
        <form class="payment-form">
            <div class="payment-details">
                <h1 class="payment-title">Enter card details</h1>
                <div class="payment-details">
                    <input class="input-field" type="text" id="name" name="name" placeholder="Enter your name" required/>
                    <input class="input-field" type="number" id="cardnumber" name="cardnumber" placeholder="Enter card number" required/>
                    <input class="input-field" type="number" id="cvv" name="cvv" placeholder="Enter CVV" required/>
                    <button id="pay" type="button" class="pay">Pay</button>
            </div>
            </div>
        </form>`
}

function handleClickPayHtml () {
    const form = document.getElementById('form-container')

     // Ensure all form fields are filled
    const name = document.getElementById('name').value
    const cardnumber = document.getElementById('cardnumber').value
    const cvv = document.getElementById('cvv').value

    if (!name || !cardnumber || !cvv) {
        alert ('Please fill out all fields.')
        return
    }

    const order = {
        name: name,
        cardnumber: cardnumber,
        cvv : cvv
    }

    console.log('Order processed:', order)

    form.innerHTML = `
            <div class="confirmation-message" >
              <p>Thanks, ${name}! Your order is on the way! </p>
            </div`

    // Reset order summary and total price
    document.getElementById('order-summary').innerHTML = ''
    document.getElementById('total-price').innerHTML = ''

}

function render() {
    document.getElementById('container').innerHTML = getMenuHtml()
}

render()