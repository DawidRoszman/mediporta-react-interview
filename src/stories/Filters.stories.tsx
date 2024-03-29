import Filters from "../components/Filters";
import { TagsProvider } from "../components/TagsContext";

export default {
  component: Filters,
  title: 'Filters',
  tags: ['autodocs'],
}

export const Default = {
  decorators: [
    (Story: any) => (
      <TagsProvider>
        <Story />
      </TagsProvider>
    ),
  ],
};

export const Loading = () => <Filters />;