import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  ImageInput,
  ImageField,
  useNotify,
  useRedirect,
  useDataProvider,
} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { supabaseClient } from '../../../utils/supabase';

export const PostCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const dataProvider = useDataProvider();

  const handleSave = async (values: any) => {
    try {
      let updatedFeaturedImages = values.featured_images || [];

      // Handle single image input correctly (if it's not an array yet)
      if (!Array.isArray(updatedFeaturedImages) && updatedFeaturedImages.rawFile) {
        updatedFeaturedImages = [updatedFeaturedImages];
      }

      // Check if there are new images to upload
      if (updatedFeaturedImages.length > 0) {
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
          }
        }

        updatedFeaturedImages = uploadedImages;
      }

      // Save the post data with updated featured images
      const updatedValues = { ...values, featured_images: updatedFeaturedImages };
      dataProvider.create('posts', { data: updatedValues }).then(({ data }) => {
        notify('Post created successfully');
        redirect('list', 'posts');
      });
    } catch (error: any) {
      notify(`Error: ${error.message}`, { type: 'warning' });
    }
  };

  return (
    <Create>
      <SimpleForm onSubmit={handleSave}>
        <TextInput source="title" validate={[required()]} />
        <ImageInput source="featured_images" label="Featured Images" multiple>
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="excerpt" validate={[required()]} multiline />
        <RichTextInput source="content" />
        <DateInput
          label="Publication date"
          source="publish_date"
          defaultValue={new Date()}
        />
      </SimpleForm>
    </Create>
  );
};
