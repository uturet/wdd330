// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// From Team Assignment 2: Returns URL Parameter
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //why does 'product' work here and not 'param'?
  const product = urlParams.get('product')  
  return product;
}


export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
  const template = await templateFn();
  
  if (clear) {
    parentElement.innerHTML = "";
  } 

  parentElement.insertAdjacentHTML(position, template);

  if(callback) {
    callback(data);
  }
};


export function loadTemplate(path) {
  return async function() {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}


export async function loadHeaderFooter(){
  const headTemplateFn = loadTemplate("/partials/head.html");
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  
  const headElement = document.querySelector("#default-head");
  const headerElement = document.querySelector("#default-header");
  const footerElement = document.querySelector("#default-footer");
  
  await renderWithTemplate(headTemplateFn, headElement);
  await renderWithTemplate(headerTemplateFn, headerElement);
  await renderWithTemplate(footerTemplateFn, footerElement);
}



// renderList(list, el) {
//     const htmlStrings =  list.map(productCardTemplate);
//     el.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
// }


export function renderListTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
};

