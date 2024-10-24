// import React  from 'react';
 import styles from './list.module.scss';
import { IEmployee } from '../../types/employee';
import { Link } from 'react-router-dom';

 const EmployeesList = (employeesData: IEmployee[]) => {
  return (
    <ul className={styles.employeesList}>
      {employeesData.map(employee => (
        <li key={employee.id}>
          <Link to={`/employee/${employee.id}`}>
                {employee.name} - {employee.role} - {employee.phone}
          </Link>
        </li>
      ))

      }
    </ul>
  );

}
export default EmployeesList;