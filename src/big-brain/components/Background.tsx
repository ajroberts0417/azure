import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector, Id, StateUpdates, idOrDefault } from "../framework";

export enum BackgroundImage {
  Forest = "/images/background/forest.png",
  Sky = "/images/background/sky.jpg",
  Space = "/images/background/space.jpg",
}

interface State {
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

export function useUpsertBackground(): (
  background: Partial<BackgroundState>,
  id?: string,
) => void {
  const dispatch = useAppDispatch();
  return (background, backgroundId) =>
    dispatch(upsertBackground({ background, backgroundId }));
}

interface UpsertBackgroundPayload {
  backgroundId?: Id;
  background: Partial<BackgroundState>;
}

const stateUpdates: StateUpdates<UpsertBackgroundPayload, State> = {
  upsertBackground: (state, action: PayloadAction<UpsertBackgroundPayload>) => {
    const background = state.backgrounds[idOrDefault(action.payload.backgroundId)];
    if(background) {
      Object.entries(action.payload.background).forEach(([key, value]) => {
        const typedKey = key as keyof BackgroundState;
        background[typedKey] = value as BackgroundState[typeof typedKey];
      })
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

export const { upsertBackground } = slice.actions;

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

export const _Background = {
  reducer: slice.reducer
}

export default Background