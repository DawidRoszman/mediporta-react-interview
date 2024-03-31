import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Filters from "./components/Filters";
import PageSelection from "./components/PageSelection";
import { TagsProvider } from "./components/TagsContext";
import TagsData from "./components/TagsData";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TagsProvider>
        <Filters />
        <TagsData />
        <PageSelection pageCount={25} />
      </TagsProvider>
    </QueryClientProvider>
  );
}

export default App;
