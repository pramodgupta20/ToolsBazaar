import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { HomePage } from "./components/home/HomePage";
import AllProductsPage from "./components/all-products/AllProductsPage";
import OrderSuccessPage from "./components/order-success/OrderSuccessPage";
import { PageNotFound } from "./components/PageNotFound";
import CreateOrderPage from "./components/create-order/CreateOrderPage";
import App from "./App";


const RouterConfig = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="/all-products" element={<AllProductsPage />} />
                    <Route path="/create-order/:productId" element={<CreateOrderPage />} />
                    <Route path="/order-success" element={<OrderSuccessPage />} />                   
                    <Route path="*" element={<PageNotFound />} />
                </Route>
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Router>
    );
};

export default RouterConfig;
