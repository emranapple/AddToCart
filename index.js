import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const addBtnEl = document.getElementById("addBtn-el")
const inputEl = document.getElementById("input-el")
const shoppingListEl = document.getElementById("shopping-el")


const appSettings = {
    databaseURL: "https://addtocart-ea02a-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const dataBase = getDatabase(app)
const shoppingListInDB = ref(dataBase, "listItem")


addBtnEl.addEventListener('click', function () {
    let inputValue = inputEl.value
    push(shoppingListInDB, inputValue)
    clearInputField()

})

onValue(shoppingListInDB, function (snapshot) {

    if (snapshot.exists()) {
        let ItemArray = Object.entries(snapshot.val())
        clearShoppingList()
        for (let i = 0; i < ItemArray.length; i++) {
            let currentItem = ItemArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
            appenShoppingListToLi(currentItem)
        }

    } else{
        shoppingListEl.innerHTML = 'No items here....yet'
    }


})

// refactoring 
function clearInputField() {
    inputEl.value = ''
}

function appenShoppingListToLi(item) {
    // shoppingListEl.innerHTML += `<li>${value}</li>`
    let itemId = item[0]
    let itemValue = item[1]
    let newEl = document.createElement('li')
    newEl.textContent = itemValue
    shoppingListEl.append(newEl)
    newEl.addEventListener('click', function () {
        let exactLoactionInDB = ref(dataBase, `listItem/${itemId}`)
        remove(exactLoactionInDB)
    })

}

function clearShoppingList() {
    shoppingListEl.innerHTML = ''
}
