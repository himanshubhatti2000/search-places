import React, { useState, useEffect, useRef } from "react";
import "./style.css"; // Adjust the path if necessary

interface SearchBoxProps {
  onSearch: (value: string) => void;
  onDebouncedSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  onDebouncedSearch,
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    onDebouncedSearch(input);
  }, [input, onDebouncedSearch]);

  return (
    <div className="search-box-container" tabIndex={-1}>
      <div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch(input)}
          placeholder="Search places..."
          className="search-input"
          aria-label="Search"
        />
      </div>
      <div>
        <div className="shortcut">Ctrl + /</div>
      </div>
    </div>
  );
};

const MemoizedSearchBox = React.memo(SearchBox);
export default MemoizedSearchBox;
