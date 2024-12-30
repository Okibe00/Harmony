/**
 * @description - render the filter component
 * @param {array} data - list of filters
 */

import { useEffect, useState } from 'react';
import Button from '../Button/button';
import './Filter.css';
import Result from '../Result/Result';

// const testFilter = ['category', 'market status', 'dosage form'];

export default function Filter() {
  const [searchData, setSearchData] = useState({
    query: '',
    filter: '',
  });

  const [result, setResult] = useState([
    {
      brand_name: 'null',
      generic_name: 'null',
      manufacturer_name: 'null',
      dosage_form: 'null',
      product_code: 'null',
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/brands/codes/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(response.json());
      const data = await response.json();
      // console.log(data);
      setResult(data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };
  const filterUtil = (state, filter) => {
    const data = state.filter((obj) => {
      return (
        obj.dosage_form.toLowerCase() === filter.toLowerCase() ||
        obj.manufacturer_name.toLowerCase() === filter.toLowerCase() ||
        obj.drug_class.toLowerCase() === filter.toLowerCase() ||
        obj.generic_name.toLowerCase() === filter.toLowerCase() ||
        obj.market_status.toLowerCase() === filter.toLowerCase() ||
        obj.category.toLowerCase() === filter.toLowerCase()
      );
    });
    return data;
  };
  const handleSubmit = async (e) => {
    const { query, filter } = searchData;
    let filteredData = null;
    if (!query && filter) {
      if (result.length) {
        filteredData = filterUtil(result, filter);
      } else {
        const response = await fetch(
          'http://localhost:5000/api/brands/codes/',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        filteredData = data;
      }
    } else if (query && !filter) {
      const response = await fetch('http://localhost:5000/api/brands/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: query }),
      });
      const data = await response.json();
      filteredData = data;
    } else if (query && filter) {
      const response = await fetch('http://localhost:5000/api/brands/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: query }),
      });
      const data = await response.json();
      filteredData = filterUtil(data, filter);
    } else {
      const response = await fetch('http://localhost:5000/api/brands/codes/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      filteredData = data;
    }
    setResult(filteredData);
  };

  return (
    <div>
      <section className="search-section">
        <div className="search-filter-cont">
          <span className="search-box">
            <input
              type="text"
              name="query"
              placeholder="search"
              onChange={(e) => handleChange(e)}
            />
          </span>
          <span className="filter-box">
            <input
              type="text"
              name="filter"
              placeholder="filter"
              onChange={(e) => handleChange(e)}
            />
          </span>
          <Button
            config={{ type: 'submit', label: 'Search' }}
            handleSubmit={handleSubmit}
          />
        </div>
        {/*<div className="checkbox-container">
          {testFilter.map((value, index) => (
            <label key={index}>
              <input
                name={value}
                type="checkbox"
                value={value}
                onChange={() => {}}
              />{' '}
              {value}
            </label>
          ))}
          </div> */}
      </section>
      {/* {console.log(result)} */}
      <Result data={result} />
    </div>
  );
}
