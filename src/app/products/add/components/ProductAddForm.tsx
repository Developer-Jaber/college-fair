"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProductAddForm() {
    const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const productData = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price") as string),
    };

    console.log("Submitting:", productData);

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const result = await res.json();
      console.log("Server response:", result);

      event.currentTarget.reset(); // Reset the form
    } catch (error) {
      console.error("Error submitting product:", error);
    }
    router.push("/products");
    
  };

  return (
    <div className="flex justify-center pt-40 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          required
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          required
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded w-full text-white"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
