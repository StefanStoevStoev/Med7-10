import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../../../../contexts/AuthContext";

const Sell100 = () => {
  const { user, userProducts } = useContext(AuthContext);
  const navigate = useNavigate();

  const newClick = (e) => {
    e.preventDefault();

    if (user.id === undefined) {
      return navigate("/login");
    };
    
    const img = document.querySelector('img[class="img-products-100"]').src;
    const className = document.querySelector('form[class="sell__10"]').className;
    const title = document.querySelector('h4[class="title-100"]').textContent;
    const weight = document.querySelector('p[class="weight-100"]').textContent;
    const price = document.querySelector('p[class="price-100"]').textContent;
    const quantity = document.querySelector('input[id="quantity-100"]').value;

    const data = {
      img: img,
      className:className,
      title: title,
      weight: weight,
      price: price,
      quantity: quantity,
      _id: 4,
    }
    userProducts(data);
    // addProductToUser
    // userProducts(data);
  };
  return (
    <form className="sell__100"  key={'sell__100'}>
      <img
        src="https://southbayapiaries.com/wp-content/uploads/2022/01/pollen_104723465.jpg"
        alt="pollen"
        className="img-products-100"
      />
      <h4 className='title-100'>Пчелен прашец</h4>
      <p className="weight-100">100g</p>
      <p className="price-100">Единична цена - 15лв.</p>
      <div className="quantity">
        <label
          className="screen-reader-text"
          htmlFor="quantity_5ac7887e6a62a"
        >
          Количество
        </label>
        <input
          id="quantity-100"
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

export default Sell100;