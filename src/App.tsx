import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import LoginPage from "components/LoginPage";
import AppLayout from "components/AppLayout";
import { PropertiesTable } from "components/PropertiesTable";
import { IngredientsTable } from "components/IngredientsTable";
import { userHasFeature } from "utils";
import { Feature } from "types";

const App = () => {
  const currentUser = store.getState().auth.user;

  return (
    <Provider store={store}>
      <BrowserRouter basename="/ingredient-checker">
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<IngredientsTable />} />
            <Route path="properties" element={<PropertiesTable />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
