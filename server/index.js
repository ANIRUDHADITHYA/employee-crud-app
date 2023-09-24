const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     
  password: '',    
  database: 'employee-crud-app-db',
});
try{
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});
}catch(err) {
    console.log(err.message, "Error connecting DB")
}

app.post('/create-employee', (req, res) => {
  const employee = req.body;
  db.query('INSERT INTO employees SET ?', employee, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create employee' });
    } else {
      console.log('Employee created successfully');
      res.status(201).json({ message: 'Employee created successfully' });
    }
  });
});

app.get('/all-employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch employees' });
    } else {
      console.log('Employees fetched successfully');
      res.status(200).json(results);
    }
  });
});

app.delete('/delete-employee/:id', (req, res) => {
  const employeeId = req.params.id;
  const deleteQuery = 'DELETE FROM employees WHERE id = ?';

  db.query(deleteQuery, [employeeId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete employee' });
    } else {
      console.log(`Employee with ID ${employeeId} deleted successfully`);
      res.status(200).json({ message: `Employee deleted successfully` });
    }
  });
});
app.post('/update-employee/:id', (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployeeData = req.body;
  const updateQuery = 'UPDATE employees SET ? WHERE id = ?';

  db.query(updateQuery, [updatedEmployeeData, employeeId], (err, result) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).json({ error: 'Failed to update employee' });
      return;
    }

    console.log('Employee updated:', result);
    res.status(200).json({ message: 'Employee updated successfully' });
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


