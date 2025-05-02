import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "@/types/types";

//  step 1 : Declaring types, This defines the structure of the auth state.
// export interface IAuthState {
//     authState: boolean;
//     carrierId: string | null;
// }

// step 2 : Defining initial states, This sets the default values for your slice of state when the app starts or store is reset.
const initialState: IAuthState = {
    authState: false,
    carrierId: '',
    orderID: "",
};

// Step 3: Creating the Slice, This uses createSlice to generate action creators and reducers in a clean way.
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<boolean>) => {
            state.authState = action.payload;
        },
        setCarrierId: (state, action: PayloadAction<string>) => {
            state.carrierId = action.payload;
        },
        setOrderID: (state, action: PayloadAction<string>) => {
            state.orderID = action.payload;
        },

    },
});

// Step 4: Exporting Actions and Reducer, This allows other parts of your app to use the actions and reducer.
export const {
    setAuthState,
    setCarrierId,
    setOrderID
} = authSlice.actions;

export const authReducer = authSlice.reducer;
