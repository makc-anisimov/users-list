import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateEmployee } from '../store/employeesSlice';
import InputMask from 'react-input-mask';
import { RootState } from '../../store';

const EmployeeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state: RootState) => state.employees.employees);
  const employee = employees.find(emp => emp.id === Number(id));

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [isArchive, setIsArchive] = useState<boolean>(false);

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPhone(employee.phone);
      setBirthday(employee.birthday);
      setRole(employee.role);
      setIsArchive(employee.isArchive);
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee) {
      dispatch(updateEmployee({ id: employee.id, name, phone, birthday, role, isArchive }));
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Редактировать сотрудника</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
        required
      />
      <InputMask
        mask="+7 (999) 999-99-99"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Телефон"
        required
      />
      <InputMask
        mask="99.99.9999"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        placeholder="Дата рождения"
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="">Выберите должность</option>
        <option value="cook">Повар</option>
        <option value="waiter">Официант</option>
        <option value="driver">Водитель</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={isArchive}
          onChange={() => setIsArchive(!isArchive)}
        />
        В архиве
      </label>
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default EmployeeForm;
