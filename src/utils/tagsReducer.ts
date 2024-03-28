export interface Action{
  payload: TagsSettings;
  type: Type;
}

export enum Type {
  SET_PAGE,
  SET_ROWS_PER_PAGE,
}

export interface TagsSettings {
  page: number;
  rowsPerPage: number;
}

export const tagsReducer = (state: TagsSettings, action: Action) => {
  switch (action.type) {
    case Type.SET_PAGE:
      return {
        ...state,
        page: action.payload.page
      }
    case Type.SET_ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: action.payload.rowsPerPage
      }
    default:
      return state;
  }
}