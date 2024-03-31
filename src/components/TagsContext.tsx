import { createContext, useReducer } from "react";
import { Action, TagsSettings, tagsReducer } from "../utils/tagsReducer";

export const TagsContext = createContext<TagsSettings | null>(null);

export const DispatchTagsContext = createContext<React.Dispatch<Action> | null>(
  null,
);

const initialTagsSettings: TagsSettings = {
  page: 1,
  rowsPerPage: 5,
  has_more: true,
  order: "desc",
  orderBy: "popular",
};

export function TagsProvider({ children }: { children: React.ReactNode }) {
  const [tags, dispatch] = useReducer(tagsReducer, initialTagsSettings);
  return (
    <TagsContext.Provider value={tags}>
      <DispatchTagsContext.Provider value={dispatch}>
        {children}
      </DispatchTagsContext.Provider>
    </TagsContext.Provider>
  );
}

