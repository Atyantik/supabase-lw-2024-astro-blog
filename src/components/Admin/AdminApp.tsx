import {
  Admin,
  CustomRoutes,
  Resource,
} from "react-admin";
import { Route } from 'react-router-dom';
import { LoginPage, SetPasswordPage, ForgotPasswordPage } from "ra-supabase";
import { authProvider } from "../../utils/authProvider";
import { dataProvider } from "../../utils/dataProvider";
import { PostCreate } from "./Posts/PostCreate";
import { PostEdit } from "./Posts/PostEdit";
import { PostList } from "./Posts/PostList";

const AdminApp = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
  >
    <CustomRoutes noLayout>
      <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
      <Route path={ForgotPasswordPage.path} element={<ForgotPasswordPage />} />
    </CustomRoutes>
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      recordRepresentation="title"
    />
  </Admin>
);

export default AdminApp;
