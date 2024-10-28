import { FC, useEffect, useRef } from "react";
import IMask from "imask";
import styles from "./date-input.module.scss";
import clsx from "clsx";

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
        mask: "d.m.Y",
        lazy: false,
        blocks: {
          d: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2,
          },
          m: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
          },
          Y: {
            mask: IMask.MaskedRange,
            from: 1900,
            to: new Date().getFullYear(),
            maxLength: 4,
          },
        },
      });

      mask.on("accept", () => {
        onChange(mask.value);
      });

      mask.updateValue();
      mask.value = value;

      return () => {
        mask.destroy();
      };
    }
  }, [onChange, value]);

  return (
    <label className={styles.dateInput}>
      {title}
      <input
        className={clsx(
          styles.dateInput__input,
          errorText !== "" ? styles.dateInput__input_error : ""
        )}
        ref={inputRef}
        type="text"
      />
      <span className={styles.dateInput__errorText}>{errorText}</span>
    </label>
  );
};
