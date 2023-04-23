import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector, Id, StateUpdates, idOrDefault } from "../framework";

export enum BackgroundImage {
  Forest = "/images/background/forest.png",
  Sky = "/images/background/sky.jpg",
  Space = "/images/background/space.jpg",
}

export interface State {
  backgrounds: Record<Id, BackgroundState | undefined>;
}

interface BackgroundState {
  image: BackgroundImage
}

const initialState: State = {
  backgrounds: {
    "default": {
      image: BackgroundImage.Forest
    }
  },
};

export function useBackground(id?: string): BackgroundState | undefined {
  return useAppSelector(
    (state) => state.ui.backgroundState.backgrounds[idOrDefault(id)]
  );
}

// useGetThing(id, state => state.ui.backgroundState.backgrounds)

export function useSetBackgroundImage(): (
  image: BackgroundImage,
  id?: string,
) => void {
  const dispatch = useAppDispatch();
  return (image, backgroundId) =>
    dispatch(setBackgroundImage({ image, backgroundId }));
}

interface SetBackgroundImagePayload {
  backgroundId?: Id;
  image: BackgroundImage;
}

const stateUpdates: StateUpdates<SetBackgroundImagePayload, State> = {
  setBackgroundImage: (state, action: PayloadAction<SetBackgroundImagePayload>) => {
    const background = state.backgrounds[idOrDefault(action.payload.backgroundId)];
    if(background) {
      background.image = action.payload.image;
    }
  },
};

const slice = createSlice({
  name: "background",
  initialState,
  reducers: {
    ...stateUpdates,
  },
});

export const { setBackgroundImage } = slice.actions;

const Background: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={className}
    style={{ backgroundImage: `url("${useBackground()?.image}")` }}
  >
    {children}
  </div>
);

const Background.set = () => {

}

export const _Background = {
  reducer: slice.reducer
}

export default Background