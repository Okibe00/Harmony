/**
 * @description render forms
 * return form element
 */

/**
 *
 * create form elements for the following actions
 * add a user,
 * add manufacturer,
 * add brand
 * delete drugs
 * delete manufacturer
 * delete user
 */

import { memo, useState } from 'react';
import Button from '../Button/button';
import './form.css';
// export default function Form() {
//   return ();
// }

const handleSubmit = (event, state, endpoint, httpMethod) => {
  event.preventDefault();
  console.log(endpoint);
  //makes the api call with state values
  try {
    if (httpMethod === 'POST') {
      fetch(endpoint, {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state }),
      });
    } else {
      fetch(endpoint, {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.log('failed to fetch');
  }
  console.log({ status: 'Ok' });
};

export const DeleteBrandForm = memo(function DeleteBrandForm() {
  const [productCode, setProductCode] = useState({product_code: ''});
  const data = productCode;
  console.log(data);
  const handleChange = (e) => {
    setProductCode({ [e.target.name]: e.target.value });
  };
  return (
    <form>
      <h1>Delete Brand</h1>
      <label className="block">
        Product Code
        <input
          name="product_code"
          placeholder="Enter product code"
          type="text"
          onChange={(e) => handleChange(e)}
          className="block"
        />
      </label>
      <Button
        config={{ type: 'submit', label: 'Submit' }}
        handleSubmit={(e) =>
          handleSubmit(
            e,
            productCode,
            `http://localhost:5000/api/brands/`,
            'DELETE'
          )
        }
      />
    </form>
  );
});

export const DeleteManufacturerForm = memo(function DeleteBrandForm() {
  const [manufacturerName, setManufacturerName] = useState({
    manufacturer_name: '',
  });
  const handleChange = (e) => {
    setManufacturerName({ [e.target.name]: e.target.value });
  };
  return (
    <form>
      <h1>Delete Manufacturer</h1>
      <label>
        Manufacturer Name:
        <input
          placeholder="Enter manufacturer name"
          type="text"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <Button
        config={{ type: 'submit', label: 'Submit' }}
        handleSubmit={(e) => handleSubmit(e, manufacturerName, 'url')}
      />
    </form>
  );
});

export const AddBrandForm = memo(function AddBrandForm() {
  const [brand, setBrand] = useState({
    manufacturer_name: null,
    generic_name: null,
    brand_name: null,
    manufacturer_id: null,
    nafdac_no: null,
    pack_size: null,
    drug_class: null,
    category: null,
    dosage_form: null,
    active_ingredients: null,
    market_status: null,
  });

  const handleChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.name });
  };
  return (
    <form>
      <h1>New Brand</h1>
      <label>
        Manufacturer:
        <input
          type="text"
          name="manufacturer_name"
          id="manufacturer_name"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Generic Name:
        <input
          type="text"
          name="generic_name"
          id="generic_name"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        NAFDAC No:
        <input
          type="text"
          name="nafdac_no"
          id="nafdac_no"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Pack Size:
        <input
          type="text"
          name="pack_size"
          id="pack_size"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Drug Class:
        <input
          type="text"
          name="drug_class"
          id="drug_class"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          id="category"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Dosage Form:
        <input
          type="text"
          name="dosage_form"
          id="dosage_form"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Active Ingredients:
        <input
          type="text"
          name="active_ingredients"
          id="active_ingredients"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Market Status:
        <input
          type="text"
          name="market_status"
          id="market_status"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <Button
        config={{ type: 'submit', label: 'Submit' }}
        handleSubmit={(e) => handleSubmit(e, brand, 'url')}
      />
    </form>
  );
});
export const AddUserForm = memo(function AddUserForm() {
  const [user, setUser] = useState({
    user_name: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <h1>New User</h1>
      <label>
        Name:
        <input
          type="text"
          placeholder="Enter name"
          name="user_name"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Enter password"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <Button
        config={{ type: 'submit', label: 'Submit' }}
        handleSubmit={(e) => handleSubmit(e, user, 'url')}
      />
    </form>
  );
});

export const AddManufacturerForm = memo(function AddManufacturerForm() {
  const [manufacturer, setManufacturer] = useState({
    manufacturer_name: '',
    country: '',
  });
  const handleChange = (e) => {
    setManufacturer({ ...manufacturer, [e.target.name]: e.target.value });
  };
  return (
    <form>
      <h1>New Manufacturer</h1>
      <label>
        Name:
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="manufacturer_name"
          value={manufacturer.manufacturer_name}
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          name="country"
          onChange={(e) => handleChange(e)}
          value={manufacturer.country}
        />
      </label>
      <Button
        config={{ type: 'submit', label: 'submit' }}
        handleSubmit={(e) => handleSubmit(e, manufacturer, 'url')}
      />
    </form>
  );
});
