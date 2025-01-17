const mongoose = require('mongoose');

//define the person schema
const MenuItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
},
price: {
    type: Number,
    required: true,
}, 
taste:{
    type: Boolean,
    default: false
},
ingeriants:{
type: [String],
default:[]
},
num_sales:{
    type: Number,
    default: 0,
}
})
//create person model
const MenuItem = mongoose.model('MenuItem',MenuItemSchema);
module.exports = MenuItem;