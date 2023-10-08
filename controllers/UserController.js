const express = require("express");
const {decryptMessage} = require('../security/Decryption')
const md5= require('md5')
const { sql, poolPromise } = require('../ConnectionProvider'); // Assuming your file is named db.js
const app = express();

// Middleware for parsing request bodies
app.use(express.json());


const userRegistration = async (req, res) => {
    const { UserName, PhoneNo, Email, Password } = req.body
    const decryptedPassword = decryptMessage(Password);
    const hashedPassword = md5(decryptedPassword);
    try {
        const pool = await poolPromise;

        const request = pool.request();
        request.input('UserName', sql.VarChar, UserName);
        request.input('PhoneNo', sql.BigInt, PhoneNo);
        request.input('Email', sql.NVarChar, Email);
        request.input('Password', sql.VarChar, hashedPassword);

        await request.query('INSERT INTO Users (UserName, PhoneNo, Email, Password) VALUES (@UserName, @PhoneNo, @Email, @Password)');

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

module.exports = {userRegistration}
