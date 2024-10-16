import { menuArray } from './data.js'

function getMenuHtml() {
    
    return menuArray.map((menuItems) => {  

        const { name, ingredients, price, emoji, id } = menuItems


        const menuIngredients = ingredients.reduce((total, current) => total + ', ' + current)
        return `
            <section >
                <div class="menu">
                    <div>
                        <img class="emoji" alt="${name}" src="/images/${emoji}">
                    </div>
                    <div class="additional-menu-details">
                        <h1 class="name" data-name=${id}>${name}</h1>
                        <p class="ingredients">${menuIngredients}</p>
                        <h2 class="price" data-price=${id}>$${price}</h2>
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
    }
})

function handleClickOrderHtml (menuId) {
     const targetMenuItem = menuArray.find(menuItem => menuItem.id === parseInt(menuId, 10))
     console.log(targetMenuItem)

     if (targetMenuItem) {
        const { name, price } = targetMenuItem

        document.getElementById('order-summary').innerHTML = `
            <div class="order-details">
                <h1 class="order">Your Order</h1>
                <div class="name-price">
                    <p>${name}</p>
                    <p class="order-price">$${price}</p>
                </div>
                <hr/>
                <p class="total">Total Price:</p>
                <button class="complete-button">Complete Order</button>
            </div>`
     } else {
        console.log('Menu item not found.')
     }
}

function render() {
    
    document.getElementById('container').innerHTML = getMenuHtml()
}

render()