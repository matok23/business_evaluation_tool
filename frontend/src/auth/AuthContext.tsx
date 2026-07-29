import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import {
    authService,
    type RegisterCredentials,
    type AuthCredentials,
} from '../api/auth_service';

import { tokenStorage } from './token_storage';

type AuthContextValue = {
    isAuthenticated: boolean;
    login: (credentials: AuthCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [accessToken, setAccessToken] = useState<string | null>(
        () => tokenStorage.get()
    );

    const login = useCallback(
        async (credentials: AuthCredentials) => {
            const token = await authService.login(credentials);

            tokenStorage.set(token);
            setAccessToken(token);
        },
        []
    );

    const register = useCallback(
        async (credentials: RegisterCredentials) => {
            await authService.register(credentials);
            await login(credentials);
        },
        [login]
    );

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } finally {
            tokenStorage.clear();
            setAccessToken(null);
        }
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            isAuthenticated: accessToken !== null,
            login,
            register,
            logout,
        }),
        [accessToken, login, register, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth must be used inside an AuthProvider'
        );
    }

    return context;
}