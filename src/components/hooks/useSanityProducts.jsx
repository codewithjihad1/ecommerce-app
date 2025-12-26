import { createClient } from "@sanity/client";
import { useEffect, useState } from "react";

const client = createClient({
  projectId: "ku718da2",
  dataset: "production",
  useCdn: false, // REQUIRED for real-time
  apiVersion: "2025-01-01",
});

export const useSanityProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let subscription;

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

    // Initial fetch
    client.fetch(query)
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));

    // Real-time updates
    subscription = client
      .listen(query)
      .subscribe(() => {
        client.fetch(query).then(setProducts);
      });

    return () => subscription?.unsubscribe();
  }, []);

  return { products, loading, error };
};
