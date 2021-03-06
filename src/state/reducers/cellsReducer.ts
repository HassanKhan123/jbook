import produce from 'immer';

import { ActionTypes } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.MOVE_CELL:
      return state;
    case ActionTypes.DELETE_CELL:
      return state;
    case ActionTypes.INSERT_CELL_BEFORE:
      return state;
    case ActionTypes.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return;
    default:
      return state;
  }
});

export default reducer;
