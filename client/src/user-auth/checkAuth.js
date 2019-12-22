/* The following function will only work if the component is connected to Redux and has access to:
   the checkAuth action */
export function checkAuthFunc() {
    this.props.checkAuth(() => {
        if (!this.props.authResponse.authenticated) {
            this.props.history.push("/user/signIn");
        };
    });
};