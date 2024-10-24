import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import styles from './employees.module.scss'
// import EmployeesList from '../list/list';

const EmployeesPage: React.FC = () => {
  // const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employees.employees);
  
  const [filterRole, setFilterRole] = useState<string>('');
  const [filterArchive, setFilterArchive] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('');

  const filteredEmployees = employees
    .filter(emp => (filterRole ? emp.role === filterRole : true))
    .filter(emp => (filterArchive ? emp.isArchive : true))
    .sort((a, b) => {
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      if (sortOption === 'birthday') return new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
      return 0;
    });

  return (
    <section className={styles.employees}>
      <h1 className={styles.employees__title}>Список сотрудников</h1>
      
      <div>
        <select onChange={(e) => setFilterRole(e.target.value)}>
          <option value="">Все роли</option>
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={filterArchive}
            onChange={() => setFilterArchive(!filterArchive)}
          />
          В архиве
        </label>
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Сортировка</option>
          <option value="name">По имени</option>
          <option value="birthday">По дате рождения</option>
        </select>
      </div>
      {/* <EmployeesList/> */}
      {/* <ul>
        {filteredEmployees.map(employee => (
          <li key={employee.id}>
            <Link to={`/employee/${employee.id}`}>
              {employee.name} - {employee.role} - {employee.phone}
            </Link>
          </li>
        ))}
      </ul> */}
    </section>
  );
};

export default EmployeesPage;
