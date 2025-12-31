import { createClient } from "@sanity/client";
import { useEffect, useState } from "react";

const client = createClient({
    projectId: "ku718da2",
    dataset: "production",
    useCdn: false,
    apiVersion: "2025-01-01",
});

export const useSanitySingleProduct = (id) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        const query = `*[_type == "product" && _id == $id][0]{
            _id,
            title,
            description,
            price,
            stock,
            colors,
            sizes,
            tags,
            "categoryName": category->title,
            "subcategoryName": subcategory->title,
            "reviews": reviews[]->{
                author,
                rating,
                comment,
                createdAt
            },
            "image": image.asset->url
        }`;

        const fetchProduct = async () => {
            setLoading(true);
            try {
                // Pass the 'id' as a variable to the query
                const result = await client.fetch(query, { id });
                setProduct(result);
            } catch (err) {
                console.error("Sanity Fetch Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]); // Re-run only if the ID changes

    return { product, loading, error };
};
