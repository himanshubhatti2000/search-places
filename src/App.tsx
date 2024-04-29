import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import SearchBox from "./components/search-box";
import SearchResultTable from "./components/search-result-table";
import { CityData } from "./types";
import { fetchPlaces } from "./api";
import Pagination from "./components/pagination";
import { debounce } from "./utils";

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<CityData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  // updating search results based on search query
  const handleSearchResults = useCallback(
    async (query: string, page: number, itemsPerPage: number) => {
      setError("");
      setIsSearching(true);
      try {
        const { results, metadata } = await fetchPlaces(
          query,
          page,
          itemsPerPage
        );
        setSearchResults(results);
        setTotalItems(metadata.totalCount);
        setSearchResults(results);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else if (typeof error === "string") {
          setError(error);
        } else {
          setError("An unexpected error occurred");
        }
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleSearchResults(searchQuery, currentPage, itemsPerPage);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, currentPage, itemsPerPage, handleSearchResults]);

  // updating search query
  const handleSearchQuery = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const debouncedHandleSearchQuery = debounce(handleSearchQuery, 1000);

  return (
    <div className="App">
      {/* using onSearch for Enter and onDebouncedSearch for debouncing on automate search*/}
      <SearchBox
        onSearch={handleSearchQuery}
        onDebouncedSearch={debouncedHandleSearchQuery}
      />

      {/* using spinner container with min height, so that ui remains static even if spinner there or not */}
      <div className="spinner-container">
        {isSearching && (
          <img width={64} height={64} src="/spinner.svg" alt="Loading" />
        )}
      </div>
      {/* table for result */}
      <SearchResultTable
        data={searchResults}
        errorMessage={error}
        isSearching={isSearching}
        searchQuery={searchQuery}
        skippedResults={currentPage == 1 ? 0 : (currentPage - 1) * itemsPerPage}
      />

      {/* showing pagination if there are more than one pages exist */}
      {searchResults.length > 0 && totalItems > itemsPerPage && (
        <div className="pagination-container">
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
          <div>
            {/* input field for item per page */}
            <input
              className="item-per-page-input"
              type="number"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              min={1}
              max={10}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
