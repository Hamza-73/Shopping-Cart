const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'hamzakhan';

const Admin = require('../models/Admin');
const Product = require('../models/Product');

// Create admin account
module.exports.create = async (req, res) => {
    try {
        const { username, password, email, name } = req.body;

        const checkUser = await Admin.findOne({ username })
        if (checkUser) {
            console.log('user is ', checkUser)
            return res.json({ success: false, message: "Username Already Exist" });
        }

        const checkEmail = await Admin.findOne({ email })
        if (checkEmail) {
            console.log('email is ', checkEmail)
            return res.json({ success: false, message: "Email Already Exist" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(saltRounds));
        let newUser = new Admin({ username, password: hashedPassword, email, name });
        newUser.save();

        return res.json({ success: true, message: 'Admin registrated successful' });

    } catch (error) {
        console.log('error is ', error);
        return res.status(500).json({ error: error.message })
    }
}

// delete admin account
module.exports.deletes = async (req, res) => {
    try {
        const { username } = req.body;
        const findUser = await Admin.findOne({ username });
        if (findUser) {
            await Admin.findOneAndDelete({ username: username });
            return res.json({ message: "Admin Deeleted Sucessfully" })
        }
    } catch (error) {
        console.log('error is ', error);
        return res.status(500).json({ error: error.message })
    }
}

// login admin
module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (isPasswordValid) {
            const token = jwt.sign({ id: admin.id }, JWT_KEY, { expiresIn: '1h' });
            return res.json({ success: true, token, message: "Admin login successful" })
        }

    } catch (error) {
        console.log('error in login ', error);
        return res.status(500).json({ error: error.message })
    }
}

module.exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, img , quantity} = req.body;
        const { id } = req.params;
        // check the user who is creating this product
        let admin = await Admin.findById(id);
        if (!admin) {
            return res.json({ success: false, message: "Only Admin can add Product" })
        }
        // check product already exists or not
        const checkProduct = await Product.findOne({ name: name.toLowerCase() });
        if (checkProduct) {
            return res.json({ success: false, message: "Product Name Already Exists" });
        }
        const newProduct = new Product({ name, description, price, img , quantity});
        newProduct.save();
        return res.json({ success: true, message: "New Product has been added" });
    } catch (error) {
        return res.json({ error: error.message })
    }
}