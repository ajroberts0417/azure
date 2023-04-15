import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";

export enum BackgroundImage {
  Forest = "/images/background/forest.png",
  Sky = "/images/background/sky.jpg",
  Space = "/images/background/space.jpg",
}

export interface ThemeState {
  backgroundImage: BackgroundImage
}

const initialState: ThemeState = {
  backgroundImage: BackgroundImage.Forest,
};

export function useBackgroundImage(): BackgroundImage {
  return useAppSelector(state => state.theme.backgroundImage)
}

export function useSetBackgroundImage(): (backgroundImage: BackgroundImage) => void {
  const dispatch = useAppDispatch();
  return (backgroundImage: BackgroundImage) => dispatch(setBackgroundImage(backgroundImage))
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setBackgroundImage: (state, action: PayloadAction<BackgroundImage>) => {
      state.backgroundImage = action.payload
    },
  }
});

const { setBackgroundImage } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;