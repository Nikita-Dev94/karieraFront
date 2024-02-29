import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from "../../shared/api";

interface UserState {
    name: string;
    email: string;
    lastName:string;
}

const initialState: UserState = {
    name: '',
    email:'',
    lastName:''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserData(state, action: PayloadAction<User>) {
            state.name = action.payload.firstName;
            state.email = action.payload.email;
            state.lastName = action.payload.lastName;
        },
    },
});

export const { getUserData } = userSlice.actions;
export default userSlice.reducer;
