import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ApiService from '../service/ApiService';

export const useGetOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await ApiService.getOrdersAsync();
            return response.data;
        }
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => ApiService.createOrderAsync(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, payload }) => ApiService.updateOrderAsync(orderId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId) => ApiService.deleteOrderAsync(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });
};
