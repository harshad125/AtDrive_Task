import { useSelector, useDispatch } from '../../store';
import { Stack, Typography, IconButton, Box, Divider, Button } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import {
    PlusSquareOutlined,
    MinusSquareOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import { addToCart, removeFromCart, clearCart, deleteItemFromCart } from '../../store/reducers/cartReducer';
import { useNavigate } from 'react-router-dom';
import { useCreateOrder } from '../../hooks/useOrders';
import { toast } from 'sonner';
import './productList.css'; // Reusing established glassmorphism styles

export default function CartList() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, totalAmount } = useSelector((state) => state.cart);
    const createOrderMutation = useCreateOrder();

    const handleCheckout = async () => {
        const orderData = {
            items: items.map(item => ({
                productId: item.id,
                productName: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: totalAmount
        };

        createOrderMutation.mutate(orderData, {
            onSuccess: () => {
                toast.success('Order placed successfully!', {
                    description: 'Your premium selection is being processed.',
                    style: {
                        background: 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(10px)',
                        color: '#fff',
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: '12px'
                    }
                });
                dispatch(clearCart());
                navigate('/product');
            },
            onError: (error) => {
                console.error('Checkout failed:', error);
                toast.error('Checkout failed. Please try again.');
            }
        });
    };


    const handleIncrement = (item) => {
        dispatch(addToCart(item));
    };

    const handleDecrement = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleDelete = (id) => {
        dispatch(deleteItemFromCart(id));
    };

    return (
        <div className="product-page-wrapper">
            <div className="glass-header-bar">
                <div className="header-left">
                    <IconButton
                        onClick={() => navigate('/product')}
                        sx={{ color: '#fff', mr: 1 }}
                    >
                        <ArrowLeftOutlined />
                    </IconButton>
                    <h1 className="gallery-title">Your Cart</h1>
                </div>
                {items.length > 0 && (
                    <button
                        className="add-btn-compact"
                        style={{ background: 'linear-gradient(135deg, #ff4d4f, #ff7875)' }}
                        onClick={() => dispatch(clearCart())}
                    >
                        <DeleteOutlined /> <span>Clear Cart</span>
                    </button>
                )}
            </div>

            <div className="bento-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="glass-card" style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '1rem 1.5rem',
                            minHeight: 'auto'
                        }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                                    {item.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                                    {item.category}
                                </Typography>
                            </Box>

                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mx: 3 }}>
                                <IconButton
                                    size="small"
                                    onClick={() => handleDecrement(item.id)}
                                    sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#fff' } }}
                                >
                                    <MinusSquareOutlined style={{ fontSize: '20px' }} />
                                </IconButton>
                                <Typography variant="h6" sx={{ color: '#fff', minWidth: '20px', textAlign: 'center' }}>
                                    {item.quantity}
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => handleIncrement(item)}
                                    sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#fff' } }}
                                >
                                    <PlusSquareOutlined style={{ fontSize: '20px' }} />
                                </IconButton>
                            </Stack>

                            <Box sx={{ textAlign: 'right', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800 }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                                        ${item.price} each
                                    </Typography>
                                </Box>
                                <IconButton
                                    onClick={() => handleDelete(item.id)}
                                    sx={{ color: 'rgba(255, 77, 79, 0.4)', '&:hover': { color: '#ff4d4f', bgcolor: 'rgba(255, 77, 79, 0.1)' } }}
                                >
                                    <DeleteOutlined />
                                </IconButton>
                            </Box>
                        </div>
                    ))
                ) : (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <ShoppingOutlined style={{ fontSize: '64px', color: 'rgba(255,255,255,0.1)', marginBottom: '1.5rem' }} />
                        <Typography variant="h4" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                            Your cart is empty
                        </Typography>
                        <Button
                            variant="outlined"
                            sx={{
                                mt: 3,
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: 700,
                                '&:hover': { borderColor: '#fff', color: '#fff' }
                            }}
                            onClick={() => navigate('/product')}
                        >
                            Explore Gallery
                        </Button>
                    </Box>
                )}
            </div>

            {items.length > 0 && (
                <div className="glass-card" style={{
                    marginTop: '2rem',
                    padding: '2rem',
                    background: alpha(theme.palette.background.paper, 0.6),
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '16px'
                }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                Total Amount
                            </Typography>
                            <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800 }}>
                                ${totalAmount.toFixed(2)}
                            </Typography>
                        </Box>
                        <button
                            className="add-btn-compact"
                            style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
                            onClick={handleCheckout}
                            disabled={createOrderMutation.isPending}
                        >
                            {createOrderMutation.isPending ? 'Processing...' : 'Checkout Now'}
                        </button>
                    </Stack>
                </div>
            )}
        </div>
    );
}
