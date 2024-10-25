import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";
import { updateEmployee } from "../../store/employeesSlice";
import { IEmployee } from "../../types/employee";
import { EmployeeForm } from "../../components";
import styles from "./edit-employee.module.scss";
import NotFoundImage from "../../assets/images/404.webp";

export const EditEmployeePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const employee = useSelector((state: RootState) =>
    state.employees.employees.find((emp) => emp.id === Number(id))
  );

  const handleFormSubmit = (data: IEmployee) => {
    dispatch(updateEmployee(data));
    navigate("/");
  };
  const handleFormClose = () => {
    navigate("/");
  };
  return (
    <section className={styles.edit}>
      {employee ? (
        <EmployeeForm
          initialData={employee}
          formTitle="Редактировать сотрудника"
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      ) : (
        <>
          <p className={styles.edit__errorText}>Пользователь не найден</p>
          <img
            className={styles.edit__image}
            src={NotFoundImage}
            alt="404 Not Found"
          />
          <Link to="/" className={styles.edit__homeLink}>
            Вернуться на главную
          </Link>
        </>
      )}
    </section>
  );
};
