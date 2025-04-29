import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



export interface IAuthState {
    authState: boolean;
    bablu: string;

}

export interface ConfigFilters {
    checkValidity: boolean;
    checkDowntime: boolean;
    sortUnlimitedUsage: boolean;
    sortOwnership: boolean;
}

const initialState: IAuthState = {
    authState: false,
    bablu: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<boolean>) => {
            state.authState = action.payload;
        },
        setBabluName: (state, action: PayloadAction<string>) => {
            state.bablu = action.payload;
        },
    },
});

export const {
    setAuthState,
    setBabluName,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
