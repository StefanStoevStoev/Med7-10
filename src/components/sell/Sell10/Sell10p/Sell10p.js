import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../../../../contexts/AuthContext";
import products_honey10 from '../../../../images/products_honey10.jpg';

const Sell10p = () => {
  const { user, userProducts } = useContext(AuthContext);
  const navigate = useNavigate();

  const newClick = (e) => {
    e.preventDefault();
    if (user.id === undefined) {
      return navigate("/login");
    };

    const img = document.querySelector('img[class="img-products-10"]').src;
    const className = document.querySelector('form[class="sell__10"]').className;
    const title = document.querySelector('h4[class="title-10"]').textContent;
    const weight = document.querySelector('p[class="weight-10"]').textContent;
    const price = document.querySelector('p[class="price-10"]').textContent;
    const quantity = document.querySelector('input[id="quantity-10"]').value;

    const data = {
      picture: img,
      className: className,
      title: title,
      weight: weight,
      price: price,
      quantity: quantity,
      _id: 2,
    }
    userProducts(data);
  };

  return (
    <form className="sell__10" key={'sell__10'} >
      <img
        src={products_honey10}
        className="img-products-10"
        alt="honey-metal box"
      />
      <h4 className='title-10' >Пчелен мед - букет</h4>
      <p className="weight-10">10кг.</p>
      <p className="price-10">Единична цена - 90лв.</p>
      <div className="quantity">
        <label
          className="screen-reader-text"
          htmlFor="quantity_5ac7887e6a62a"
        >
          Количество
        </label>
        <input
          id="quantity-10"
          className="input-text qty text"
          // step={1}
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

export default Sell10p;