const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
     name: {
          type: String,
          trim: true,
          required: [true, 'Name cannot be blank'],
          maxlength: [50, 'name cannot be more than 20 characters'],
          
     }, 
     completed: {
          type: Boolean,
          default: false,
     },
})


module.exports = mongoose.model('Task', TaskSchema);