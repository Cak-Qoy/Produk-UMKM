const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const productSchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang nama product minimal 3 karakter'],
        required: [true, 'Nama product harus terisi']
    },
    description: {
        type: String,
        maxlength: [1000, 'Panjang deskripsi maksimal 1000 karakter']
    },
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    image_url: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    tags: {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }
}, { timestamps: true });

module.exports = model('Product', productSchema);