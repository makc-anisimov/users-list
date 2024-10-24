import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import NotFoundPage from './pages/not-found/not-found';
import EmployeesPage from './pages/employees/employees';
// import EmployeeList from './components/EmployeeList';
// import EmployeeForm from './components/EmployeeForm';
// import AddEmployee from './components/AddEmployee';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<EmployeesPage/>} />
          {/* <Route path="/employee/:id" element={<EmployeeForm />} /> */}
          {/* <Route path="/add" element={<AddEmployee />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
