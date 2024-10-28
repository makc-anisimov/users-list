import React, { useState } from "react";
import "./select.module.scss";

interface Option {
  value: string;
  name: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const toggleOptions = () => setIsOpen(!isOpen);

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option.value); // вызов функции onChange с выбранным значением
  };

  return (
    <div className="custom-select-container">
      <div className="custom-select-box" onClick={toggleOptions}>
        <div className="custom-select-selected">
          {selectedOption ? selectedOption.name : "Выберите значение"}
        </div>
      </div>
      {isOpen && (
        <div className="custom-select-options">
          {options.map((option) => (
            <div
              key={option.value}
              className="custom-select-option"
              onClick={() => handleSelectOption(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
