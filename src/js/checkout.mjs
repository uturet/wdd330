import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs"


loadHeaderFooter();

checkoutProcess.init()

document.querySelector('#submit').addEventListener('click', (event) => {
    event.preventDefault()
    checkoutProcess.submit()
})
document.cp = checkoutProcess
document.querySelectorAll('input').forEach(inputEl => {
    inputEl.addEventListener('input', (event) => {
        if (inputEl.value === "") {
            inputEl.classList.remove('invalid')
        } else {
            inputEl.value.match(inputEl.dataset.pattern) ? inputEl.classList.remove('invalid') : inputEl.classList.add('invalid')
        }
    })
})