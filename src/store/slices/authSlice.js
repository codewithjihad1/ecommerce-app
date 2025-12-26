import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

/**
 * @param1 {string} Email
 * @param2 {string} Password
 * @param3 {Object} metadata (Optional)
 * @returns {Object} authenticated user data
 */
export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ email, password, metadata = {} }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata,
                },
            });

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

/**
 * @param1 {string} email
 * @param2 {string} password
 * @returns {Object} User data
 */
export const signIn = createAsyncThunk(
    "auth/signIn",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const signInWithOAuth = createAsyncThunk(
    "auth/signInWithOAuth",
    async ({ provider }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider, // e.g., 'google', 'github', 'facebook'
            });

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const signOut = createAsyncThunk(
    "auth/signOut",
    async (_, { rejectWithValue }) => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return null;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ email }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(
                email,
                {
                    redirectTo: "/reset-password",
                },
            );

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const updatePassword = createAsyncThunk(
    "auth/updatePassword",
    async ({ newPassword }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const checkSession = createAsyncThunk(
    "auth/checkSession",
    async (_, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.auth.getSession();
            if (error) throw error;
            return data.session;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        session: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setSession: (state, action) => {
            state.session = action.payload;
            state.user = action.payload?.user || null;
            state.isAuthenticated = !!action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Sign Up
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.session = action.payload.session;
                state.isAuthenticated = !!action.payload.session;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Sign In
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.session = action.payload.session;
                state.isAuthenticated = true;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // OAuth Sign In
            .addCase(signInWithOAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signInWithOAuth.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(signInWithOAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Sign Out
            .addCase(signOut.pending, (state) => {
                state.loading = true;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.session = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(signOut.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Reset Password
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Password
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Check Session
            .addCase(checkSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.loading = false;
                state.session = action.payload;
                state.user = action.payload?.user || null;
                state.isAuthenticated = !!action.payload;
            })
            .addCase(checkSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            });
    },
});

export const { setUser, setSession, clearError } = authSlice.actions;
export default authSlice.reducer;
