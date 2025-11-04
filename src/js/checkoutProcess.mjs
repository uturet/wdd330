import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const checkoutProcess = {
    key: "so-cart",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function () {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSummary();
        this.calculateOrdertotal()
    },

  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items. ????????????
    
  },

  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    
    this.tax = 0
    this.itemTotal = 0
    this.shipping = this.list.length ? (2 * this.list.length) + 8 : 0
    this.list.forEach((item) => {
        this.tax += item.FinalPrice * 0.06
        this.itemTotal += item.FinalPrice
    })
    this.tax = this.tax.toFixed(2)
    this.orderTotal = this.tax + this.shipping + 
    
    // display the totals.
    this.displayOrderTotals();
  },

  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    document.querySelector('#itemCount').innerText = `$${this.list.length}`
    document.querySelector('#itemTotal').innerText = `$${this.itemTotal}`
    document.querySelector('#shipping').innerText = `$${this.shipping}`
    document.querySelector('#tax').innerText = `$${this.tax}`
    document.querySelector('#orderTotal').innerText = `$${this.orderTotal}`
  },

  submit: function() {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    fetch(url, options);
  }
}
export default checkoutProcess;