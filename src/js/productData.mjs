async function convertToJson(res) {
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category = "tents") {
  const res = await fetch(`../json/${category}.json`);
  const data = convertToJson(res)
  return data
}

export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}
