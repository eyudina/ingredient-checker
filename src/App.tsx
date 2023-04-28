import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import LoginPage from "components/LoginPage";
import AppLayout from "components/AppLayout";
import { PropertiesTable } from "components/PropertiesTable";
import { IngredientsTable } from "components/IngredientsTable";
import PrivateRoute from "components/PrivateRoute";

const App = () => {
  const currentUser = store.getState().auth.user;

  return (
    <Provider store={store}>
      <BrowserRouter basename="/ingredient-checker">
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              path="/"
              element={
                <PrivateRoute element={<IngredientsTable />}></PrivateRoute>
              }
            />
            <Route
              path="properties"
              element={
                <PrivateRoute element={<PropertiesTable />}></PrivateRoute>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
