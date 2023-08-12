const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const categorySchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang nama kategori minimal 3 karakter'],
        maxlength: [20, 'Panjang nama kategory maksimal 20 karakter'],
        required: [true, 'Nama product harus terisi']
    }
});

module.exports = model('Category', categorySchema);