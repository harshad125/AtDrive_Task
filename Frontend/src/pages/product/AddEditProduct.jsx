import { forwardRef } from 'react';

// material-ui
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Slide,
    InputAdornment,
    Typography
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';

// project import
import ApiService from '../../service/ApiService';

// assets
import { CloseOutlined } from '@ant-design/icons';

// animation
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// ==============================|| PRODUCT - ADD / EDIT ||============================== //

export default function AddEditProduct({ onCancel, selectedProduct, onProductSave }) {
    const theme = useTheme();
    const ProductSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Product Name is required'),
        category: Yup.string().required('Category is required'),
        price: Yup.number().positive('Price must be positive').required('Price is required'),
        stock: Yup.number().integer().min(0).required('Stock quantity is required'),
        description: Yup.string().max(500)
    });

    const formik = useFormik({
        initialValues: {
            name: selectedProduct?.name || '',
            category: selectedProduct?.category || 'Electronics',
            price: selectedProduct?.price || '',
            stock: selectedProduct?.stock || '',
            description: selectedProduct?.description || ''
        },
        enableReinitialize: true,
        validationSchema: ProductSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                setSubmitting(true);
                const productId = selectedProduct?._id || selectedProduct?.id;
                let response;

                if (productId) {
                    response = await ApiService.updateProductAsync(productId, values);
                } else {
                    response = await ApiService.createProductAsync(values);
                }

                // The interceptor returns response.data directly or the wrapped object with {data, error}
                // Check if we have data or if the response itself is the data (success)
                if (response && !response.error) {
                    onProductSave();
                    onCancel();
                } else if (response?.error) {
                    setErrors(response.error);
                }
            } catch (err) {
                console.error('Submission error:', err);
            } finally {
                setSubmitting(false);
            }
        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <Dialog
            maxWidth="sm"
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            open={true}
            onClose={onCancel}
            className="glass-dialog"
        >
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <DialogTitle className="glass-dialog-title">
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                {selectedProduct ? 'Edit Product' : 'Discovery New Product'}
                            </Typography>
                            <IconButton onClick={onCancel} size="small" className="glass-close-btn">
                                <CloseOutlined />
                            </IconButton>
                        </Stack>
                    </DialogTitle>
                    <DialogContent className="glass-dialog-content">
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel className="neon-input-label">Product Name</InputLabel>
                                    <TextField
                                        fullWidth
                                        className="neon-textfield"
                                        placeholder="Enter product name (e.g. Vision Pro Max)"
                                        {...getFieldProps('name')}
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel className="neon-input-label">Category</InputLabel>
                                    <Select
                                        fullWidth
                                        className="neon-textfield"
                                        {...getFieldProps('category')}
                                        error={Boolean(touched.category && errors.category)}
                                        sx={{
                                            '& .MuiSelect-select': { color: '#fff' },
                                            '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.5)' }
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    bgcolor: alpha(theme.palette.background.paper, 0.9),
                                                    backdropFilter: 'blur(10px)',
                                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                                    color: theme.palette.text.primary,
                                                    '& .MuiMenuItem-root:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                                                    '& .Mui-selected': { bgcolor: `${alpha(theme.palette.primary.main, 0.2)} !important` }
                                                }
                                            }
                                        }}
                                    >
                                        <MenuItem value="Electronics">Electronics</MenuItem>
                                        <MenuItem value="Fashion">Fashion</MenuItem>
                                        <MenuItem value="Home">Home</MenuItem>
                                        <MenuItem value="Gadgets">Gadgets</MenuItem>
                                    </Select>
                                    {touched.category && errors.category && (
                                        <FormHelperText error>{errors.category}</FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel className="neon-input-label">Price</InputLabel>
                                    <TextField
                                        fullWidth
                                        className="neon-textfield"
                                        type="number"
                                        placeholder="0.00"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start" sx={{ color: theme.palette.primary.main }}>$</InputAdornment>
                                        }}
                                        {...getFieldProps('price')}
                                        error={Boolean(touched.price && errors.price)}
                                        helperText={touched.price && errors.price}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Stack spacing={1}>
                                    <InputLabel className="neon-input-label">Stock Quantity</InputLabel>
                                    <TextField
                                        fullWidth
                                        className="neon-textfield"
                                        type="number"
                                        placeholder="Units in storage..."
                                        {...getFieldProps('stock')}
                                        error={Boolean(touched.stock && errors.stock)}
                                        helperText={touched.stock && errors.stock}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel className="neon-input-label">Short Description</InputLabel>
                                    <TextField
                                        fullWidth
                                        className="neon-textfield"
                                        multiline
                                        rows={4}
                                        placeholder="Describe the premium features of this product..."
                                        {...getFieldProps('description')}
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions className="glass-dialog-actions">
                        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ width: '100%' }}>
                            <Button className="modal-cancel-btn" onClick={onCancel}>
                                Discard
                            </Button>
                            <Button type="submit" className="modal-submit-btn" disabled={isSubmitting}>
                                {selectedProduct ? 'Update Item' : 'Pulse Entry'}
                            </Button>
                        </Stack>
                    </DialogActions>
                </Form>
            </FormikProvider>
        </Dialog>
    );
}
