import React, { useState } from "react";
import "../css/Header.css";

const Header = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAddTask();
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <input
          id="headerInput"
          type="text"
          placeholder="Запиши, чтобы не забыть"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="header-btn-add"
          onClick={() => onAddTask(inputValue)}
        >
          +
        </button>
      </div>
    </header>
  );
};

export default Header;
