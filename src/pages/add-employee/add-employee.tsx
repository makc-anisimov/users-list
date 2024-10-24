import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../store/employeesSlice';
import InputMask from 'react-input-mask';

const AddEmployee: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [isArchive, setIsArchive] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = {
      id: Date.now(),
      name,
      phone,
      birthday,
      role,
      isArchive,
    };
    dispatch(addEmployee(newEmployee));
    // Сброс формы после добавления
    setName('');
    setPhone('');
    setBirthday('');
    setRole('');
    setIsArchive(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить нового сотрудника</h2>
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
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddEmployee;
