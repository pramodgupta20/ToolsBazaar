import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

type FetchDataProduct = {
    id: number;
    name: string;
    price: number;
};

const AllProductsPage = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<FetchDataProduct[]>([]);

    useEffect(() => {
        populateProductData();
    }, []);

    const populateProductData = async () => {
        try {
            const response = await fetch('http://localhost:5127/products');
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const renderProductsTable = (products: FetchDataProduct[]) => {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="products table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Create Order</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">{product.name}</TableCell>
                                <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <Link to={`/create-order/${product.id}`}>
                                        <ShoppingCartCheckoutIcon />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Stack spacing={4}>
            <Typography variant="h2">All products</Typography>
            {loading ? <CircularProgress size={24} /> : renderProductsTable(products)}
        </Stack>
    );
};

export default AllProductsPage;
