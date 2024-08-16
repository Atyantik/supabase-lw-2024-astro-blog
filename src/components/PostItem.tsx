import dayjs from "dayjs";

interface IPostItem {
  title: string;
  slug: string;
  unique_id: string;
  excerpt: string;
  publish_date: string;
  content: string;
  featured_images: { src: string; title: string }[];
}

export const PostItem = (props: IPostItem) => {
  const publishDate = dayjs(props.publish_date);
  const publishDateTime = publishDate.format("MMMM D, YYYY");
  return (
    <div>
      <div className="flex text-left max-w-4xl flex-col mx-auto">
        <div className="mx-auto">
          <a
            href="/"
            className="block my-4 text-xl leading-7 text-indigo-600"
          >
            ← Go Back
          </a>
        </div>
      </div>
      <img
        style={{ maxHeight: "60dvh" }}
        src={props.featured_images?.[0]?.src ?? ""}
        alt={props.featured_images?.[0]?.title ?? props.title}
        className="w-full object-cover object-top"
      />
      <div className="flex justify-center max-w-4xl flex-col mx-auto">
        <div className="mx-auto">
          <div>
            <p className="mt-3 text-xl font-semibold leading-7 text-indigo-600">
              {publishDateTime}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {props.title}
            </h1>
            <div
              className="mt-6 text-xl leading-8 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: props.content,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
