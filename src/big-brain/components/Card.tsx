import { PayloadAction } from '@reduxjs/toolkit'
import { StateUpdates } from '../state'

type Id = string

export interface UIState {
  cardStacks: Record<Id, CardStackState>;
  cards: Record<Id, CardState>;
}

export const initialUIState: UIState = {
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

export const stateUpdates: StateUpdates<Payloads> = {

    appendCardsToStack: (state, action: PayloadAction<AppendCardsPayload>) => {
        const { stackId } = action.payload
        const stack = state.ui.cardStacks[stackId];
        const newCardIds = action.payload.cards.map((card) => card.id)
        stack.cardIds.push(...newCardIds);
    },
    
    pushCardsToStack: (state, action: PayloadAction<PushCardsPayload>) => {
        const { stackId } = action.payload
        const stack = state.ui.cardStacks[stackId];    
        const newCardIds = action.payload.cards.map((card) => card.id)
        stack.cardIds = [...newCardIds, ...stack.cardIds];
    },
    
    popCardsFromStack: (state, action: PayloadAction<PopCardsPayload>) => {
        const { stackId, numCardsToPop } = action.payload
        const stack = state.ui.cardStacks[stackId];
        stack.cardIds = stack.cardIds.slice(numCardsToPop, stack.cardIds.length)
    }
};

const Card: React.FC = () => {
    return (
        <div>text</div>
    )
}