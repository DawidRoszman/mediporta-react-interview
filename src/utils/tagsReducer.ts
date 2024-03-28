export interface Action{
  payload: TagsSettings;
  type: Type;
}

export enum Type {
  SET_PAGE,
  SET_ROWS_PER_PAGE,
  SET_HAS_MORE,
  SET_ORDER,
  SET_ORDER_BY,
}

export interface TagsSettings {
  page: number;
  rowsPerPage: number;
  has_more: boolean;
  order: "asc" | "desc";
  orderBy: "name" | "popular";
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
    case Type.SET_HAS_MORE:
      return {
        ...state,
        has_more: action.payload.has_more
      }
    case Type.SET_ORDER:
      return {
        ...state,
        order: action.payload.order
      }
    case Type.SET_ORDER_BY:
      return {
        ...state,
        orderBy: action.payload.orderBy
      }
    default:
      return state;
  }
}