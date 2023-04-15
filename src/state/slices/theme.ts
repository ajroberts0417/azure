import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";

export enum Background {
  Default = '/images/background/default.png',
}

export interface ThemeState {
  background: Background
}

const initialState: ThemeState = {
  background: Background.Default,
};

export function useBackground(): Background {
  return useAppSelector(state => state.theme.background)
}

export function useSetBackground(): (background: Background) => void {
  const dispatch = useAppDispatch();
  return (background: Background) => dispatch(setBackgroundImage(background))
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setBackgroundImage: (state, action: PayloadAction<Background>) => {
      state.background = action.payload
    },
  }
});

const { setBackgroundImage } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;