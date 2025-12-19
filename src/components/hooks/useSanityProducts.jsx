import { createClient } from "@sanity/client";
import { useEffect, useState } from "react";

// Initialize Sanity Client
const client = createClient({
    projectId: "ku718da2",
    dataset: "production",
    useCdn: true,
    apiVersion: "2025-01-01",
});

export const useSanityProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const query = `*[_type == "product"]{
          _id,
          title,
          description,
          price,
          stock,
          "categoryName": category->title,
          "subcategoryName": subcategory->title,
          colors,
          sizes,
          tags,
          producttype,
          featured,
          "reviews": reviews[]->{
            author,
            rating,
            comment,
            createdAt
          },
          "image": image.asset->url
        }`;

                const data = await client.fetch(query);
                setProducts(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};
