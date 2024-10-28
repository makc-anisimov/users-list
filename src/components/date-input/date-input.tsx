import { FC, useEffect, useRef } from "react";
import IMask from "imask";
import styles from "./date-input.module.scss";

interface DateInputProps {
  value: string;
  title: string;
  errorText: string;
  onChange: (value: string) => void;
}

export const DateInput: FC<DateInputProps> = ({
  value,
  onChange,
  title,
  errorText,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const mask = IMask(inputRef.current, {
        mask: Date,
        lazy: false, // показывать маску даже если поле пустое
      });

      // Обновление значения
      mask.on("accept", () => {
        onChange(mask.value);
      });

      // Установка начального значения при монтировании
      inputRef.current.value = value;

      return () => {
        mask.destroy(); // Уничтожаем маску при размонтировании компонента
      };
    }
  }, [onChange, value]); // Добавляем value в зависимости

  return (
    <label className={styles.phoneInput}>
      {title}
      <input
        className={styles.phoneInput__input}
        ref={inputRef}
        type="text"
        onChange={(e) => onChange(e.target.value)} // Обработка изменения
        required
      />
      <span className={styles.phoneInput__errorText}>{errorText}</span>
    </label>
  );
};

