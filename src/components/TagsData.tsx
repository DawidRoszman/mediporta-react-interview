import { useQuery } from '@tanstack/react-query';
import { fetchTags } from '../utils/queries';
import { Type } from '../utils/tagsReducer';
import { useDispatchTags, useTags } from './TagsContext';
import TableLoadingSkeleton from './TableLoadingSkeleton';
import ErrorState from './ErrorState';
import TagsTable from './TagsTable';

const TagsData = () => {
  const tagsSettings = useTags();
  const tagsDispatch = useDispatchTags();
  if (tagsSettings === null || tagsDispatch === null) return <TableLoadingSkeleton rowsPerPage={5} />;
  const { page, rowsPerPage, order, orderBy } = tagsSettings;


  const fetchTagsHelper = async () => {
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
    queryKey: ["tags", page, rowsPerPage, order, orderBy],
    queryFn: fetchTagsHelper,
  });


  if (query.isPending)
    return (
      <TableLoadingSkeleton rowsPerPage={rowsPerPage} />
    );
  if (query.isError)
    return (
      <ErrorState errorMessage={query.error.message} />
    );

  const rows = query.data.items.map((item: any) => {
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