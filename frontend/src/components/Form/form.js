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

import { dosageForm } from '../../../src/utils/static/dosageForm';
import { memo, useEffect, useState } from 'react';
import Button from '../Button/button';
import './form.css';
import { drugClass } from '../../utils/static/drugClass';
// export default function Form() {
//   return ();
// }

const handleSubmit = async (event, state, endpoint, httpMethod) => {
  event.preventDefault();
  let res;
  try {
    if (httpMethod === 'POST') {
      res = await fetch(endpoint, {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...state }),
      });
    } else {
      res = await fetch(endpoint, {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.log('failed to fetch');
  }
  if (!res.ok) {
    console.error('Bad response');
    alert('Failed');
  } else {
    alert(`Success`);
  }
};

export const DeleteBrandForm = memo(function DeleteBrandForm() {
  const [productCode, setProductCode] = useState({ product_code: '' });

  const handleChange = (e) => {
    setProductCode({ [e.target.name]: e.target.value });
  };
  return (
    <form id="">
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
            `http://localhost:5000/api/brands/`.concat(
              productCode.product_code
            ),
            'DELETE'
          )
        }
      />
    </form>
  );
});

export const DeleteManufacturerForm = memo(function DeleteBrandForm() {
  useEffect(() => {
    let body;
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/manufacturers/',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          alert('Failed to fetch manufacturers');
          return;
        }
        body = await response.json();
        setManufacturers(body);
      } catch (error) {
        console.log('failed to fetch manufacturers');
      }
    };
    fetchData();
  }, []);
  const [selectedMan, setSelectedMan] = useState({ id: '', name: '' });
  const [manufacturers, setManufacturers] = useState([
    {
      id: '',
      name: '',
    },
  ]);
  const handleChange = (e) => {
    const id = e.target.options[e.target.selectedIndex].id;
    const man = { id: id, name: e.target.value };
    setSelectedMan(man);
  };
  return (
    <form>
      <h1>Delete Manufacturer</h1>
      <label>
        Manufacturer Name:
        <select value={selectedMan.name} onChange={(e) => handleChange(e)}>
          {manufacturers.map((man) => {
            return (
              <option value={man.name} key={man.id} id={man.id}>
                {man.name}
              </option>
            );
          })}
          ;
        </select>
      </label>
      <Button
        config={{ type: 'submit', label: 'Submit' }}
        handleSubmit={(e) =>
          handleSubmit(
            e,
            selectedMan,
            'http://localhost:5000/api/manufacturers/'.concat(selectedMan.id),
            'DELETE'
          )
        }
      />
    </form>
  );
});

export const AddBrandForm = memo(function AddBrandForm() {
  const [brand, setBrand] = useState({
    generic_name: null,
    brand_name: null,
    manufacturer_id: null,
    nafdac_no: null,
    pack_size: null,
    drug_class: 'Analgesic',
    category: 'OTC',
    dosage_form: 'Tablet',
    active_ingredients: null,
    market_status: 'Active',
  });
  const [manufacturers, setManufacturers] = useState([{}]);

  useEffect(() => {
    let body;
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/manufacturers/',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          alert('Failed to fetch manufacturers');
          return;
        }
        body = await response.json();
        setManufacturers(body);
        setBrand({ ...brand, manufacturer_id: body[0].id });
      } catch (error) {
        console.log('failed to fetch manufacturers');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    let value = '';
    if (name === 'manufacturer_id') {
      value = e.target.options[e.target.selectedIndex].id;
      setBrand({ ...brand, [e.target.name]: value });
    } else {
      setBrand({ ...brand, [e.target.name]: e.target.value });
    }
  };
  return (
    <form id="brand-form">
      <h1>New Brand</h1>
      <label>
        Manufacturer:
        <select
          name="manufacturer_id"
          id="brand_man"
          onChange={(e) => handleChange(e)}
        >
          {manufacturers.map((man, index) => {
            return (
              <option value={man.name} key={index} id={man.id}>
                {man.name}
              </option>
            );
          })}
        </select>
      </label>
      <label>
        Brand Name:
        <input
          autoComplete="on"
          type="text"
          name="brand_name"
          id="brand_name"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Generic Name:
        <input
          autoComplete="on"
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
        <select
          name="drug_class"
          id="drug_class"
          onChange={(e) => handleChange(e)}
        >
          {drugClass.map((dc, index) => {
            return (
              <option value={dc} key={index}>
                {dc}
              </option>
            );
          })}
        </select>
      </label>
      <label>
        Category:
        <br />
        <select
          name="category"
          id="category"
          defaultValue={'OTC'}
          onChange={(e) => handleChange(e)}
        >
          <option value="OTC">OTC</option>
          <option value="POM">POM</option>
        </select>
      </label>
      <label>
        Dosage Form:
        <select
          name="dosage_form"
          id="dosage_form"
          onChange={(e) => handleChange(e)}
        >
          {dosageForm.map((df, index) => {
            return (
              <option value={df.toLowerCase()} key={index}>
                {df}
              </option>
            );
          })}
        </select>
      </label>
      <label>
        Active Ingredients:
        <input
          autoComplete="on"
          type="text"
          name="active_ingredients"
          id="active_ingredients"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Market Status:
        <select
          name="market_status"
          id="market_status"
          onChange={(e) => handleChange(e)}
        >
          <option value="active">Active</option>
          <option value="discontinued">Discontinued</option>
        </select>
      </label>
      <Button
        config={{ type: 'submit', label: 'Submit' }}
        handleSubmit={(e) =>
          handleSubmit(e, brand, 'http://localhost:5000/api/brands/', 'POST')
        }
      />
    </form>
  );
});
export const AddUserForm = memo(function AddUserForm() {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <h1>New User</h1>
      <label>
        User Name:
        <input
          autoComplete="on"
          type="text"
          placeholder="Enter name"
          name="username"
          value={user.username}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Password
        <input
          autoComplete="on"
          type="password"
          name="password"
          value={user.password}
          placeholder="Enter password"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Email
        <input
          autoComplete="on"
          type="email"
          name="email"
          value={user.email}
          placeholder="Enter email"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <Button
        config={{ type: 'submit', label: 'Submit' }}
        handleSubmit={(e) =>
          handleSubmit(e, user, `http://localhost:5000/api/users/`, 'POST')
        }
      />
    </form>
  );
});

export const DeleteUserForm = memo(function DeleteUserForm() {
  const [users, setUsers] = useState([{ id: '', username: '' }]);
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        let response = await fetch('http://localhost:5000/api/users/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error();
        }
        data = await response.json();
        setUsers(data);
        setSelectedUserId(data[0].id);
      } catch (error) {
        console.log('Failed to fetch users');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const defaultUser = { id: null, username: 'No user Available' };
    const findUser = users.filter((user) => user.id === selectedUserId);
    if (!findUser.length) {
      alert('Select a user');
      return;
    }
    const response = await fetch(
      `http://localhost:5000/api/users/${selectedUserId}/`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      alert('Failed!');
      return;
    } else {
      alert('Success!');
    }
    const newUsers = users.filter((user) => user.id !== selectedUserId);
    if (!newUsers.length) {
      setUsers([defaultUser]);
      return;
    }
    setUsers(newUsers);
    setSelectedUserId(newUsers[0].id);
  };

  const handleChange = (e) => {
    const userId = e.target.options[e.target.selectedIndex].id;
    setSelectedUserId(userId);
  };
  return (
    <form>
      <h1>Delete User</h1>
      <label>
        <select name="users" onChange={(e) => handleChange(e)}>
          {users.map((user) => {
            return (
              <option
                value={user.username}
                key={user.id}
                id={user.id}
                onClick={(e) => handleChange(e)}
              >
                {user.username}
              </option>
            );
          })}
        </select>
      </label>
      <Button
        config={{ type: 'submit', label: 'submit' }}
        handleSubmit={(e) => handleSubmit(e)}
      />
    </form>
  );
});
export const AddManufacturerForm = memo(function AddManufacturerForm() {
  const [manufacturer, setManufacturer] = useState({
    name: '',
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
          name="name"
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
        handleSubmit={(e) =>
          handleSubmit(
            e,
            manufacturer,
            'http://localhost:5000/api/manufacturers/',
            'POST'
          )
        }
      />
    </form>
  );
});
