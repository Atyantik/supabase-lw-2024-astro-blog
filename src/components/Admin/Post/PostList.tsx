import {
  List,
  Datagrid,
  TextField,
  DateField,
  ArrayField,
  SingleFieldList,
  ImageField,
} from "react-admin";
import PostUrl from "./PostUrl";

export const PostList = () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <PostUrl />
      <ArrayField source="featured_images" label="Featured Image">
        <SingleFieldList>
          <ImageField source="src" title="title" />
        </SingleFieldList>
      </ArrayField>
      <TextField source="excerpt" />
      <DateField source="publish_date" />
    </Datagrid>
  </List>
);
