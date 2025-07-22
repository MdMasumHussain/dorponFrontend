"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Image from "next/image";

const paymentOptions = [
  { value: "bkash", label: "bKash", logo: "/logos/bkash.png" },
  { value: "nagad", label: "Nagad", logo: "/logos/nagad.png" },
  { value: "rocket", label: "Rocket", logo: "/logos/rocket.png" },
  { value: "islami", label: "Islami Bank Card", logo: "/logos/islami.png" },
  { value: "dbbl", label: "Dutch-Bangla Bank Card", logo: "/logos/dbbl.png" },
  { value: "credit", label: "Credit Card", logo: "/logos/credit.png" },
  { value: "master", label: "MasterCard", logo: "/logos/mastercard.png" },
  { value: "cash", label: "Cash on Delivery", logo: "/logos/cash.png" },
];

export default function PaymentModal({ isOpen, setIsOpen, onPaymentConfirm }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");

  const handleConfirm = () => {
    if (!paymentMethod) return alert("Please select a payment method.");
    if (!paymentDetails) return alert("Enter payment info to continue.");

    onPaymentConfirm({ method: paymentMethod, details: paymentDetails });
    setIsOpen(false);
    setPaymentDetails("");
    setPaymentMethod("");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
          <Dialog.Title className="text-xl font-semibold mb-4 text-center">
            Select Payment Method
          </Dialog.Title>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {paymentOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center space-x-3 p-2 border rounded cursor-pointer hover:border-indigo-500 ${
                  paymentMethod === option.value
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={option.value}
                  checked={paymentMethod === option.value}
                  onChange={() => setPaymentMethod(option.value)}
                  className="hidden"
                />
                <Image
                  src={option.logo}
                  alt={option.label}
                  width={32}
                  height={32}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          {paymentMethod && (
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {paymentMethod === "cash"
                  ? "No info needed for Cash on Delivery"
                  : "Enter Payment Details"}
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder={
                  paymentMethod === "bkash"
                    ? "bKash Transaction ID"
                    : paymentMethod === "nagad"
                    ? "Nagad Transaction ID"
                    : paymentMethod.includes("card")
                    ? "Card Number"
                    : "Payment Reference"
                }
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
              />
            </div>
          )}

          <button
            onClick={handleConfirm}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded mt-2"
          >
            Confirm Payment
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
