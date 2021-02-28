import * as AuthActions from '../constants/authActions';
export const signin = (user) => ({
    type: AuthActions.SIGNIN,
    user
});
export const signout = () => ({
    type: AuthActions.SIGNOUT
})