// "use server";
import { InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const authInterceptor = async (config: InternalAxiosRequestConfig) => { 
    const nextCookies = await cookies()
    const token = nextCookies.get("token")?.value;
    const refresh_token = nextCookies.get("refresh_token")?.value;
    console.log(token)
    if (token) {
        if(config?.url === '/refresh') {
            config.headers['Authorization'] = `Bearer ${refresh_token}`;
        } else {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log('Authorization header:', config.headers['Authorization']);
        }
    }
    return config;
}
export default authInterceptor;