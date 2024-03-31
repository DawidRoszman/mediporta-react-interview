interface SetPageAction {
  type: Type.SET_PAGE;
  payload: { page: number };
}

interface SetRowsPerPageAction {
  type: Type.SET_ROWS_PER_PAGE;
  payload: { rowsPerPage: number };
}

interface SetHasMoreAction {
  type: Type.SET_HAS_MORE;
  payload: { has_more: boolean };
}

interface SetOrderAction {
  type: Type.SET_ORDER;
  payload: { order: "asc" | "desc" };
}

interface SetOrderByAction {
  type: Type.SET_ORDER_BY;
  payload: { orderBy: "name" | "popular" };
}

export type Action =
  | SetPageAction
  | SetRowsPerPageAction
  | SetHasMoreAction
  | SetOrderAction
  | SetOrderByAction;

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
        page: action.payload.page,
      };
    case Type.SET_ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: action.payload.rowsPerPage,
      };
    case Type.SET_HAS_MORE:
      return {
        ...state,
        has_more: action.payload.has_more,
      };
    case Type.SET_ORDER:
      return {
        ...state,
        order: action.payload.order,
      };
    case Type.SET_ORDER_BY:
      return {
        ...state,
        orderBy: action.payload.orderBy,
      };
    default:
      return state;
  }
};

