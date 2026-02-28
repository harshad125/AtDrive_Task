import { useState } from 'react';
import {
    Box,
    CircularProgress,
    IconButton,
    Stack,
    Typography,
    Tooltip,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    ShoppingOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import { useGetOrders, useUpdateOrder, useDeleteOrder } from '../../hooks/useOrders';
import ConfirmationDialog from '../../component/ConfirmationDialog';
import { toast } from 'sonner';
import './orderList.css';

export default function OrderList() {
    const theme = useTheme();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [editStatus, setEditStatus] = useState('');

    const { data: orders = [], isLoading } = useGetOrders();
    const updateOrderMutation = useUpdateOrder();
    const deleteOrderMutation = useDeleteOrder();

    const handleDeleteOrder = async () => {
        const orderId = selectedOrder._id || selectedOrder.id;
        if (orderId) {
            deleteOrderMutation.mutate(orderId, {
                onSuccess: () => {
                    toast.success('Order deleted successfully');
                    setIsConfirmOpen(false);
                    setSelectedOrder(null);
                },
                onError: (err) => {
                    console.error('Failed to delete order:', err);
                    toast.error('Failed to delete order');
                }
            });
        }
    };

    const handleUpdateStatus = async () => {
        const orderId = selectedOrder._id || selectedOrder.id;
        if (orderId) {
            updateOrderMutation.mutate({ orderId, payload: { status: editStatus } }, {
                onSuccess: () => {
                    toast.success('Order status updated');
                    setIsEditOpen(false);
                    setSelectedOrder(null);
                },
                onError: (err) => {
                    console.error('Failed to update order status:', err);
                    toast.error('Failed to update order status');
                }
            });
        }
    };

    const getStatusChip = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return <Chip icon={<CheckCircleOutlined />} label="Completed" color="success" variant="outlined" sx={{ borderColor: '#52c41a', color: '#52c41a' }} />;
            case 'pending':
                return <Chip icon={<ClockCircleOutlined />} label="Pending" color="warning" variant="outlined" sx={{ borderColor: '#faad14', color: '#faad14' }} />;
            case 'cancelled':
                return <Chip icon={<CloseCircleOutlined />} label="Cancelled" color="error" variant="outlined" sx={{ borderColor: '#ff4d4f', color: '#ff4d4f' }} />;
            default:
                return <Chip label={status || 'Processing'} variant="outlined" sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main }} />;
        }
    };

    return (
        <div className="product-page-wrapper">
            <div className="glass-header-bar">
                <div className="header-left">
                    <h1 className="gallery-title">Order History</h1>
                </div>
            </div>

            {isLoading && orders.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                    <CircularProgress sx={{ color: theme.palette.primary.main }} />
                </Box>
            ) : orders.length > 0 ? (
                <div className="glass-card" style={{ overflow: 'hidden' }}>
                    <TableContainer component={Box} sx={{ background: 'transparent' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
                                <TableRow>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Order ID</TableCell>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Date</TableCell>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Items</TableCell>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Total Amount</TableCell>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Status</TableCell>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }} align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order._id || order.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                                        <TableCell sx={{ color: '#fff', fontWeight: 500 }}>
                                            {(order._id || order.id).substring(0, 8).toUpperCase()}
                                        </TableCell>
                                        <TableCell sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                            {order.items?.length || 0} items
                                        </TableCell>
                                        <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                                            ${order.totalAmount?.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusChip(order.status)}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <Tooltip title="View Details">
                                                    <IconButton
                                                        onClick={() => {
                                                            setSelectedOrder(order);
                                                            setIsViewOpen(true);
                                                        }}
                                                        sx={{ color: theme.palette.primary.main, bgcolor: alpha(theme.palette.primary.main, 0.1), '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) } }}
                                                    >
                                                        <EyeOutlined />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit Status">
                                                    <IconButton
                                                        onClick={() => {
                                                            setSelectedOrder(order);
                                                            setEditStatus(order.status || 'Pending');
                                                            setIsEditOpen(true);
                                                        }}
                                                        sx={{ color: '#fff', bgcolor: 'rgba(255, 255, 255, 0.05)', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
                                                    >
                                                        <EditOutlined />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete Order">
                                                    <IconButton
                                                        onClick={() => {
                                                            setSelectedOrder(order);
                                                            setIsConfirmOpen(true);
                                                        }}
                                                        sx={{ color: '#ff4d4f', bgcolor: 'rgba(255, 77, 79, 0.1)', '&:hover': { bgcolor: 'rgba(255, 77, 79, 0.2)' } }}
                                                    >
                                                        <DeleteOutlined />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                    <ShoppingOutlined style={{ fontSize: '64px', color: 'rgba(255,255,255,0.1)', marginBottom: '1.5rem' }} />
                    <Typography variant="h4" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                        No orders found
                    </Typography>
                </Box>
            )}

            {/* View Details Modal */}
            <Dialog
                open={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                className="glass-dialog"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle className="glass-dialog-title">Order Details</DialogTitle>
                <DialogContent className="glass-dialog-content">
                    {selectedOrder && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 2 }}>
                                Order ID: {selectedOrder._id || selectedOrder.id}
                            </Typography>
                            <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '12px', p: 2, mb: 3 }}>
                                {selectedOrder.items?.map((item, idx) => (
                                    <Stack key={idx} direction="row" justifyContent="space-between" sx={{ py: 1, borderBottom: idx < selectedOrder.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                        <Box>
                                            <Typography sx={{ color: '#fff', fontWeight: 600 }}>{item.productName}</Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Qty: {item.quantity} x ${item.price}</Typography>
                                        </Box>
                                        <Typography sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                                            ${(item.quantity * item.price).toFixed(2)}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Box>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" sx={{ color: '#fff' }}>Total Amount</Typography>
                                <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: 800 }}>
                                    ${selectedOrder.totalAmount?.toFixed(2)}
                                </Typography>
                            </Stack>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions className="glass-dialog-actions">
                    <Button onClick={() => setIsViewOpen(false)} className="modal-cancel-btn">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Status Modal */}
            <Dialog
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                className="glass-dialog"
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle className="glass-dialog-title">Update Order Status</DialogTitle>
                <DialogContent className="glass-dialog-content">
                    <FormControl fullWidth sx={{ mt: 2 }} className="neon-textfield">
                        <InputLabel sx={{ color: 'rgba(255,255,255,0.6)' }}>Status</InputLabel>
                        <Select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            label="Status"
                            sx={{
                                color: '#fff',
                                '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                                '.MuiSvgIcon-root': { color: 'rgba(255,255,255,0.5)' }
                            }}
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Processing">Processing</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions className="glass-dialog-actions">
                    <Button onClick={() => setIsEditOpen(false)} className="modal-cancel-btn">Cancel</Button>
                    <Button
                        onClick={handleUpdateStatus}
                        className="modal-submit-btn"
                        disabled={updateOrderMutation.isPending}
                    >
                        {updateOrderMutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Update Status'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation */}
            {isConfirmOpen && (
                <ConfirmationDialog
                    isDialogOpen={isConfirmOpen}
                    onCancel={() => setIsConfirmOpen(false)}
                    confirmHandle={handleDeleteOrder}
                    title="Delete Order"
                    Content="Are you sure you want to delete this order? This action cannot be undone."
                />
            )}
        </div>
    );
}
