const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const port = 3001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Jothi422@',
    database: 'setaf'
});


app.post('/create', async (req, res) => {
    try {
        const {
            NameoftheFaculty,
            Designation,
            nameoftheprogram,
            Titleoftheprogram,
            DateFrom,
            DateTo,
            Participation,
            LocationofOrganizaton,
            AmountprovidedbytheHEI,
            UploadFile
        } = req.body;

        const connection = await pool.getConnection();
        await connection.query('START TRANSACTION');
        const query = `
            INSERT INTO student_workshop (Name_of_the_Faculty, Designation, Name_of_the_program, Title_of_the_program, Date_from, Date_to, Participation, Location_of_Organization, Amount_provided_by_HEI, Certificate_PDF)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [results] = await connection.query(query, [NameoftheFaculty, Designation, nameoftheprogram, Titleoftheprogram, DateFrom, DateTo, Participation, LocationofOrganizaton, AmountprovidedbytheHEI, UploadFile]);
        await connection.query('COMMIT');
        connection.release();
        console.log('Data submitted successfully');
        res.status(200).send('Data submitted successfully');
    } catch (error) {
        console.error('Error submitting data:', error);
        res.status(500).send('Error submitting data');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
