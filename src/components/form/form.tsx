import React, { useState, useEffect } from "react";
import { IEmployee } from "../../types/employee";
import styles from "./form.module.scss";
import clsx from "clsx";
import { DateInput, PhoneInput } from "../index"; // Импортируем DateInput и PhoneInput

interface EmployeeFormProps {
  formTitle: string;
  initialData?: IEmployee;
  onSubmit: (data: IEmployee) => void;
  onClose: () => void;
}

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

  const [nameErrorText, setNameErrorText] = useState<string>("");
  const [phoneErrorText, setPhoneErrorText] = useState<string>("");
  const [dateErrorText, setDateErrorText] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        birthday: initialData.birthday ? initialData.birthday : "",
      });
    }
  }, [initialData]);

  const handlePhoneChange = (value: string) => {
    setPhoneErrorText("");
    setFormData({ ...formData, phone: value });
  };

  const handleDateChange = (value: string) => {
    setDateErrorText("");
    setFormData({ ...formData, birthday: value });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNameErrorText("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "isArchive" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false; // Флаг для отслеживания ошибок

    // Проверка имени
    if (formData.name.length === 0) {
      setNameErrorText("Имя должно быть заполнено");
      hasErrors = true;
    }

    // Проверка телефона
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      setPhoneErrorText("Некорректный номер телефона");
      hasErrors = true;
    }

    // Проверка даты
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;
    if (!dateRegex.test(formData.birthday)) {
      setDateErrorText("Некорректная дата");
      hasErrors = true;
    }

    // Если есть ошибки, не отправляем форму
    if (!hasErrors) {
      onSubmit(formData);
    }
  };

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
          className={clsx(
            styles.form__input,
            styles.form__input_name,
            nameErrorText !== "" ? styles.form__input_error : ""
          )}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {nameErrorText !== "" && (
          <span className={styles.form__errorTextInput}>{nameErrorText}</span>
        )}
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
        errorText={phoneErrorText}
        setPhoneErrorText={setPhoneErrorText}
        value={formData.phone}
        onChange={handlePhoneChange}
      />
      <DateInput
        title="День рождения"
        errorText={dateErrorText}
        value={formData.birthday}
        onChange={handleDateChange}
      />
      <label className={clsx(styles.form__label, styles.form__label_checkbox)}>
        В архиве:
        <input
          type="checkbox"
          name="isArchive"
          checked={formData.isArchive}
          onChange={handleChange}
        />
      </label>
      <button className={styles.form__submitButton} type="submit">
        Сохранить
      </button>
    </form>
  );
};
