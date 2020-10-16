import { getAccessToken } from '../accessToken';
import jwtDecode from 'jwt-decode';

export const checkAuth = () => {
    const token = getAccessToken();
    if (!token) {
        return false;
    }
    try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            return false;
        } else {
            return true;
        }
    } catch {
        return false;
    }
}

export default checkAuth();