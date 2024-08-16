import { useRecordContext } from 'react-admin';

const PostUrl = (props: { label?: string }) => {
  const record = useRecordContext();
  if (!record || !record.slug || !record.unique_id) return null;
  const url = `/${record.slug}-${record.unique_id}/`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {props.label ?? url}
    </a>
  );
};

export default PostUrl;
