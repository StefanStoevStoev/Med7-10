export const newClick = (e) => {
    e.preventDefault();
   const title = document.querySelector('h4[class="title"]').textContent;
   const weight = document.querySelector('p[class="weight"]').textContent;
   const price = document.querySelector('p[class="price"]').textContent;
   const quantity = document.querySelector('input[id="quantity"]').value;

    const data = {
      title: title,
      weight: weight,
      price: price,
      quantity: quantity
    }

    return data;
  };