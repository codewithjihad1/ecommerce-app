import WooCommerceAPI from "react-native-woocommerce-api";

const WPApi = new WooCommerceAPI({
    url: "http://e-commerce.local",
    consumerKey: "ck_2590182f96ed09c1c3b90f6fb47d0caa33da52ff",
    consumerSecret: "cs_91aff4c35777cad316fa886757512ecc73ecd4c3",
    version: "wc/v3",
    wpAPI: true,
    queryStringAuth: true,
    ssl: true,
});

export default WPApi;
