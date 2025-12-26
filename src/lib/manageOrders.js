import { supabase } from "./supabase";

/**
 *
 * @param {Object} orderData Order object
 * @param {string} userId current user id
 * @returns {Object} order info
 */
export const createOrder = async (orderData, userId) => {
    const { data: order, error } = await supabase
        .from("orders")
        .insert([
            {
                user_id: userId,
                subtotal: orderData.pricing.subtotal,
                delivery_fee: orderData.pricing.deliveryFee,
                discount: orderData.pricing.discount,
                total: orderData.pricing.total,
                payment_method: orderData.payment_method,
                shipping_address: orderData.shippingAddress,
            },
        ])
        .select()
        .single();

    if (error) throw error;

    return order;
};

/**
 *
 * @param {string} orderId Order id
 * @param {Array} items when user orders in multiple items
 */
export const insertOrderItems = async (orderId, items) => {
    const orderItems = items.map((item) => ({
        order_id: orderId,
        product_id: item._id,
        product_name: item.title,
        product_image: item.image,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
    }));

    const { error } = await supabase.from("order_items").insert(orderItems);

    if (error) throw error;
};

/**
 *
 * @param {Object} orderData OrderInfo
 * @param {Object} user User info like {email, name, userId}
 */
export const placeOrder = async (orderData, user) => {
    const order = await createOrder(orderData, user.id);
    await insertOrderItems(order.order_id, orderData.items); // Changed from order.id to order.order_id

    return order;
};

/**
 *
 * @param {string} orderId
 * @param {string} userId
 * @param {string} status
 */
export const paymentStatusUpdate = async (orderId, userId) => {
    try {
        const { error } = await supabase
            .from("orders")
            .update({
                payment_status: "paid",
            })
            .eq("order_id", orderId)
            .eq("user_id", userId);
        if (error) throw error;
    } catch (error) {
        console.log("payment status update error: ", error);
    }
};
