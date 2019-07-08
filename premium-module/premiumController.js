const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');
const calculateUtil = require('./calculationUtil');
const Calculate = require('../models/calculation');

exports.calculatePremium = {
    auth: false,
    validate: {
        payload: {
            memberName: Joi.string().required().trim().max(150),
            memberID: Joi.string().required().trim().max(13),
            memberType: Joi.string().required().trim().max(50),
            insuredValue: Joi.number().required(),
        }
    },
    handler: async (request, h) => {  
        if(request.payload.memberType === 'Main Member'){
          try {
             let age = calculateUtil.calculateAge(request.payload.memberID);
             let premium = calculateUtil.calculateMainMemberPremium(age, request.payload.insuredValue);
             let fee = 10;
             const { memberName, memberID, memberType, insuredValue } = request.payload;
             const calculate = new Calculate({
                    memberName: memberName,
                    memberID: memberID,
                    memberType: memberType,
                    insuredValue: insuredValue,
                    premium: premium,
                    fee: fee,
                    total: premium + fee
                });
                  
             // save calculation record
             let savedCalculation = await calculate.save();
               
             return {
                 memberType: savedCalculation.memberType,
                 insuredValue: savedCalculation.insuredValue,
                 premium: premium,
                 fee: fee,
                 total: premium + fee,
                 calculationID: savedCalculation._id
             }
          } catch (err) {
                return Boom.badRequest(err.message);
          }
        } else  if(request.payload.memberType === 'Dependent'){
            try {
               let age = calculateUtil.calculateAge(request.payload.memberID);
               let premium = calculateUtil.calculateDependentPremium(age, request.payload.insuredValue);
               let fee = 10;
               const { memberName, memberID, memberType, insuredValue } = request.payload;
               const calculate = new Calculate({
                    memberName: memberName,
                    memberID: memberID,
                    memberType: memberType,
                    insuredValue: insuredValue,
                    premium: premium,
                    fee: fee,
                    total: premium + fee
                });
                  
             // save calculation record
             let savedCalculation = await calculate.save();
               
             return {
                 memberType: savedCalculation.memberType,
                 insuredValue: savedCalculation.insuredValue,
                 premium: premium,
                 fee: fee,
                 total: premium + fee,
                 calculationID: savedCalculation._id
             }
            } catch (err) {
                return Boom.badRequest(err.message);
            }
          }  else {
            return Boom.badRequest('Invalid member type')
          }   
                             
    }
};

exports.getPremiumCalculationsHistory = {
    auth: false,
    validate: {
        query: {
            searchBy: Joi.string().required().trim().max(150),
            pageNo: Joi.number().required(),
            perPage: Joi.number().required(),
        }
    },
    handler:  async (request, h) => { 
        console.log('End point hit');
        console.log(request.query); 
        const { searchBy } = request.query
        
        try {
            if (searchBy === 'All') {
                // get all calculations 
                let calculations = await Calculate.paginate({}, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage });
                if (calculations.docs.length === 0) {
                    throw new Error('No calculations found');
                }
                return {
                    data: calculations.docs,
                    total: calculations.total,
                    perPage: calculations.limit,
                    pageNo: calculations.page
                }
            } else if (searchBy === 'Main Member') {
                // get calculations with main member member type
                let calculations = await Calculate.paginate({ memberType: 'Main Member' }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage });
                if (calculations.docs.length === 0) {
                    throw new Error('No calculations found');
                }
                return {
                    data: calculations.docs,
                    total: calculations.total,
                    perPage: calculations.limit,
                    pageNo: calculations.page
                }
            } else if (searchBy === 'Dependent') {
                // get calculations with dependent member type
                let calculations = await Calculate.paginate({ memberType: 'Dependent' }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage });
                if (calculations.docs.length === 0) {
                    throw new Error('No calculations found');
                }
                return {
                    data: calculations.docs,
                    total: calculations.total,
                    perPage: calculations.limit,
                    pageNo: calculations.page
                }
            } else {
                throw new Error('Search filter invalid');
            }
        } catch (err) {
            return Boom.badRequest(err.message);
        }
                             
    }
};

exports.deletePremiumCalculationRecord = {
    auth: false,
    validate: {
        params: {
            recordID: Joi.number().required()
        }
    },
    handler: async (request, h) => {   
        const { recordID } = request.params;
        try {
            // delete calculation record
            let calculation = await Calculate.findOneAndRemove({ '_id': recordID });
            return {
                message: 'Calculation deleted successfully'
            }
        } catch (err) {
            return Boom.badRequest(err.message);
        }          
                             
    }
};