"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function CartPage({ productData }) {
  console.log("Product Data:", productData); // Log the product data to the console
  const [quantities, setQuantities] = useState(
    productData.map((product) => product.quantity || 1)
  );
  const [selectedItems, setSelectedItems] = useState(
    productData.map(() => true)
  );
  const handleSelectedItems = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
  };

  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const increase = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
    setIsCartUpdated(true);
  };

  const decrease = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(1, newQuantities[index] - 1);
    setQuantities(newQuantities);
    setIsCartUpdated(true); // Set the flag to true when quantity decreases
  };

  const handleInputChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(1, parseInt(value) || 1);
    setQuantities(newQuantities);
    setIsCartUpdated(true); // Set the flag to true when input changes
  };
  const handleCartUpdate = () => {
    // Cart update logic (API call, total update, etc.)
    console.log("Cart updated with:", quantities);
    setIsCartUpdated(false); // Hide button again
  };

  const totalPrice = productData.reduce((total, product, index) => {
    if (selectedItems[index]) {
      return total + product.price * quantities[index];
    }
    return total;
  }, 0);
  const shippingCost = totalPrice > 0 ? 4.99 : 0; // Example shipping cost
  const subtotal = totalPrice + shippingCost;
  console.log("Subtotal:", subtotal); // Log the subtotal to the console
  console.log("Total Price:", totalPrice); // Log the total price to the console

  const router = useRouter();

  const handleCheckout = () => {
    const selectedProducts = productData
      .map((product, index) => {
        if (selectedItems[index]) {
          return { ...product, quantity: quantities[index] };
        }
        return null;
      })
      .filter(Boolean);

    localStorage.setItem("checkoutItems", JSON.stringify(selectedProducts));
    console.log("Selected Products:", selectedProducts); // Log the selected products to the console

    router.push("/pages/checkout");
  };

  return (
    <>
      <style jsx>
        {`
          @layer utilities {
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }
        `}
      </style>

      <div className="min-h-screen bg-base-200 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {/* product start */}

            {productData && productData.length > 0 ? (
              productData.map((product, index) => {
                const productTotal = product.price * quantities[index];
                return (
                  <div
                    key={product.productId}
                    className="justify-between mb-6 rounded-lg bg-base-100 p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <Image
                      width={400}
                      height={70}
                      src={product.images[0]}
                      alt={product.name}
                      unoptimized
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-base-content">
                          {product.name}
                        </h2>
                        <p className="mt-1 text-xs text-base-content">
                          36EU - 4US
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <button
                            onClick={() => decrease(index)}
                            className=" w-12 text-xl text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            value={quantities[index]}
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                            className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                          <button
                            onClick={() => increase(index)}
                            className=" w-12 text-xl text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            +
                          </button>
                          <div className="mt-4 ml-auto sm:mt-0">
                            <input
                              className="w-4 h-4 cursor-pointer"
                              type="checkbox"
                              checked={selectedItems[index]}
                              onChange={() => handleSelectedItems(index)}
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <p className="text-sm">
                            Unit Price : Tk. {product.price}
                          </p>
                          <p className="text-sm">
                            Total : Tk. {productTotal.toFixed(2)}
                          </p>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 text-red-500">
                <h1 className="text-2xl">Your cart is empty.</h1>
                <p className="mt-2">
                  Start adding some products to see them here.
                </p>
                <Link href="/">
                  <button className="mt-6 w-full cursor-pointer rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:shadow-blue-600/50 shadow-lg hover:bg-blue-600">
                    Go to Products
                  </button>
                </Link>
              </div>
            )}
          {/* product end */}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-base-100 p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-base-content">Subtotal</p>
              <p className="text-base-content">Tk. {subtotal?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-base-content">Shipping</p>
              <p className="text-base-content">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  Tk. {totalPrice.toFixed(2)} Taka
                </p>
                <p className="text-sm text-base-content">including VAT</p>
              </div>
            </div>

            {isCartUpdated ? (
              <button
                onClick={handleCartUpdate}
                className="mt-6 w-full cursor-pointer rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:shadow-blue-600/50 shadow-lg hover:bg-blue-600"
              >
                Update Cart
              </button>
            ) : (
              <button
                onClick={handleCheckout}
                className="mt-6 w-full cursor-pointer rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:shadow-blue-600/50 shadow-lg hover:bg-blue-600"
              >
                Check out
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
