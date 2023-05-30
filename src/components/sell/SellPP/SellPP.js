import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../../../contexts/AuthContext";

const SellPP = () => {
  const { user, userProducts } = useContext(AuthContext);
  const navigate = useNavigate();

  const newClick = (e) => {
    e.preventDefault();

    if (user.id === undefined) {
      return navigate("/login");
    };
    
    const img = document.querySelector('img[class="img-products-50"]').src;
    const className = document.querySelector('form[class="sell__p-p"]').className;
    const title = document.querySelector('h4[class="title-50"]').textContent;
    const weight = document.querySelector('p[class="weight-50"]').textContent;
    const price = document.querySelector('p[class="price-50"]').textContent;
    const quantity = document.querySelector('input[id="quantity-50"]').value;

    const data = {
      img: img,
      className: className,
      title: title,
      weight: weight,
      price: price,
      quantity: quantity,
      _id: 5,
    }
    userProducts(data);
    // addProductToUser
    // userProducts(data);
  };
    return (
        <form className="sell__p-p" key={"sell__p-p"}>
          <div className="sell__pp">
            <img
              src="https://m.az-jenata.bg/media/az-jenata/files/articles/448x336/ed3dbee27db41f51f61d93816cb628d4.jpg"
              alt="propolis"
              className="img-products-50"
            />
            <h4 className='title-50'>Прополис</h4>
            <p className="weight-50">50g</p>
            <p className="price-50">Единична цена - 10лв.</p>
            <div className="quantity">
              <label
                className="screen-reader-text"
                htmlFor="quantity_5ac7887e6a62a"
              >
                Количество
              </label>
              <input
                id="quantity-50"
                className="input-text qty text"
                step={1}
                min={1}
                max={20}
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
          </div>
      </form>
    );
}

export default SellPP;