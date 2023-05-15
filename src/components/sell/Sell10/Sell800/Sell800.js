import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../../../../contexts/AuthContext";

const Sell800 = () => {
  const { user, userProducts } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const newClick = (e) => {
    e.preventDefault();

    if (user.id === undefined) {
      return navigate("/login");
    };

    const img = document.querySelector('img[class="img-products"]').src;
    const className = document.querySelector('form[class="sell__800"]').className;
    const title = document.querySelector('h4[class="title"]').textContent;
    const weight = document.querySelector('p[class="weight"]').textContent;
    const price = document.querySelector('p[class="price"]').textContent;
    const quantity = document.querySelector('input[id="quantity-8"]').value;

    const data = {
      img: img,
      className:className,
      title: title,
      weight: weight,
      price: price,
      quantity: quantity,
      _id: 1,
    }
    userProducts(data);
    // addProductToUser
    // userProducts(data);
  };
  return (
    <form className="sell__800" key={"sell__800"}>
      <img
        src="https://5.imimg.com/data5/SELLER/Default/2022/2/CM/WE/UF/1012852/decorative-glass-votive-holder-1000x1000.jpg"
        alt="honey-jar"
        className="img-products"
      />
      <h4 className='title'>Пчелен мед - букет</h4>
      <p className="weight">800g</p>
      <p className="price">Единична цена - 10лв.</p>
      <div className="quantity">
        <label
          className="screen-reader-text"
          htmlFor="quantity_5ac7887e6a62a"
        >
          Количество
        </label>
        <input
          id="quantity-8"
          className="input-text qty text"
          step={1}
          min={1}
          max={50}
          name="quantity"
          defaultValue={1}
          title="Qty"
          size={4}
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

export default Sell800;