import { FC, useEffect, useRef } from "react";
import IMask from "imask";
import styles from "./phone-input.module.scss";
import clsx from "clsx";

interface PhoneInputProps {
  value: string;
  title: string;
  errorText: string;
  onChange: (value: string) => void;
  setPhoneErrorText: (error: string) => void;
}

export const PhoneInput: FC<PhoneInputProps> = ({
  value,
  onChange,
  title,
  errorText,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const mask = IMask(inputRef.current, {
        mask: "+7 (000) 000-0000",
        lazy: false,
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
    <label className={styles.phoneInput}>
      {title}
      <input
        className={clsx(
          styles.phoneInput__input,
          errorText !== "" ? styles.phoneInput__input_error : ""
        )}
        ref={inputRef}
        type="text"
        placeholder="+7 (123) 456-7890"
      />
      <span className={styles.phoneInput__errorText}>{errorText}</span>
    </label>
  );
};
