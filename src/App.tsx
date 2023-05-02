import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import PrivateRoute from "routes/PrivateRoute";
import AppLayout from "components/AppLayout";
import LoginPage from "components/LoginPage";
import PropertiesTable from "components/PropertiesTable";
import IngredientsTable from "components/IngredientsTable";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/ingredient-checker">
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              path="/"
              element={<PrivateRoute element={<IngredientsTable />} />}
            />
            <Route
              path="properties"
              element={<PrivateRoute element={<PropertiesTable />} />}
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
