import { createAuthProvider } from 'react-token-auth';


export const { useAuth, authFetch, login, logout } = createAuthProvider({
    getAccessToken: 'access_token',
    //storage: localStorage,
    onUpdateToken: token =>
        fetch('/api/v1/users/refresh', {
            method: 'POST',
            body: token.refresh_token,
        }).then(r => r.json()),
});
