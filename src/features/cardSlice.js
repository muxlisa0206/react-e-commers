import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart:[]
}

export const cardSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        },
        removeToCart: (state, action) => {
            state.cart = state.cart.filter((el) => el.id !== action.payload.id)
        }
    }
})

export const {addToCart, removeToCart} = cardSlice.actions
export default cardSlice.reducer