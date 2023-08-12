const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const cartItemSchema = Schema({
    name: {
        type: String,
        minlength: [5, 'panjang nama produk minimal 5 karakter'],
        required: [true, 'name must be filled']
    },
    qty: {
        type: Number,
        required: [true, 'qty harus diisi'],
        min: [1, 'minimal qty adalah 1']
    },
    price: {
        type: Number,
        default: 0
    },
    image_url: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});

module.exports = model('CartItem', cartItemSchema);