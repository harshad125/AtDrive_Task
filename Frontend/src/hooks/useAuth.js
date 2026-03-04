import { useMutation } from '@tanstack/react-query';
import ApiService from '../service/ApiService';

export const useLogin = () => {
    return useMutation({
        mutationFn: (payload) => ApiService.authLoginAsync(payload)
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: (payload) => ApiService.createUserAsync(payload)
    });
};
