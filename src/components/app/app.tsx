import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import {
  AddEmployeePage,
  EditEmployeePage,
  EmployeesPage,
  NotFoundPage,
} from "../../pages";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router basename="/users-list">
        <Routes>
          <Route path="/" element={<EmployeesPage />} />
          <Route path="/edit/:id" element={<EditEmployeePage />} />
          <Route path="/add" element={<AddEmployeePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
