import { Draft, PayloadAction, combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import * as components from './components'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type Reducer<Payload, State> = (
  state: Draft<State>,
  action: PayloadAction<Payload>
) => void;

export type StateUpdates<Payload, State> = Record<
  string,
  Reducer<Payload, State>
>;

export type Id = string;

const ui = combineReducers({
  //all ui components in our framework share state under an id 'default' unless specified otherwise
  cardState: components.Card.reducer,
  backgroundState: components._Background.reducer,
  timelineState: components._Timeline.reducer,
})

function makeStore() {
  return configureStore({
    reducer: combineReducers({
      ui,
    }),
  });
}

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useGetById = (id: string, namespace: TypedUseSelectorHook<AppState>) => {};

export function idOrDefault(id?: string): Id {
  return id || "default";
}