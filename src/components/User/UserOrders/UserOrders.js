import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";

const arr = [];

const UserOrders = () => {
    const { user, orderData, productDelete, userProductsEdit, arrProductsId } = useContext(AuthContext);
    const { productData, setProductData } = useState();

    function fetchProducts2(productId) {
        try {
            const res = axios.get("http://localhost:5000/api/product/get", { productId })
                // .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.log(error));
            setProductData(res);
        } catch (err) {
            toast.error(err.response);
        }
    };

    useEffect(() => {
        //   fetchProducts();
    }, []);

    console.log(arrProductsId);

    // orderData.data?.fieldCount !== 0 || 
    if (arrProductsId.length > 0) {

        // orderData.data.map(x => arrProductsId.push(x.fk_product_id));
        const pap = arrProductsId.map(x => {

            axios.post("http://localhost:5000/api/product/get", {x})
                // .then((response) => response.json())
                .then((data) => console.log(data.data))
                .catch((error) => console.log(error));

        });

    };

    // if (!arr.find(x => x._id === userProductsEdit._id) && userProductsEdit.length !== 0) {
    //     arr.push(userProductsEdit);
    // };


    return (
        <>
            {userProductsEdit.id && user.id && arr.length > 0 ? arr.map(x =>
                < form className="sell__10 sell-10" key={x.id + x.weight}
                    name={`${x.id} + ${x.weight}`} >
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