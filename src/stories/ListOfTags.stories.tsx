import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TagsTable from '../components/TagsTable';
import { TagsProvider } from '../components/TagsContext';
import TableLoadingSkeleton from '../components/TableLoadingSkeleton';
import ErrorState from '../components/ErrorState';
import React from 'react';

export default {
  component: TagsTable,
  title: 'Tags Table',
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: {
        type: 'object'
      }
    },
    order: {
      control: {
        type: 'select',
        options: ['asc', 'desc']
      }
    },
    orderBy: {
      control: {
        type: 'select',
        options: ['name', 'popular']
      }
    }
  },

}
const queryClient = new QueryClient();

export const Default = {
  decorators: [
    (Story: React.FC) => (
      <QueryClientProvider client={queryClient}>
        <TagsProvider>
          <Story />
        </TagsProvider>
      </QueryClientProvider>
    ),
  ],
  args: {
    data: [
      {
        name: 'tag1',
        count: 1,
      },
      {
        name: 'tag2',
        count: 2,
      },
    ],
    order: "desc",
    orderBy: "popular"
  }
};

export const Loading = () => <TableLoadingSkeleton rowsPerPage={5} />;
export const Error = () => <ErrorState errorMessage="Error message" />;
