import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import LoginPage from "components/LoginPage";
import AppLayout from "components/AppLayout";
import { PropertiesTable } from "components/PropertiesTable";
import { IngredientsTable } from "components/IngredientsTable";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/ingredient-checker">
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<IngredientsTable />} />
            <Route path="properties" element={<PropertiesTable />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
