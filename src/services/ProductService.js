import WooCommerceAPI from "../lib/woocommerce";

export const ProductService = {
    // Get all products
    getProducts: async (params = {}) => {
        try {
            const response = await WooCommerceAPI.get("/products", {
                params: {
                    per_page: 20,
                    page: 1,
                    ...params,
                },
            });
            return response.data;
        } catch (error) {
            console.error(
                "Error fetching products:",
                error.response?.data || error.message,
            );
            throw error;
        }
    },

    // Get single product
    getProduct: async (productId) => {
        try {
            const response = await WooCommerceAPI.get(`/products/${productId}`);
            return response.data;
        } catch (error) {
            console.error(
                "Error fetching product:",
                error.response?.data || error.message,
            );
            throw error;
        }
    },

    // Search products
    searchProducts: async (searchTerm) => {
        try {
            const response = await WooCommerceAPI.get("/products", {
                params: { search: searchTerm },
            });
            return response.data;
        } catch (error) {
            console.error(
                "Error searching products:",
                error.response?.data || error.message,
            );
            throw error;
        }
    },

    // Get product categories
    getCategories: async () => {
        try {
            const response = await WooCommerceAPI.get("/products/categories");
            return response.data;
        } catch (error) {
            console.error(
                "Error fetching categories:",
                error.response?.data || error.message,
            );
            throw error;
        }
    },

    // Get products by category
    getProductsByCategory: async (categoryId, params = {}) => {
        try {
            const response = await WooCommerceAPI.get("/products", {
                params: {
                    category: categoryId,
                    ...params,
                },
            });
            return response.data;
        } catch (error) {
            console.error(
                "Error fetching products by category:",
                error.response?.data || error.message,
            );
            throw error;
        }
    },

    // Add to ProductService.js
    getCategoryBySlug: async (slug) => {
        try {
            const response = await WooCommerceAPI.get("/products/categories", {
                params: { slug },
            });
            return response.data[0] || null; // Returns first matching category
        } catch (error) {
            console.error(
                "Error fetching category:",
                error.response?.data || error.message,
            );
            throw error;
        }
    },

    // Get featured products
    getFeaturedProducts: async (params = {}) => {
        try {
            const response = await WooCommerceAPI.get("/products", {
                params: {
                    featured: true,
                    ...params,
                },
            });
            return response.data;
        } catch (error) {
            console.error(
                "Error fetching featured products:",
                error.response?.data || error.message,
            );
            throw error;
        }
    },

    // Get products on sale
    getOnSaleProducts: async (params = {}) => {
        try {
            const response = await WooCommerceAPI.get("/products", {
                params: {
                    on_sale: true,
                    ...params,
                },
            });
            return response.data;
        } catch (error) {
            console.error(
                "Error fetching sale products:",
                error.response?.data || error.message,
            );
            throw error;
        }
    },
};

export default ProductService;
