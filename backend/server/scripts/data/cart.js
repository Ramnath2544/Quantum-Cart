const API = "http://localhost:4000";

export async function loadCartFetch() {
  try {
    const response = await fetch(`${API}/cart`);
    if (!response.ok) throw new Error("Failed to load cart");
    return await response.json();
  } catch (error) {
    console.error("Error loading cart:", error);
    throw error;
  }
}

export async function addToCartFetch(
  productId,
  quantity = 1,
  deliveryOptionId = "1"
) {
  try {
    const response = await fetch(`${API}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity, deliveryOptionId }),
    });
    if (!response.ok) throw new Error("Failed to add to cart");
    return await response.json();
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}
