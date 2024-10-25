import React, { useState, useEffect } from "react";
import { IEmployee } from "../../types/employee";
import styles from "./form.module.scss";
import clsx from "clsx";
import { CustomSelect } from "../select/select";

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

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        birthday: initialData.birthday ? parseDate(initialData.birthday) : "",
      });
    }
  }, [initialData]);

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

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.form__closeButton} type="button" onClick={onClose}/>
      <h2 className={styles.form__title}>{formTitle}</h2>
      <label className={styles.form__label}>
        Имя:
        <input
          className={clsx(styles.form__input, styles.form__input_name)}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.form__label}>
        Роль:
        {/* <CustomSelect
          options={[
            { value: "driver", name: "Водитель" },
            { value: "waiter", name: "Официант" },
            { value: "cook", name: "Повар" },
          ]}
          onChange={() => console.log("test select")}
        /> */}
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
      <label className={styles.form__label}>
        Телефон:
        <input
          className={clsx(styles.form__input, styles.form__input_phone)}
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </label>
      <label className={styles.form__label}>
        День рождения:
        <input
          className={clsx(styles.form__input, styles.form__input_birthday)}
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />
      </label>
      <label className={clsx(styles.form__label, styles.form__label_checkbox)}>
        В архиве:
        <input
          // className={clsx(styles.form__input, styles.form__input_birthday)}
          type="checkbox"
          name="isArchive"
          checked={formData.isArchive}
          onChange={handleChange}
        />
      </label>
      <button className={clsx(styles.form__submitButton,/* styles.form__submitButton_active*/ )} type="submit">
        Сохранить
      </button>
    </form>
  );
};
