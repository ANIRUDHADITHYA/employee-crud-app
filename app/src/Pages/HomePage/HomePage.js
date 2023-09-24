import { useEffect, useState } from "react";
import "./HomePage.css";
import axios from 'axios';
import EmployeeView from "../../Components/EmployeeView/EmployeeView";
import EmployeeEdit from "../../Components/EmployeeEdit/EmploeeEdit";


const HomePage = () => {

    const [employeesData, setEmployeesData] = useState([]);
    const [viewEmployee, setViewEmployee] = useState(false);
    const [editEmployee, setEditEmployee] = useState(false);
    const [employee, setEmployee] = useState("")

    const [employeeValues, setEmployeeValues] = useState({
        firstName: '',
        lastName: '',
        designation: '',
        rateType: '',
        email: '',
        addressLine1: '',
        picture: null,
        city: '',
        phone: '',
        hourlyRate: '',
        bloodGroup: '',
        addressLine2: '',
        country: '',
        zipCode: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeValues({
            ...employeeValues,
            [name]: value,
        });
    };

    function validateValues(values) {

        if (!values.firstName.trim()) {
            window.alert("First Name Required.")
        }
        else if (!values.lastName.trim()) {
            window.alert("Last Name Required.")
        }
        else if (!values.designation) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateValues(employeeValues)) {
            try {
                const response = await axios.post("http://localhost:3001/create-employee", employeeValues).then(() => [
                    window.location.reload()
                ])
                console.log('Response from server:', response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const fetchEmployeesData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/all-employees");
            setEmployeesData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleReset(e) {
        e.preventDefault()
        setEmployeeValues({
            firstName: '',
            lastName: '',
            designation: '',
            rateType: '',
            email: '',
            addressLine1: '',
            picture: null,
            city: '',
            phone: '',
            hourlyRate: '',
            bloodGroup: '',
            addressLine2: '',
            country: '',
            zipCode: '',
        })
    }

    const handleDelete = (emp_id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this employee?');

        if (isConfirmed) {
            axios
                .delete(`http://localhost:3001/delete-employee/${emp_id}`)
                .then((response) => {
                    console.log(response.data.message)
                    const alertDone  = window.confirm(response.data.message);
                    if(alertDone) {
                        window.location.reload()
                    } else {
                        window.location.reload()
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    function handleView(data) {
        setEmployee(data);
        setViewEmployee(true)
    }

    function handleEdit(data) {
        setEmployee(data);
        setEditEmployee(true)
    }


    useEffect(() => {
        fetchEmployeesData();
    }, []);




    return (
        <>
        {viewEmployee && <EmployeeView employeeValues={employee} view={setViewEmployee}/>}
        {editEmployee && <EmployeeEdit employeeValues={employee} view={setEditEmployee} validate={validateValues}/>}
        <div className="home-section">
            <div className="employee-container">
                <div className="employee-input-form-container">
                    <h1>Add Employee</h1>
                    <form id="employeeForm" className="employee-input-form">
                        <div className="employee-form left">
                            <div class="form-items-wrapper">
                                <label for="firstName">First Name <span>*</span></label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={employeeValues.firstName}
                                    onChange={handleInputChange}
                                    maxLength="30"
                                    required />
                            </div>
                            <div class="form-items-wrapper">
                                <label for="designation">Designation <span>*</span></label>
                                <select id="designation" value={employeeValues.designation} name="designation" onChange={handleInputChange} required >
                                    <option value="" selected disabled>Select a option</option>
                                    <option value="HR">HR</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Team Leader">Team Leader</option>
                                    <option value="Employee">Employee</option>
                                </select>
                            </div>
                            <div class="form-items-wrapper">
                                <label for="rateType">Rate Type</label>
                                <select id="rateType" value={employeeValues.rateType} name="rateType" onChange={handleInputChange}>
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
                                    value={employeeValues.email}
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
                                    value={employeeValues.addressLine1}
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
                                    value={employeeValues.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="employee-form right">
                            <div class="form-items-wrapper">
                                <label for="lastName">Last Name <span>*</span></label>
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Last Name"
                                    onChange={handleInputChange}
                                    value={employeeValues.lastName}
                                    maxLength="20"
                                    name="lastName" required />
                            </div>
                            <div class="form-items-wrapper">
                                <label for="phone">Phone <span>*</span></label>
                                <input
                                    type="number"
                                    id="phone"
                                    placeholder="Phone Number"
                                    value={employeeValues.phone}
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
                                    value={employeeValues.hourlyRate}
                                    onChange={handleInputChange}
                                    maxLength="15"
                                    name="hourlyRate"
                                />
                            </div>
                            <div class="form-items-wrapper">
                                <label for="bloodGroup">Blood Group</label>
                                <select id="bloodGroup" value={employeeValues.bloodGroup} name="bloodGroup" onChange={handleInputChange} >
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
                                    value={employeeValues.addressLine2}
                                    name="addressLine2"
                                    maxLength="50"
                                    rows="4">

                                </textarea>
                            </div>
                            <div class="form-items-wrapper">
                                <label for="country">Country</label>
                                <select id="country" value={employeeValues.country} name="country" onChange={handleInputChange}>
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
                                    value={employeeValues.zipCode}
                                    maxLength="6"
                                    name="zipCode" />
                            </div>
                        </div>
                    </form>
                    <div className="create-btn-action">
                        <button className="sr-btn reset" onClick={handleReset}>Reset</button>
                        <button className="sr-btn save" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
                <div className="list-employee-container">
                    <h1>Showing All Employee</h1>
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>SL.</th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Picture</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeesData.map((employee, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{employee.firstName} {employee.lastName}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.email}</td>
                                    <td><img src="/Asserts/profile.jpeg" alt="profile" width="50" /></td>
                                    <td>
                                        <button className="action-btn edit" onClick={()=>{handleEdit(employee)}}><i className="fa-solid fa-pen"></i></button>
                                        <button className="action-btn delete" onClick={()=>{handleDelete(employee.id)}}><i className="fa-solid fa-trash-can"></i></button>
                                        <button className="action-btn view" onClick={()=>{handleView(employee)}}><i className="fa-solid fa-user"></i></button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        </>
    )
}


export default HomePage;