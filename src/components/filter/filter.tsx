import React from "react";
import styles from "./filter.module.scss";

export default const filter: React.FC = () => {
  return (
    
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
  );

}