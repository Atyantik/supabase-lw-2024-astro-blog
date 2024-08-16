import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  ImageInput,
  ImageField,
  useNotify,
  useRedirect,
  useDataProvider,
  useGetRecordId,
  useGetOne,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import { supabaseClient } from "../../../utils/supabase";

export const PostEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const dataProvider = useDataProvider();
  const recordId = useGetRecordId();

  // Fetch the previous values using useGetOne
  const { data: previousValues, isLoading } = useGetOne('posts', { id: recordId });

  
  const handleSave = async (values: any) => {
    try {
      let updatedFeaturedImages = values.featured_images || [];
      if (!Array.isArray(updatedFeaturedImages) && updatedFeaturedImages.rawFile) {
        updatedFeaturedImages = [updatedFeaturedImages];
      }

      // Check if there are new images to upload
      if (updatedFeaturedImages && updatedFeaturedImages.length > 0) {
        const uploadedImages = [];

        for (const image of updatedFeaturedImages) {
          if (image.rawFile) {
            const file = image.rawFile;
            const fileName = `${file.name}-${Date.now()}`;
            const { data, error } = await supabaseClient
              .storage
              .from('media')
              .upload(`public/${fileName}`, file);

            if (error) {
              throw new Error('Error uploading image: ' + error.message);
            }

            // Get the public URL of the uploaded image
            const { data: { publicUrl } } = supabaseClient
              .storage
              .from('media')
              .getPublicUrl(`public/${fileName}`);

            uploadedImages.push({ src: publicUrl, title: image.title || file.name });
          } else {
            // If image is already uploaded, keep it as is
            uploadedImages.push(image);
          }
        }

        updatedFeaturedImages = uploadedImages;
      }

      // Save the post data with updated featured images
      const updatedValues = { ...values, featured_images: updatedFeaturedImages };
      dataProvider.update('posts', {
        id: previousValues.id,
        data: updatedValues,
        previousData: previousValues,  // Pass previous data here
      }).then(({ data }) => {
        notify('Post updated successfully');
        redirect('list', 'posts');
      });
    } catch (error: any) {
      notify(`Error: ${error.message}`, { type: 'warning' });
    }
  };

  if (isLoading) return null;

  return (
    <Edit>
      <SimpleForm onSubmit={handleSave}>
        <TextInput
          style={{ display: "none" }}
          disabled
          hidden
          label="Id"
          source="id"
        />
        <TextInput source="title" validate={required()} />
        <ImageInput source="featured_images">
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="excerpt" validate={[required()]} multiline />
        <TextInput source="slug" validate={required()} />
        <TextInput source="unique_id" readOnly validate={required()} />
        <RichTextInput source="content" validate={required()} />
        <DateInput label="Publication date" source="publish_date" />
      </SimpleForm>
    </Edit>
  );
};
