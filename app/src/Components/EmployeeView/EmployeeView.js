import "./EmployeeView.css";


const EmployeeView = (props) => {
    const { employeeValues, view } = props;
    return (
        <div className="view-section">
            <div className="view-container">
                <div className="close-btn">
                    <i class="fa-solid fa-xmark" onClick={()=>{view(false)}}></i>
                </div>
                <div className="profile-container div">
                    <div className="profile-wrapper">
                        <img src="/Asserts/profile.jpeg" alt="profile"></img>
                    </div>
                    <div className="employee-input-form">
                        <div className="employee-form left">
                            <div className="form-items-wrapper">
                                <label>First Name:</label>
                                <p>{employeeValues.firstName}</p>
                            </div>
                            <div className="form-items-wrapper">
                                <label>Designation:</label>
                                <p>{employeeValues.designation}</p>
                            </div>
                            <div className="form-items-wrapper">
                                <label>Rate Type:</label>
                                <p>{employeeValues.rateType ? employeeValues.rateType : "-"}</p>
                            </div>
                            <div className="form-items-wrapper">
                                <label>Email:</label>
                                <p>{employeeValues.email}</p>
                            </div>
                            <div className="form-items-wrapper">
                                <label>Address Line 1:</label>
                                <p>{employeeValues.addressLine1 ? employeeValues.addressLine1 : "-"}</p>
                            </div>
                            <div className="form-items-wrapper browse">
                                <label>Picture:</label>
                                {employeeValues.picture ? (
                                    <img src={employeeValues.picture} alt="Profile" width="100" />
                                ) : <p>Default</p>}
                            </div>
                            <div className="form-items-wrapper">
                                <label>City:</label>
                                <p>{employeeValues.city ? employeeValues.city : "-"}</p>
                            </div>
                        </div>
                        <div className="employee-form right">
                            <div className="form-items-wrapper">
                                <label>Last Name:</label>
                                <p>{employeeValues.lastName}</p>
                            </div>
                            <div className="form-items-wrapper">
                                <label>Phone:</label>
                                <p>{employeeValues.phone ? employeeValues.phone : "-"}</p>
                            </div>
                            <div className="form-items-wrapper">
                                <label>Hourly Rate/Salary:</label>
                                <p>{employeeValues.hourlyRate ? employeeValues.hourlyRate : "-"}</p>
                            </div>
                            <div className="form-items-wrapper">
                                <label>Blood Group:</label>
                                <p>{employeeValues.bloodGroup ? employeeValues.bloodGroup : "-"}</p>
                            </div>
                            <div className="form-items-wrapper">
                                <label>Address Line 2:</label>
                                <p>{employeeValues.addressLine2 ? employeeValues.addressLine2 : "-"}</p>
                            </div>
                            <div className="form-items-wrapper">
                                <label>Country:</label>
                                <p>{employeeValues.country ? employeeValues.country : "-"}</p>
                            </div>
                            <div className="form-items-wrapper">
                                <label>Zip Code:</label>
                                <p>{employeeValues.zipCode ? employeeValues.zipCode : "-"}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default EmployeeView;