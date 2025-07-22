const dotenv = require("dotenv");
dotenv.config();

export async function addToCart(product) {
  
  try {
    const res = await fetch('/api/cart-proxy', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    if (!res.ok) {
      console.warn("Add to cart warning:", data.message);
      return null;
    }
    console.log("Product added to cart successfully:", data);
    return data;
 
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return null;
  }
}

export async function getCart(token) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // IMPORTANT !!
    });
    const data = await res.json();
    if (!res.ok) {
        console.warn("Cart fetch warning:", data.message);
        return null;
      }
    return data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}
