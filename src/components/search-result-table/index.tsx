import React from "react";
import "./style.css";
import { CityData } from "../../types";
import { getFlagUrlFromCountryCode } from "../../utils";

interface SearchResultTableProps {
  data: CityData[];
  errorMessage: string;
  isSearching: boolean;
  searchQuery: string;
  skippedResults: number;
}

const SearchResultTable: React.FC<SearchResultTableProps> = ({
  data,
  errorMessage,
  isSearching,
  searchQuery,
  skippedResults,
}) => {
  return (
    <table className="search-result-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {errorMessage && (
          <tr>
            <td colSpan={3}>{errorMessage}</td>
          </tr>
        )}
        {!data.length && !isSearching && searchQuery && !errorMessage && (
          <tr>
            <td colSpan={3}>No results found</td>
          </tr>
        )}
        {!searchQuery && (
          <tr>
            <td colSpan={3}>Start Searching</td>
          </tr>
        )}

        {data.map((item, index) => (
          <tr key={item.id}>
            <td>{skippedResults + index + 1}</td>
            <td>{item.name}</td>
            <td>
              <div className="country-container">
                <img
                  width={20}
                  height={20}
                  src={getFlagUrlFromCountryCode(item.countryCode)}
                  alt={item.country}
                />
                {item.country}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const MemoizedSearchResultTable = React.memo(SearchResultTable);
export default MemoizedSearchResultTable;
