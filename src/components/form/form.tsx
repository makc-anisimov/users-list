import React, { useState, useEffect } from "react";
import { IEmployee } from "../../types/employee";
import styles from "./form.module.scss";
import clsx from "clsx";
import {PhoneInput} from "../index";

interface EmployeeFormProps {
  formTitle: string;
  initialData?: IEmployee;
  onSubmit: (data: IEmployee) => void;
  onClose: () => void;
}

const formatDate = (date: string): string => {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
};

const parseDate = (date: string): string => {
  const [day, month, year] = date.split(".");
  return `${year}-${month}-${day}`;
};

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData,
  onSubmit,
  formTitle,
  onClose,
}) => {
  const [formData, setFormData] = useState<IEmployee>(
    initialData || {
      id: 0,
      name: "",
      isArchive: false,
      role: "driver",
      phone: "",
      birthday: "",
    }
  );

  const [textErrorName, setTextErrorName] = useState<string>("");
  const [textErrorPhone, setTextErrorPhone] = useState<string>("");
  const [textErrorBirthday, setTextErrorBirthday] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        birthday: initialData.birthday ? initialData.birthday : "",
      });
    }
  }, [initialData]);

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "isArchive" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, birthday: formatDate(formData.birthday) });
  };
  useEffect(() => {}, [formData]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button
        className={styles.form__closeButton}
        type="button"
        onClick={onClose}
      />
      <h2 className={styles.form__title}>{formTitle}</h2>
      <label className={styles.form__label}>
        Имя
        <input
          className={clsx(styles.form__input, styles.form__input_name)}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <span className={styles.form__errorTextInput}>errorText</span>
      </label>
      <label className={styles.form__label}>
        Роль:
        <select
          className={styles.form__select}
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="driver">Водитель</option>
          <option value="waiter">Официант</option>
          <option value="cook">Повар</option>
        </select>
      </label>
      <PhoneInput
        title="Телефон"
        errorText="ww"
        value={formData.phone}
        onChange={handlePhoneChange} // Используем новый обработчик
      />
      <label className={styles.form__label}>
        День рождения:{formData.birthday}
        <input
          className={clsx(styles.form__input, styles.form__input_birthday)}
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          maxLength={8}
        />
      </label>
      <label className={clsx(styles.form__label, styles.form__label_checkbox)}>
        В архиве:
        <input
          type="checkbox"
          name="isArchive"
          checked={formData.isArchive}
          onChange={handleChange}
        />
      </label>
      <button
        className={clsx(
          styles.form__submitButton /* styles.form__submitButton_active*/
        )}
        type="submit"
      >
        Сохранить
      </button>
    </form>
  );
};
