import axios, {AxiosResponse} from 'axios'

const axiosApi = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/backend/api' : '/api',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

interface User {
    id: number;
    firstName: string;
    lastName: string;
}

export default {
    hello(): Promise<AxiosResponse<string>> {
        return axiosApi.get(`/hello`);
    },
    getUser(userId: number): Promise<AxiosResponse<User>> {
        return axiosApi.get(`/user/` + userId);
    },
    getUsers(): Promise<AxiosResponse<User[]>> {
        return axiosApi.get(`/users`);
    },
    createUser(firstName: string, lastName: string): Promise<AxiosResponse<number>> {
        return axiosApi.post(`/user/` + encodeURIComponent(lastName) + '/' + encodeURIComponent(firstName));
    },
    getSecured(user: string, password: string): Promise<AxiosResponse<string>> {
        return axiosApi.get(`/secured/`,{
            auth: {
                username: user,
                password: password
            }});
    }
}
