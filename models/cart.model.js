const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    // Remove required user field or make it optional
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: false 
    },
    items: [{
        product: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            required: true
        },
        quantity: { 
            type: Number, 
            default: 1,
            min: 1 // Ensure quantity is at least 1
        }
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Cart', cartSchema);