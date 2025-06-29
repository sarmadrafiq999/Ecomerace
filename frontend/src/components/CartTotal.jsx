import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";

const CartTotal = () => {
  const { delivery_fee, currency, totalAmountCart } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Tittle text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className=" flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between ">
          <p>SubTotal</p>
          <p>
            {currency}
            {totalAmountCart()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee}
          </p>
        </div>
        <hr />
        <div className="flex justify-between ">
          <b>Total</b>
          <b>
            {currency}
            {totalAmountCart() === 0 ? 0 : totalAmountCart() + delivery_fee}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
