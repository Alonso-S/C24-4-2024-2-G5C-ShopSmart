import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REFRESH_TOKEN,
    AUTH_REGISTER,
    AUTH_VERIFY_TOKEN,
} from "./Actions";
interface AuthAction {
    type: string;
    payload: boolean;
}

interface AuthState {
    isAuthenticated: boolean;
}

const authReducer = (state: AuthState, action: AuthAction) => {
    const { payload, type } = action;
    switch (type) {
        case AUTH_LOGIN:
            return {
                ...state,
                isAuthenticated: payload,
            };
        case AUTH_REGISTER:
            return {
                ...state,
                isAuthenticated: payload,
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isAuthenticated: payload,
            };
        case AUTH_VERIFY_TOKEN:
            return {
                ...state,
                isAuthenticated: payload,
            };
        case AUTH_REFRESH_TOKEN:
            return {
                ...state,
                isAuthenticated: payload,
            };
        default:
            return state;
    }
};
export default authReducer;
