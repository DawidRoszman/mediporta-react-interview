import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ListOfTags from '../components/ListOfTags';
import { TagsProvider } from '../components/TagsContext';

export default {
  component: ListOfTags,
  title: 'List of Tags',

}
const queryClient = new QueryClient();

export const Default = {
  decorators: [
    (Story: any) => (
      <QueryClientProvider client={queryClient}>
        <TagsProvider>
          <Story />
        </TagsProvider>
      </QueryClientProvider>
    ),
  ],
};