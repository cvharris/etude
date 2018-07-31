import { createSelector } from 'reselect'
import {
  CREATE_RUN,
  DELETE_RUN,
  SWITCH_RUN,
  UPDATE_RUN
} from '../conf/ActionTypes'

// Actions
export const switchRun = runId => ({ type: SWITCH_RUN, payload: runId })
export const deleteRun = runId => ({ type: DELETE_RUN, payload: runId })
export const createRun = run => ({ type: CREATE_RUN, payload: run })
export const updateRun = run => ({ type: UPDATE_RUN, payload: run })

// Initial State
export const initialState = {
  allIds: [],
  byId: {},
  selectedRunId: null
}

// Reducer
export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_RUN:
      return {
        allIds: [...state.allIds, payload.id],
        byId: { ...state.byId, [payload.id]: payload },
        selectedRunId: payload.id
      }
    case UPDATE_RUN:
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: payload }
      }
    case DELETE_RUN:
      const { [payload.id]: deletedRun, ...otherRuns } = state.byId
      return {
        ...state,
        allIds: state.allIds(runId => runId !== deletedRun.id),
        byId: otherRuns
      }
    case SWITCH_RUN:
      return {
        ...state,
        selectedRunId: payload
      }
    default:
      return state
  }
}

// Selectors
const runsById = state => state.practiceRuns.byId
const runsAllIds = state => state.practiceRuns.allIds
const activeRunId = state => state.practiceRuns.selectedRunId

export const getCurrentRun = createSelector(
  [runsById, activeRunId],
  (byId, activeId) => byId[activeId]
)

export const allRuns = createSelector(
  [runsAllIds, runsById],
  (allIds, runsById) => allIds.map(runId => runsById[runId])
)
