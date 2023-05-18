import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";

const arr = [];

const UserOrders = () => {
    const { user, orderData, productDelete, userProductsEdit } = useContext(AuthContext);
    const { productData, setProductData } = useState();
    let arrProductsId = [];

    // function fetchProducts(productId) {
    //     try {
    //         const res = axios.post("http://localhost:5000/api/product/get", { productId })
    //         setProductData(res);
    //     } catch (err) {
    //         toast.error(err.response);
    //     }
    // };

    useEffect(() => {
        //   fetchProducts();
    }, []);

    console.log(orderData.data);
    // fetchProducts(1);
    // orderData.data?.fieldCount !== 0 ||
    if ( orderData.data.length > 0) {
        // console.log(orderData.data);
        // console.log(orderData.data[0]);

console.log(1);
        orderData.data.map(x => arrProductsId.push(x.fk_product_id));
        arrProductsId.map(x => {


            const fetchProducts = async () => {
                try {
                    const res = await axios.post("http://localhost:5000/api/product/get", { x })
                    // setProductData(res);
                    console.log(res);
                } catch (err) {
                    toast.error(err.response);
                }
            }
            // console.log(fetchProducts(x))

        });
        // fetchProducts(1);
        // orderData.data.map(x => {
        //   // console.log(orderData);
        //   arrProductsId.push(x.fk_product_id);
        // });
    }

    // console.log(user.id);



    if (!arr.find(x => x._id === userProductsEdit._id) && userProductsEdit.length !== 0) {
        arr.push(userProductsEdit);
    };


    return (
        <>
            {userProductsEdit._id && user.id && arr.length > 0 ? arr.map(x =>
                < form className="sell__10 sell-10" key={x._id + x.weight}
                    name={`${x._id} + ${x.weight}`} >
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