import { createClient } from "@sanity/client";
import { useEffect, useState } from "react";

const client = createClient({
    projectId: "ku718da2",
    dataset: "production",
    useCdn: false,
    apiVersion: "2025-01-01",
});

export const useSanityProducts = ({
    limit = 10,
    category = null,
    subcategory = null,
    producttype = null,
    tag = null,
} = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Reset loading to true when dependencies change
        setLoading(true);

        // 1. DYNAMIC FILTER BUILDING
        let filters = `_type == "product"`;

        // Use references (->title) for relationships
        if (category) filters += ` && category->title match $category`;
        if (subcategory) filters += ` && subcategory->title match $subcategory`;

        // Use direct match for simple strings
        if (producttype) filters += ` && producttype match $producttype`;
        if (tag) filters += ` && $tag in tags`;

        const safeLimit = Number(limit) || 10;
        const query = `*[${filters}] | order(_createdAt desc) [0...${safeLimit}]{
            _id,
            title,
            price,
            "categoryName": category->title,
            "subcategoryName": subcategory->title,
            producttype, 
            tags,
            "image": image.asset->url
        }`;

        const fetchData = async () => {
            try {
                const data = await client.fetch(query, {
                    category: category || "",
                    subcategory: subcategory || "",
                    producttype: producttype || "",
                    tag: tag || "",
                });
                setProducts(data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const subscription = client
            .listen(query, {
                category: category || "",
                subcategory: subcategory || "",
                producttype: producttype || "",
                tag: tag || "",
            })
            .subscribe(() => fetchData());

        return () => subscription.unsubscribe();
    }, [limit, category, tag, subcategory, producttype]);

    return { products, loading };
};
