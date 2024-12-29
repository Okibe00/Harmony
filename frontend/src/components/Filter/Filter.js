/**
 * @description - render the filter component
 * @param {array} data - list of filters
 */

import { useState } from 'react';
import Button from '../Button/button';
import './Filter.css';
import Result from '../Result/Result';

const testFilter = ['category', 'market status', 'dosage form'];

export default function Filter() {
  const [filter, setFilter] = useState({
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

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const response = await fetch('http://localhost:3001/api/v1/drugs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filter),
    });

    if (!response.ok) {
      throw new Error('http error ' + response.status);
    }
    const data = await response.json();
    setResult(data);
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
        <div className="checkbox-container">
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
        </div>
      </section>
      {console.log(result)}
      <Result data={result} />
    </div>
  );
}
