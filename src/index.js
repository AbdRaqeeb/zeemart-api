import express from 'express';
import 'dotenv/config';
import fileUpload from 'express-fileupload';

import Cloudinary from './cloudinary/cloudinary';
import Models from './database/models'

import users from './modules/users/routes/users';
import types from './modules/types/routes/TypeRoutes';
import products from './modules/products/routes/ProductRoutes';
import categories from './modules/category/routes/CategoryRoutes';
import orders from './modules/orders/routes/OrderRoutes';

const app = express();

app.use(express.json({ extended: false }));
app.use(fileUpload({
    limits:{
        fileSize: 7 * 1024 * 1024
    }
}));


app.use('/api/v1/users', users);
app.use('/api/v1/types', types);
app.use('/api/v1/products', products);
app.use('/api/v1/categories', categories);
app.use('/api/v1/orders', orders);

app.get('/', (req, res) => res.send('Welcome to Zee Mart'));

// Connect to cloudinary
Cloudinary();

// Sync database
Models.sequelize.sync({ force: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.log('Unable to sync database', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});