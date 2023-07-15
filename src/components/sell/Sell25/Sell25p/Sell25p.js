import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../../../../contexts/AuthContext";
import products_honey25 from '../../../../images/products_honey25.jpg';

const Sell25p = () => {
  const { user, userProducts } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const newClick = (e) => {
    e.preventDefault();

    if (user.id === undefined) {
      return navigate("/login");
    };

    const img = document.querySelector('img[class="img-products-25"]').src;
    const className = document.querySelector('form[class="sell__25"]').className;
    const title = document.querySelector('h4[class="title-25"]').textContent;
    const weight = document.querySelector('p[class="weight-25"]').textContent;
    const price = document.querySelector('p[class="price-25"]').textContent;
    const quantity = document.querySelector('input[id="quantity-25"]').value;

    const data = {
      picture: img,
      className:className,
      title: title,
      weight: weight,
      price: price,
      quantity: quantity,
      _id: 3,
    }
    userProducts(data);
    // addProductToUser
    // userProducts(data);
  };
  return (
    <form className="sell__25" key={"sell__25"}>
      <img
        src={products_honey25}
        alt="honey-metal box 25"
        className="img-products-25"
      />
      <h4 className='title-25'>Пчелен мед - букет</h4>
      <p className="weight-25">25кг.</p>
      <p className="price-25">Единична цена - 200лв.</p>
      <div className="quantity">
        <label
          className="screen-reader-text"
          htmlFor="quantity_5ac7887e6a62a"
        >
          Количество
        </label>
        <input
          id="quantity-25"
          className="input-text qty text"
          step={1}
          min={1}
          max={20}
          name="quantity"
          defaultValue={1}
          title="Qty"
          // size={4}
          pattern="[0-9]*"
          inputMode="numeric"
          aria-labelledby=""
          type="number"
        />
        <span className="q_inc" />
        <span className="q_dec" />
      </div>
      <button className="button sell10" onClick={newClick}>поръчка</button>
    </form>
  );
}

export default Sell25p;