import {combineReducers} from 'redux'
import alert from './alert'
import login from './login'
import products from './products'
import cart from './cart'
import address from './address'
import orders from './orders'
import wishlist from './wishlist'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
    key:'root',
    storage,
    blacklist: ['wishlist','products']
    // whitelist:['auth'], //list of states you want to persist
}
const rootReducer = combineReducers({
    alert,login,wishlist, products,cart, address, orders
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer