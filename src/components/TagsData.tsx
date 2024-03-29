import { useQuery } from '@tanstack/react-query';
import { fetchTags } from '../utils/queries';
import { Type } from '../utils/tagsReducer';
import TableLoadingSkeleton from './TableLoadingSkeleton';
import ErrorState from './ErrorState';
import TagsTable from './TagsTable';
import { useDispatchTags, useTags } from '../utils/useTags';

const TagsData = () => {
  const tagsSettings = useTags();
  const tagsDispatch = useDispatchTags();

  const fetchTagsHelper = async () => {
    if (tagsSettings === null || tagsDispatch === null) return;
    const data = await fetchTags(page, rowsPerPage, order, orderBy);
    if (data.has_more) {
      tagsDispatch(
        {
          type: Type.SET_HAS_MORE,
          payload: {
            has_more: data.has_more,
          },
        }
      )
    }
    return data;
  };

  const query = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTagsHelper,
  });
  if (tagsSettings === null || tagsDispatch === null) return <TableLoadingSkeleton rowsPerPage={5} />;
  const { page, rowsPerPage, order, orderBy } = tagsSettings;



  if (query.isPending)
    return (
      <TableLoadingSkeleton rowsPerPage={rowsPerPage} />
    );
  if (query.isError)
    return (
      <ErrorState errorMessage={query.error.message} />
    );

  const rows = query.data.items.map((item: {
    name: string;
    count: number;
  }) => {
    return {
      name: item.name,
      count: item.count,
    };
  });
  return (
    <TagsTable data={rows} tagsDispatch={tagsDispatch} order={order} orderBy={orderBy} />
  )
}

export default TagsData