import dayjs from "dayjs";

interface IPostListItem {
  title: string;
  slug: string;
  unique_id: string;
  excerpt: string;
  publish_date: string;
  featured_images: { src: string; title: string }[];
};
export const PostListItem = (props: IPostListItem) => {
  const publishDate = dayjs(props.publish_date);
  const publishDateTime = publishDate.format("MMMM D, YYYY");
  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="group relative">
        <a href={`/${props.slug}-${props.unique_id}/`}>
          <img
            className="h-40 w-full object-cover object-top rounded-md"
            src={props.featured_images?.[0]?.src ?? ""}
            alt={props.featured_images?.[0]?.title ?? ""}
          />
        </a>
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href={`/${props.slug}-${props.unique_id}/`}>
            <span className="absolute inset-0"></span>
            {props.title}
          </a>
        </h3>
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={props.publish_date} className="text-gray-500">
            {publishDateTime}
          </time>
        </div>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam
          vitae illo. Non aliquid explicabo necessitatibus unde. Sed
          exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti
          dicta.
        </p>
      </div>
    </article>
  );
};
