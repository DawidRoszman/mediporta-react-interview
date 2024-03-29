import PageSelection from "../components/PageSelection";
import { TagsProvider } from "../components/TagsContext";

export default {
  component: PageSelection,
  title: 'Page Selection',
  tags: ['autodocs'],
  argTypes: {
    pageCount: {
      control: {
        type: 'number'
      }
    }

  }
}

export const Default = {
  decorators: [
    (Story: any) => (
      <TagsProvider>

        <Story />
      </TagsProvider>
    ),
  ],
  args: {
    pageCount: 25
  }
};

export const Loading = () => {
  return <PageSelection pageCount={25} />
}