const Cart_KEY = 'REACTAPP.Cart'
const USER = 'REACTAPP.USER'
const REFRESH_Cart_KEY = 'REACTAPP.REFRESH_TOKEN'

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
**/
const CartService = {
    getCart() {
        return sessionStorage.getItem(Cart_KEY)
    },

    saveCart(accessCart) {
        sessionStorage.setItem(Cart_KEY, cartView)
    },

    removeCart() {
        sessionStorage.removeItem(Cart_KEY)
    },

    getRefreshCart() {
        return sessionStorage.getItem(REFRESH_Cart_KEY)
    },

    saveRefreshCart(refreshCart) {
        sessionStorage.setItem(REFRESH_Cart_KEY, refreshCart)
    },

    removeRefreshCart() {
        sessionStorage.removeItem(REFRESH_Cart_KEY)
    }

}

const SetUser = {
    getUser() {
        let user = sessionStorage.getItem(USER);
        return JSON.parse(user)
    },
    isAdmin(){
        let user = this.getUser();
        return user != null ? user.role == 'admin' : false
    },
    saveUser(user) {
        sessionStorage.setItem(USER, JSON.stringify(user));
    },

    removeUser() {
        sessionStorage.removeItem(USER)
    }
}


export { CartService, SetUser }
<Button fluid className='add-button' onClick={handleButtonAddCart}>
    Add to Cart
    <Icon name='arrow right' />
</Button>