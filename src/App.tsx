import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/store";
import AppLayout from "components/AppLayout";
import { PropertiesTable } from "components/PropertiesTable";
import { Logout } from "components/Logout";
import { IngredientsTable } from "components/IngredientsTable";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<IngredientsTable />} />
            <Route path="properties" element={<PropertiesTable />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
