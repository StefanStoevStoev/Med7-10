import { useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext";

const papa = [];

const UserOrders = () => {
    const { productDelete, userProductsEdit } = useContext(AuthContext);

    if (!papa.find(x => x._id === userProductsEdit._id)) {
        papa.push(userProductsEdit);

    };

    return (
        <>
            {papa.length > 0 ? papa.map(x =>

                < form className="sell__10 sell-10" key={x._id} name={x._id} >
                    <img
                        src={x.img}
                        alt="honey-metal box"
                    />
                    <h4 className='title' >{x.title}</h4>
                    <p className="weight">{x.weight}</p>
                    <p className="price">{x.price}</p>
                    <div className="quantity">
                        <label
                            className="screen-reader-text"
                            htmlFor="quantity_5ac7887e6a62a"
                        >
                            Количество
                        </label>
                        <input
                            id="quantity"
                            className="input-text qty text"
                            step={1}
                            min={1}
                            max={20}
                            name="quantity"
                            defaultValue={x.quantity}
                            title="Qty"
                            // size={4}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            aria-labelledby=""
                            type="number"
                        />
                    </div>
                    <button
                        className="button sell10">поръчка
                    </button>
                    <button className="btn-delete delete" onClick={productDelete}>отказвам</button>
                </form >
            )
                : ''}
        </>
    );
}

export default UserOrders;