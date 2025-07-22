"use server"
const dotenv = require("dotenv");
const {cookies } = require("next/headers");
dotenv.config();

export async function submitOrder (order) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        console.error("No token found in cookies");
        return;
    }
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_ORDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(order),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Order submission failed:", data.message);
      return { success: false, message: data.message };
    } else {
      console.log("Order submitted successfully:", data);
       return { success: true, ...data }
    }
  } catch (error) {
    console.error("Error during order submission:", error);
     return { success: false, message: error.message };
  }
};
export async function getOrders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    console.error("No token found in cookies");
    return;
  }
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_ORDER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      credentials: "include", // IMPORTANT !!
    });

    const data = await res.json();
    console.log("fetch the order : ", data)
    if (!res.ok) {
      console.error("Order retrieval failed:", data.message);
      return { success: false, message: data.message };
    } else {
      console.log("Orders retrieved successfully:", data);
       return data ;
    }
  } catch (error) {
    console.error("Error during order retrieval:", error);
     return { success: false, message: error.message };
  }
}