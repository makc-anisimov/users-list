import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { addEmployee } from "../../store/employeesSlice";
import { IEmployee } from "../../types/employee";
import { EmployeeForm } from "../../components";
import styles from "./add-employee.module.scss";

export const AddEmployeePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleFormSubmit = (data: IEmployee) => {
    const newEmployee = { ...data, id: Date.now() }; // Генерация уникального id
    dispatch(addEmployee(newEmployee));
    navigate("/");
  };
  const handleFormClose = () => {
    navigate("/");
  };

  return (
    <section className={styles.addEmployee}>
      <EmployeeForm
        formTitle="Добавить сотрудника"
        onSubmit={handleFormSubmit}
        onClose={handleFormClose}
      />
    </section>
  );
};
