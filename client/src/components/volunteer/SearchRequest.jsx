import React, { useState } from "react";
import Select from "react-select";
import './searchRequest.css'; 
const SearchRequest = ({ setRequests, allRequests, setSearchRequests, setIsExist }) => {
  const [searchValue, setSearchValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectOption = (e) => {
    setSearchValue(e);
    if (e === null) {
      setRequests(allRequests);
      setSearchRequests([]);
    }
  };

  const searchByOption = (event) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const searchKey = searchValue ? searchValue.value : null;
    const inputValue = event.target[0].value.toLowerCase(); 

    if (searchKey === "region") {
      const filteredRequests = allRequests.filter(request => request.region.toLowerCase() === inputValue);
      if (filteredRequests.length === 0) {
        setIsExist(false);
      } else {
        setIsExist(true);
        setSearchRequests(filteredRequests);
      }
    } else {
      setRequests(allRequests);
    }

    event.target.reset();
  };

  const searchRequestsOptions = [
    { value: 'region', label: 'איזור' }
  ];

  return (
    <div className="search-request-container">
      <Select
        placeholder="חיפוש בקשות לפי..."
        onChange={(e) => selectOption(e)}
        options={searchRequestsOptions}
        isClearable
        isLoading={loading}
        isSearchable={true}
        className="search-select"
      />
      {searchValue && (
        <form onSubmit={searchByOption} className="search-form">
          <input name={searchValue.value} placeholder={searchValue.label} className="search-input" />
          <input type="submit" value="חפש" className="search-submit" />
        </form>
      )}
    </div>
  );
};

export default SearchRequest;

