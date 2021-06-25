import {combineReducers} from 'redux'
import alert from './alert'
import login from './login'
import products from './products'
import cart from './cart'
import wishlist from './wishlist'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
    key:'root',
    storage,
    // whitelist:['auth'], //list of states you want to persist
}
const rootReducer = combineReducers({
    alert,login,wishlist, products,cart
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer