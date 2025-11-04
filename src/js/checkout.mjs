import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs"


loadHeaderFooter();

checkoutProcess.init()

document.querySelector('#submit').addEventListener('click', (event) => {
    checkoutProcess.submit()
})
document.cp = checkoutProcess