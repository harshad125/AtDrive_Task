import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ApiService from '../service/ApiService';

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await ApiService.getProductsAsync();
            // AxiosService already wraps it in { data: ... }
            return response.data;
        }
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => ApiService.createProductAsync(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, payload }) => ApiService.updateProductAsync(productId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (productId) => ApiService.deleteProductAsync(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });
};
