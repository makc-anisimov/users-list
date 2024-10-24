import React from "react";
import styles from "./list.module.scss";
import { IEmployee } from "../../types/employee";
import { Link } from "react-router-dom";

export const EmployeesList = ({
  employeesData,
}: {
  employeesData: IEmployee[];
}) => {
  // 'driver' | 'waiter' | 'cook';
  const translateRole = (text: string) => {
    switch (text) {
      case "driver":
        return "Водитель";
      case "waiter":
        return "Официант";
      case "cook":
        return "Повар";
      default:
        return text;
    }
  };
  return (
    <ul className={styles.employeesList}>
      <li className={styles.employeesList__item}>
        <div className={styles.employeesList__header}>
          <span className={styles.employeesList__name}>Имя</span>
          <span className={styles.employeesList__birthday}>Дата рождения</span>

          <span className={styles.employeesList__role}>Должность </span>
          <span className={styles.employeesList__phone}>Телефон </span>
        </div>
      </li>
      {employeesData.map((employee) => (
        <li className={styles.employeesList__item} key={employee.id}>
          <Link
            className={styles.employeesList__link}
            to={`/employee/${employee.id}`}
          >
            <span className={styles.employeesList__name}>{employee.name}</span>
            <span className={styles.employeesList__birthday}>
              {employee.birthday}
            </span>

            <span className={styles.employeesList__role}>
              {translateRole(employee.role)}
            </span>
            <span className={styles.employeesList__phone}>
              {employee.phone}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
// export default EmployeesList;
