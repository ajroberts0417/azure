import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Id, StateUpdates } from '../framework';

interface State {
  cardStacks: Record<Id, CardStackState | undefined>;
  cards: Record<Id, CardState | undefined>;
}

const initialState: State = {
  cardStacks: {},
  cards: {},
};

interface CardState {
    id: Id;
    text: string
}

interface CardStackState {
  cardIds: Id[]; 
}

interface AppendCardsPayload {
    stackId: Id
    cards: CardState[]
}

interface PopCardsPayload  {
    stackId: Id
    numCardsToPop: number
}

interface PushCardsPayload {
    stackId: Id
    cards: CardState[];
}

type Payloads = AppendCardsPayload & PopCardsPayload & PushCardsPayload;

const stateUpdates: StateUpdates<Payloads, State> = {
  appendCardsToStack: (state, action: PayloadAction<AppendCardsPayload>) => {
    const { stackId } = action.payload;
    const stack = state.cardStacks[stackId];
    const newCardIds = action.payload.cards.map((card) => card.id);
    stack?.cardIds.push(...newCardIds);
  },

  pushCardsToStack: (state, action: PayloadAction<PushCardsPayload>) => {
    const { stackId } = action.payload;
    const stack = state.cardStacks[stackId];
    if (stack) {
      const newCardIds = action.payload.cards.map((card) => card.id);
      stack.cardIds = [...newCardIds, ...stack.cardIds];
    }
  },

  popCardsFromStack: (state, action: PayloadAction<PopCardsPayload>) => {
    const { stackId, numCardsToPop } = action.payload;
    const stack = state.cardStacks[stackId];
    if (stack) {
      stack.cardIds = stack.cardIds.slice(numCardsToPop, stack.cardIds.length);
    }
  },
};

const CardComp: React.FC = () => {
    return (
        <div>text</div>
    )
}

const slice = createSlice({
  name: "card",
  initialState,
  reducers: {
    ...stateUpdates,
  },
});

export const Card = {
    reducer: slice.reducer,
}