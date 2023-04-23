import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector, Id, StateUpdates, idOrDefault } from '../framework';


interface State {
  timelines: Record<Id, TimelineState | undefined>;
}

interface TimelineState {
  loading: boolean,
}

const initialState: State = {
  timelines: {
    'default': {
      loading: false,
    }
  },
};

export function useTimeline(id?: string): TimelineState | undefined {
  return useAppSelector(
    (state) => state.ui.timelineState.timelines[idOrDefault(id)]
  );
}

export function useUpsertTimeline(): (
  timeline: Partial<TimelineState>,
  id?: string,
) => void {
  const dispatch = useAppDispatch();
  return (timeline, timelineId) =>
    dispatch(upsertTimeline({ timeline, timelineId }));
}

interface UpsertTimelinePayload {
  timelineId?: Id;
  timeline: Partial<TimelineState>;
}

const stateUpdates: StateUpdates<UpsertTimelinePayload, State> = {
  upsertTimeline: (state, action: PayloadAction<UpsertTimelinePayload>) => {
    const timeline = state.timelines[idOrDefault(action.payload.timelineId)];
    if(timeline) {
      Object.entries(action.payload.timeline).forEach(([key, value]) => {
        const typedKey = key as keyof TimelineState;
        timeline[typedKey] = value as TimelineState[typeof typedKey];
      })
    }
  },
};

const slice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    ...stateUpdates,
  },
});

export const { upsertTimeline } = slice.actions;

const Timeline: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={className}
  >
    {children}
  </div>
);

export const _Timeline = {
  reducer: slice.reducer
}

export default Timeline