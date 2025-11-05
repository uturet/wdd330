import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const checkoutProcess = {
    url: "http://server-nodejs.cit.byui.edu:3000/checkout",
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
    this.orderTotal = 0
    this.shipping = this.list.length ? (2 * this.list.length) + 8 : 0
    this.list.forEach((item) => {
        const p = Number(item.FinalPrice)
        this.tax += p * 0.06
        this.itemTotal += p
    })
    this.tax = this.tax
    this.orderTotal = this.tax + this.shipping + this.itemTotal
    
    // display the totals.
    this.displayOrderTotals();
  },

  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    document.querySelector('#itemCount').innerText = `$${this.list.length}`
    document.querySelector('#itemTotal').innerText = `$${this.itemTotal.toFixed(2)}`
    document.querySelector('#shipping').innerText = `$${this.shipping.toFixed(2)}`
    document.querySelector('#tax').innerText = `$${this.tax.toFixed(2)}`
    document.querySelector('#orderTotal').innerText = `$${this.orderTotal.toFixed(2)}`
  },

  getPayload: function() {
    return {
      orderDate: new Date().toISOString(),
      fname: document.querySelector('#firstName').value,
      lname: document.querySelector('#lastName').value,
      street: document.querySelector('#street').value,
      city: document.querySelector('#city').value,
      state: document.querySelector('#state').value,
      zip: document.querySelector('#zip').value,
      cardNumber: document.querySelector('#card').value,
      expiration: document.querySelector('#exp').value,
      code: document.querySelector('#cvc').value,
      items: this.list.map(item => ({
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: 1
      })),
      orderTotal: this.orderTotal,
      shipping: this.shipping,
      tax: this.tax,
    }
  },

  submit: function() {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.getPayload())
      }
    fetch(this.url, options).then(res => {
      return res.json()
    }).then(body => {
      let message = body.message || ""
      if (!message) {
        for (const key in body) {
          message += `${body[key]}\n`;
        }
      }
      document.querySelector('#resMessage').innerText = message
      
    }).catch(error => {
      console.error('Fetch failed:', error);
    });
  }
}

export default checkoutProcess;