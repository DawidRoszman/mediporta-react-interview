import { createContext, useContext, useReducer } from "react";
import { TagsSettings, tagsReducer } from "../utils/tagsReducer";

export const TagsContext = createContext<TagsSettings | null>(null);

export const DispatchTagsContext = createContext<React.Dispatch<any> | null>(null);

export function useTags() {
  return useContext(TagsContext);
}

export function useDispatchTags() {
  return useContext(DispatchTagsContext);
}

const initialTagsSettings: TagsSettings = {
  page: 1,
  rowsPerPage: 5
}

export function TagsProvider({ children }: { children: React.ReactNode }) {
  const [tags, dispatch] = useReducer(tagsReducer, initialTagsSettings);
  return (
    <TagsContext.Provider value={tags}>
      <DispatchTagsContext.Provider value={dispatch}>
        {children}
      </DispatchTagsContext.Provider>
    </TagsContext.Provider>
  )
}