import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Filters from "./components/Filters"
import ListOfTags from "./components/ListOfTags"
import PageSelection from "./components/PageSelection"
import { TagsProvider } from "./components/TagsContext";

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TagsProvider>
        <Filters />
        <ListOfTags />
        <PageSelection />
      </TagsProvider>
    </QueryClientProvider>
  )
}

export default App
