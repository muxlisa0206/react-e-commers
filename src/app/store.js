import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "../features/cardSlice";

export const cartStore = configureStore({
    reducer:cardSlice
})