export  function authHeader() {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        return {Authorization: 'Bearer ' + user.accessToken}
    } else {
        return {};
    }
  }
  
export function parseJwt(token){
    if(!token){return}
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}