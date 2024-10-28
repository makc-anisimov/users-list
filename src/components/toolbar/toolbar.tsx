import React from "react";
import styles from "./toolbar.module.scss";
import { Link } from "react-router-dom";
import PlusIcon from "../../assets/images/plus.svg";

interface ToolbarProps {
  filterRole: string;
  setFilterRole: (role: string) => void;
  filterArchive: boolean;
  setFilterArchive: (isArchive: boolean) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  filterRole,
  setFilterRole,
  filterArchive,
  setFilterArchive,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__filter}>
        <select
          className={styles.toolbar__filterSelect}
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">Все роли</option>
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>

        <select
          className={styles.toolbar__filterSelect}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option
            className={styles.toolbar__filterSelectOption}
            value=""
            disabled
          >
            Сортировка
          </option>
          <option
            className={styles.toolbar__filterSelectOption}
            value="nameAsc"
          >
            По имени (A-Z)
          </option>
          <option
            className={styles.toolbar__filterSelectOption}
            value="nameDesc"
          >
            По имени (Z-A)
          </option>
          <option
            className={styles.toolbar__filterSelectOption}
            value="birthdayAsc"
          >
            По дате рождения (сначала старшие)
          </option>
          <option
            className={styles.toolbar__filterSelectOption}
            value="birthdayDesc"
          >
            По дате рождения (сначала младшие)
          </option>
        </select>
        <label className={styles.toolbar__checkBoxContainer}>
          <input
            className={styles.toolbar__checkBox}
            type="checkbox"
            checked={filterArchive}
            onChange={() => setFilterArchive(!filterArchive)}
          />
          В архиве
        </label>
      </div>
      <Link to="/add" className={styles.toolbar__addButton}>
        <img
          className={styles.toolbar__addButtonSymb}
          src={PlusIcon}
          alt="plus symbol"
        />
        <span className={styles.toolbar__addButtonText}>
          Добавить сотрудника
        </span>
      </Link>
    </div>
  );
};

export default Toolbar;
