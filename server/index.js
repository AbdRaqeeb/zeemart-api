import express from 'express';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import {
    Client
} from 'pg';

import Cloudinary from './cloudinary/cloudinary';
import Models from './database/models'

import users from './modules/users/routes/UserRoutes';
import admin from './modules/admin/routes/AdminRoutes';
import types from './modules/types/routes/TypeRoutes';
import products from './modules/products/routes/ProductRoutes';
import categories from './modules/category/routes/CategoryRoutes';
import orders from './modules/orders/routes/OrderRoutes';
import stats from './modules/stats/routes/StatRoutes';
const app = express();

app.use(cors());
app.use(express.json({
    extended: false
}));
app.use(fileUpload({
    limits: {
        fileSize: 7 * 1024 * 1024
    }
}));


app.use('/api/v1/users', users);
app.use('/api/v1/admin', admin);
app.use('/api/v1/types', types);
app.use('/api/v1/products', products);
app.use('/api/v1/categories', categories);
app.use('/api/v1/orders', orders);
app.use('/api/v1/stats', stats);

// Connect to cloudinary
Cloudinary();



// Sync database
Models.sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log('Unable to sync database', err));


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.resolve(__dirname, '../admin-dashboard/build')));


    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../admin-dashboard/build', 'index.html'))
    );
}



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});