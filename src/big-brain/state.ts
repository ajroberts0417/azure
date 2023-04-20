import { Draft, PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { UIState as CardUIState, initialUIState as initialCardUIState, stateUpdates as cardStateUpdates } from "./components/Card";

interface UIState extends CardUIState {}

interface State {
  ui: UIState;
}

const initialUIState: State = {
  ui: {
    ...initialCardUIState,
  },
};

export type Reducer<Payload> = (
  state: Draft<State>,
  action: PayloadAction<Payload>
) => void;

export type StateUpdates<Payload> = Record<string, Reducer<Payload>>

export const stateSlice = createSlice({
  name: "UIState",
  initialState: initialUIState,
  reducers: {
    ...cardStateUpdates,
  },
});

export function makeStore() {
  return configureStore({
    reducer: stateSlice.reducer,
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;