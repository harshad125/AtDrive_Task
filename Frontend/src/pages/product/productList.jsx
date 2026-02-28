import { useState, useMemo, memo } from 'react';

// material-ui
import {
    Box,
    CircularProgress,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// assets
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// project import
import AddEditProduct from './AddEditProduct';
import { useGetProducts, useDeleteProduct } from '../../hooks/useProducts';
import ConfirmationDialog from '../../component/ConfirmationDialog';
import { useDispatch } from '../../store';
import { addToCart } from '../../store/reducers/cartReducer';
import { toast } from 'sonner';

// styles
import './productList.css';

// ==============================|| PRODUCT LIST ||============================== //

export default function ProductList() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: products = [], isLoading } = useGetProducts();
    const deleteProductMutation = useDeleteProduct();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`, {
            style: {
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '12px'
            }
        });
    };

    const onDeleteProduct = async () => {
        const productId = selectedProduct?._id || selectedProduct?.id;
        if (productId) {
            deleteProductMutation.mutate(productId, {
                onSuccess: () => {
                    setIsConfirmOpen(false);
                    setSelectedProduct(null);
                }
            });
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const name = product.name || '';
            const category = product.category || '';
            return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [products, searchTerm]);

    const ProductCard = memo(({ product, index, onAddToCart, onEdit, onDelete }) => (
        <div className="glass-card">
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'rgba(255,255,255,0.6)',
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {product.description || 'Premium design meets unparalleled performance in this latest collection item.'}
                </Typography>
            </div>
            <div className="product-footer">
                <Stack direction="row" spacing={1} alignItems="center">
                    <span className="price-badge">
                        ${product.price}
                    </span>
                    <Tooltip title="Add to Cart">
                        <IconButton
                            sx={{
                                color: theme.palette.primary.main,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                borderRadius: '10px',
                                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                            }}
                            onClick={() => onAddToCart(product)}
                        >
                            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <div className="action-buttons">
                    <Tooltip title="Edit Product">
                        <IconButton
                            className="icon-btn edit"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(product);
                            }}
                            sx={{
                                color: '#fff',
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '10px',
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)', color: theme.palette.primary.main }
                            }}
                        >
                            <EditOutlined style={{ fontSize: '18px' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                        <IconButton
                            className="icon-btn delete"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(product);
                            }}
                            sx={{
                                color: '#fff',
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '10px',
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)', color: '#ff4d4f' }
                            }}
                        >
                            <DeleteOutlined style={{ fontSize: '18px' }} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="product-page-wrapper">
            <div className="glass-header-bar">
                <div className="header-left">
                    <h1 className="gallery-title">Gallery</h1>
                    <div className="compact-search-wrapper">
                        <SearchOutlined className="search-icon" />
                        <input
                            type="text"
                            className="compact-search-input"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <button
                    className="add-btn-compact"
                    onClick={() => {
                        setSelectedProduct(null);
                        setIsOpen(true);
                    }}
                >
                    <PlusOutlined /> <span>Add Product</span>
                </button>
            </div>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                    <CircularProgress sx={{ color: theme.palette.primary.main }} />
                </Box>
            ) : filteredProducts.length > 0 ? (
                <div className="bento-grid">
                    {filteredProducts.map((product, index) => (
                        <ProductCard
                            key={product._id || index}
                            product={product}
                            index={index}
                            onAddToCart={handleAddToCart}
                            onEdit={(p) => {
                                setSelectedProduct(p);
                                setIsOpen(true);
                            }}
                            onDelete={(p) => {
                                setSelectedProduct(p);
                                setIsConfirmOpen(true);
                            }}
                        />
                    ))}
                </div>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', py: 10 }}>
                    <Typography variant="h4" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                        No products discovered yet
                    </Typography>
                </Box>
            )}

            {/* Modals */}
            {isOpen && (
                <AddEditProduct
                    onCancel={() => setIsOpen(false)}
                    selectedProduct={selectedProduct}
                    onProductSave={() => {
                        // The mutation hooks in AddEditProduct already handle invalidation
                        setIsOpen(false);
                    }}
                />
            )}

            {isConfirmOpen && selectedProduct && (
                <ConfirmationDialog
                    isDialogOpen={isConfirmOpen}
                    onCancel={() => setIsConfirmOpen(false)}
                    confirmHandle={onDeleteProduct}
                    title="Delete Product"
                    Content={`Are you sure you want to delete ${selectedProduct.name}? This action cannot be undone.`}
                />
            )}
        </div>
    );
}

