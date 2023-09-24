import { useEffect, useState } from "react";
import "./EmployeeEdit.css";
import axios from "axios";

const EmployeeEdit = (props) => {


    const [updatedEmployeeValues, setUpdatedEmployeeValues] = useState({});
    const { employeeValues, view } = props;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEmployeeValues({
            ...updatedEmployeeValues,
            [name]: value,
        });
    };

    useEffect(() => {
        setUpdatedEmployeeValues({ ...employeeValues });
    }, [employeeValues]);



    function validate(values) {

        if (!values.designation) {
            window.alert("Select your Designation.")
        }
        else if (!values.phone) {
            window.alert("Phone Number Required.")
        }
        else if (!values.hourlyRate) {
            window.alert("Rate/Salary Required.")
        }
        else if (!values.email.trim()) {
            window.alert("Email Required.")
        }
        else return 1
    }

    const handleEditSubmit = async (emp_id) => {
        console.log(updatedEmployeeValues)
        if (validate(updatedEmployeeValues)) {
            const editConfirm = window.confirm('Are you sure you want to update values of this employee?');
            if (editConfirm) {
                try {
                    const response = await axios.post(`http://localhost:3001/update-employee/${emp_id}`, updatedEmployeeValues);
                    console.log(response.data.message);
                    const alertDone = window.confirm(response.data.message);
                    if (alertDone) {
                        window.location.reload();
                    } else {
                        window.location.reload();
                    }
                } catch (error) {
                    console.error('Error updating employee:', error);
                }
            }
        }
    }


    return (
        <div className="view-section">
            <div className="view-container">
                <div className="close-btn">
                    <i class="fa-solid fa-xmark" onClick={() => { view(false) }}></i>
                </div>
                <div className="profile-container div">
                    <div className="profile-wrapper">
                        <img src="/Asserts/profile.jpeg" alt="profile"></img>
                    </div>
                    <div className="employee-input-form">
                        <div className="employee-form left">
                            <div class="form-items-wrapper">
                                <label for="firstName">First Name <span>*</span></label>
                                <p>{employeeValues.firstName}</p>
                            </div>
                            <div class="form-items-wrapper">
                                <label for="designation">Designation <span>*</span></label>
                                <select id="designation" value={updatedEmployeeValues.designation} name="designation" onChange={handleInputChange} required >
                                    <option value="" selected disabled>Select a option</option>
                                    <option value="HR">HR</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Team Leader">Team Leader</option>
                                    <option value="Employee">Employee</option>
                                </select>
                            </div>
                            <div class="form-items-wrapper">
                                <label for="rateType">Rate Type</label>
                                <select id="rateType" value={updatedEmployeeValues.rateType} name="rateType" onChange={handleInputChange}>
                                    <option value="" selected disabled>Select rate type</option>
                                    <option value="Hourly">Hourly</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                            <div class="form-items-wrapper">
                                <label for="email">Email <span>*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                    maxLength="50"
                                    value={updatedEmployeeValues.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div class="form-items-wrapper">
                                <label for="addressLine1">Address Line 1</label>
                                <textarea
                                    id="addressLine1"
                                    name="addressLine1"
                                    placeholder="Address Line 1 ( Max 50 Char Only )"
                                    rows="4"
                                    value={updatedEmployeeValues.addressLine1}
                                    maxLength="50"
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <div class="form-items-wrapper browse">
                                <label for="picture">Picture</label>
                                <input
                                    type="file"
                                    id="picture"
                                    name="picture"
                                    accept="image/*" />
                            </div>
                            <div class="form-items-wrapper">
                                <label for="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="City"
                                    name="city"
                                    maxLength="20"
                                    value={updatedEmployeeValues.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="employee-form right">
                            <div class="form-items-wrapper">
                                <label for="lastName">Last Name <span>*</span></label>
                                <p>{updatedEmployeeValues.lastName}</p>
                            </div>
                            <div class="form-items-wrapper">
                                <label for="phone">Phone <span>*</span></label>
                                <input
                                    type="number"
                                    id="phone"
                                    placeholder="Phone Number"
                                    value={updatedEmployeeValues.phone}
                                    onChange={handleInputChange}
                                    name="phone"
                                    maxLength="10"
                                    required />
                            </div>
                            <div class="form-items-wrapper">
                                <label for="hourlyRate">Hourly Rate/Salary <span>*</span></label>
                                <input
                                    type="number"
                                    id="hourlyRate"
                                    placeholder="Hourly Rate/Salary"
                                    value={updatedEmployeeValues.hourlyRate}
                                    onChange={handleInputChange}
                                    maxLength="15"
                                    name="hourlyRate"
                                />
                            </div>
                            <div class="form-items-wrapper">
                                <label for="bloodGroup">Blood Group</label>
                                <select id="bloodGroup" value={updatedEmployeeValues.bloodGroup} name="bloodGroup" onChange={handleInputChange} >
                                    <option value="" selected disabled>Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                            <div class="form-items-wrapper">
                                <label for="addressLine2">Address Line 2</label>
                                <textarea
                                    id="addressLine2"
                                    placeholder="Address Line 2 ( Max 50 Char Only )"
                                    onChange={handleInputChange}
                                    value={updatedEmployeeValues.addressLine2}
                                    name="addressLine2"
                                    maxLength="50"
                                    rows="4">

                                </textarea>
                            </div>
                            <div class="form-items-wrapper">
                                <label for="country">Country</label>
                                <select id="country" value={updatedEmployeeValues.country} name="country" onChange={handleInputChange}>
                                    <option value="" selected disabled>Select Country</option>
                                    <option value="India">India</option>
                                    <option value="Other Country">Other Country</option>
                                </select>
                            </div>
                            <div class="form-items-wrapper">
                                <label for="zipCode">Zip Code</label>
                                <input
                                    type="number"
                                    id="zipCode"
                                    placeholder="Zip Code"
                                    onChange={handleInputChange}
                                    value={updatedEmployeeValues.zipCode}
                                    maxLength="6"
                                    name="zipCode" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="create-btn-action">
                    {updatedEmployeeValues && <button className="sr-btn save" disabled={!updatedEmployeeValues} onClick={() => { handleEditSubmit(updatedEmployeeValues.id) }}>Update</button>}
                </div>
            </div>
        </div>
    )
}


export default EmployeeEdit;