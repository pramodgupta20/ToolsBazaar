import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';


type FetchDataProduct = {
    id: number;
    name: string;
    price: number;
};

const CreateOrderPage = () => {
    const { productId } = useParams();
    const [products, setProducts] = useState<FetchDataProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProductId, setSelectedProductId] = useState<number | undefined>(undefined);
    const [quantity, setQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined);
    

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5127/products');
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    };

    const handleProductChange = (event: SelectChangeEvent<number>) => {
        const selectedProductId = event.target.value as number;
        setSelectedProductId(selectedProductId);

        const selectedProduct = products.find((product) => product.id === selectedProductId);
        if (selectedProduct) {
            const totalPrice = selectedProduct.price * Number(quantity);
            setTotalPrice(totalPrice);
        }
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = event.target.value;
        setQuantity(quantity);

        const selectedProduct = products.find((product) => product.id === selectedProductId);
        if (selectedProduct) {
            const totalPrice = selectedProduct.price * Number(quantity);
            setTotalPrice(totalPrice);
        }
    };

    const handleSubmit = async () => {     
        setLoading(true);
        const orderData = {
            productId: parseInt(productId ?? ""),
            quantity: parseInt(quantity),
        };

        try {
            const response = await fetch("http://localhost:5127/order/createorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

           
            setLoading(false);
            if (response.ok) {
                window.history.pushState(null, "", "/order-success");
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error("Order creation failed:", errorData);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <Stack spacing={2}>
            <Typography variant="h2">Create Order</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <InputLabel>Product selection</InputLabel>
                        <Select value={selectedProductId} onChange={handleProductChange}>
                            {products.map((product) => (
                                <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    <TextField
                        label="Total Price"
                        value={totalPrice !== undefined ? totalPrice.toFixed(2) : ''}
                        disabled
                    />
                    <Button type="submit" variant="contained">Submit</Button>
                </form>
            )}
        </Stack>
    );
};

export default CreateOrderPage;
