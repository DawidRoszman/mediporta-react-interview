import PageSelection from "../components/PageSelection";
import { TagsProvider } from "../components/TagsContext";

export default {
  component: PageSelection,
  title: 'Page Selection',
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