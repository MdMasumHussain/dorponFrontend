"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { addProduct } from "../../app/lib/products";

export default function AddProductModal() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    images: [],
    category: "",
    description: "",
    features: [],
    colors: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Product:", formData);
    try {
      const response = await addProduct(formData);
      if (!response) {
        console.log("Product added successfully:", response);
        // Optionally, you can reset the form or close the modal here
        setFormData({
          name: "",
          price: "",
          oldPrice: "",
          images: [],
          category: "",
          description: "",
          features: [],
          colors: [],
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }

    // TODO: send data to backend
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <div className="card h-85 items-center justify-center transform motion-reduce:transform-fill hover:-translate-y-1 hover:scale-108 transition ease-in-out duration-300 bg-base-100 w-50 shadow-lg hover:shadow-cyan-500/50 shadow-cyan-500/20 mt-10">
          <IoMdAdd />
          <h3>Add Product</h3>
        </div>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Old Price"
                value={formData.oldPrice}
                onChange={(e) =>
                  setFormData({ ...formData, oldPrice: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Image URLs (comma separated)"
                value={formData.images.join(",")}
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    images: e.target.value.split(",").map((item) => item.trim()),
                  })
                }
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="Features (comma separated)"
                value={formData.features.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    features: e.target.value
                      .split(",")
                      .map((item) => item.trim()),
                  })
                }
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="Colors (comma separated)"
                value={formData.colors.join(",")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    colors: e.target.value
                      .split(",")
                      .map((item) => item.trim()),
                  })
                }
                className="w-full border px-3 py-2 rounded"
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                required
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
