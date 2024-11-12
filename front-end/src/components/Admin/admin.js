/**
 *
 */
import {
  AddBrandForm,
  AddUserForm,
  AddManufacturerForm,
  DeleteBrandForm,
  DeleteManufacturerForm
 } from "../Form/form";
import {useState} from 'react';
import './admin.css';
export function Admin() {
  const resetState = {
    'brandForm': false,
    'manufacturerForm': false,
    'userForm': false,
    'deleteBrandForm': false,
    'deleteManufacturerForm': false,
    'deleteUserForm': false,
  }
  const [ toggle, setToggle ] = useState({
    'brandForm': true,
    'manufacturerForm': true,
    'userForm': true,
    'deleteBrandForm': true,
    'deleteManufacturerForm': true,
    'deleteUserForm': true,
  })
  const toggleForm = (formName) => {
    setToggle(prevState => ({...resetState, [formName]: !prevState[formName]}))
  }
  return (
    <div className="admin-form-cont">
      <section className="action-section">
        <h3>Actions</h3>
        <button onClick={() => toggleForm("brandForm")}>Add Brand</button><br />
        <button onClick={() => toggleForm("manufacturerForm")}>Add Manufacturer</button><br />
        <button onClick={() => toggleForm("userForm")}>Add User</button><br />
        <button onClick={() => toggleForm("deleteBrandForm")}>Delete Brand</button><br />
        <button onClick={() => toggleForm("deleteManufacturerForm")}>Delete Manufacturer</button><br />
        <button onClick={() => toggleForm("deleteUserForm")}>Delete User</button>
      </section>
      <section className="display-form-cont">
        {toggle.brandForm && <AddBrandForm />}
        {toggle.userForm && <AddUserForm />}
        {toggle.manufacturerForm && <AddManufacturerForm />}
        {toggle.deleteBrandForm && <DeleteBrandForm />}
        {toggle.deleteManufacturerForm && <DeleteManufacturerForm/>}
      </section>
    </div>
  )
}
