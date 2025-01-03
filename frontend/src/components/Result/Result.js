/**
 * @description - renders a table to the screen
 * @data {object} - data - result object
 * @return table object
 */

import './Results.css';

export default function Result({ data }) {
  // console.log(data);
  return (
    <table>
      <thead>
        <tr>
        <th>Product Code</th>
        <th>Brand Name</th>
        <th>Generic Name</th>
        <th>Dosage Form</th>
        <th>Manufacturer Name</th>
        <th>Drug Class</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.product_code}</td>
            <td>{row.brand_name}</td>
            <td>{row.generic_name}</td>
            <td>{row.dosage_form}</td>
            <td>{row.manufacturer_name}</td>
            <td>{ row.drug_class }</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
