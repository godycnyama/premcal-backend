'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const autoIncrement = require('../config/db').autoIncrement;

/**
  * @module  Calculate
  * @description contain the details of Attribute  
*/
var CalculateSchema = new Schema({
  memberName:{ type: String, 
    required: true ,
    trim :true, 
    maxlength: 150
  },
  memberID:{ type: String, 
    required: true ,
    trim :true, 
    minlength: 13, 
    maxlength: 13
  },
  memberType: { type: String, 
    required: true, 
    enum: ['Main Member', 'Dependent'] 
  },
  insuredValue:{ type: Number },
  fee:{ type: Number },
  premium:{ type: Number },
  total:{ type: Number },
  createdOn: { type: Date },
  updatedOn: { type: Date }
}, 
{ 
    usePushEach: true 
});

// on every save, add the date
CalculateSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    // change the updated_at field to current date
    this.updatedOn = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.createdOn)
        this.createdOn = currentDate;
    next();
});

CalculateSchema.plugin(autoIncrement.plugin,'Calculate');
CalculateSchema.plugin(mongoosePaginate);
var Calculate = mongoose.model('Calculate', CalculateSchema);

/** export schema */
module.exports = Calculate;
