'use strict';

const moment = require('moment');

moment.parseTwoDigitYear = function(yearString) {
  return parseInt(yearString) + 2000;
}

const calculateAge = (_id) => {
    let id = _id;

    // check if id number is provided
    if(!id){
        throw new Error('ID number is missing');
    }
    
    //check if id is a number
    if(isNaN(id)){
        throw new Error('ID number is invalid');
    }
    
    //check if id number has the correct length
    if(id.length !== 13){
        throw new Error('ID number must be 13 characters in length');
    }

    
    let dob = id.substr(0, 6); // extract 6 digit date of birth from the 13 digit id number

    
    let twoDigitYearOfBirth = id.substr(0, 2); // extract 2 digit year of birth from the 13 digit id number
    let twoDigitMonthOfBirth = id.substr(2, 2); // extract 2 digit month of birth from the 13 digit id number
    let twoDigitDateOfBirth = id.substr(4, 2); // extract 2 digit date of birth from the 13 digit id number
    
    // check if date of birth is valid
    if(!moment(dob, 'YYMMDD', true).isValid()){
        throw new Error('Date of birth is invalid');
    }

    let todayDate = new Date();
    let thisYear = todayDate.getFullYear().toString();

    //extract the last 2 digit of a 4 digit year
    let twoDigitYear = thisYear.substr(2, 2)
    let yearToNumTwoDigitCurrent = parseInt(twoDigitYear);
    let yearToNumTwoDigitYearOfBirth = parseInt(twoDigitYearOfBirth);
    let fourDigitYearOfBirth = (yearToNumTwoDigitYearOfBirth > (yearToNumTwoDigitCurrent+10)) ? '19' + yearToNumTwoDigitYearOfBirth : '20' + yearToNumTwoDigitYearOfBirth;
    
    let dateOfBirth = fourDigitYearOfBirth + '/' + twoDigitMonthOfBirth + '/' + twoDigitDateOfBirth  // format the date of birth to YYYY/MM/DD
    let age = moment().diff(moment(dateOfBirth, 'YYYY/MM/DD'),'years'); // calculate age from date of birth
    console.log(age);
    if(age < 18 || age > 65 ){
      throw new Error('Age should be between 18 and 65 years');
    }

    return age;
}


const calculateMainMemberPremium = (_age, _sumInsured) => {
    if(!_age){
      throw new Error('Age is not provided');
    }

    if(!_sumInsured){
      throw new Error('Insured value not provided');
    }
    var age = _age;
    var premiumAmount;
    switch(_sumInsured) {
        case 10000:
          if(age >= 18 && age <= 25 ){
            premiumAmount = 36;
          }

          if(age >= 26 && age <= 40 ){
            premiumAmount = 47;
          }

          if(age >= 41 && age <= 45 ){
            premiumAmount = 52;
          }

          if(age >= 46 && age <= 50 ){
            premiumAmount = 57;
          }

          if(age >= 51 && age <= 55 ){
            premiumAmount = 64;
          }

          if(age >= 56 && age <= 60 ){
            premiumAmount = 74;
          }

          if(age >= 61 && age <= 65 ){
            premiumAmount = 90;
          }
          break;
        case 15000:
          if(age >= 18 && age <= 25 ){
            premiumAmount = 49.05;
          }

          if(age >= 26 && age <= 40 ){
            premiumAmount = 64.95;
          }

          if(age >= 41 && age <= 45 ){
            premiumAmount = 73.05;
          }

          if(age >= 46 && age <= 50 ){
            premiumAmount = 79.95;
          }

          if(age >= 51 && age <= 55 ){
            premiumAmount = 90;
          }

          if(age >= 56 && age <= 60 ){
            premiumAmount = 106.05;
          }

          if(age >= 61 && age <= 65 ){
            premiumAmount = 130.05;
          }
            
          break;
        case 18000:
          if(age >= 18 && age <= 25 ){
            premiumAmount = 57.06;
          }

          if(age >= 26 && age <= 40 ){
            premiumAmount = 75.42;
          }

          if(age >= 41 && age <= 45 ){
            premiumAmount = 85.32;
          }

          if(age >= 46 && age <= 50 ){
            premiumAmount = 93.42;
          }

          if(age >= 51 && age <= 55 ){
            premiumAmount = 105.84;
          }

          if(age >= 56 && age <= 60 ){
            premiumAmount = 125.46;
          }

          if(age >= 61 && age <= 65 ){
            premiumAmount = 154.26;
          }
            break;
        case 20000:
          if(age >= 18 && age <= 25 ){
            premiumAmount = 62;
          }

          if(age >= 26 && age <= 40 ){
            premiumAmount = 82;
          }

          if(age >= 41 && age <= 45 ){
            premiumAmount = 93;
          }

          if(age >= 46 && age <= 50 ){
            premiumAmount = 102;
          }

          if(age >= 51 && age <= 55 ){
            premiumAmount = 116;
          }

          if(age >= 56 && age <= 60 ){
            premiumAmount = 138;
          }

          if(age >= 61 && age <= 65 ){
            premiumAmount = 170;
          } 
            break;
        case 30000:
          if(age >= 18 && age <= 25 ){
            premiumAmount = 93;
          }

          if(age >= 26 && age <= 40 ){
            premiumAmount = 123;
          }

          if(age >= 41 && age <= 45 ){
            premiumAmount = 139;
          }

          if(age >= 46 && age <= 50 ){
            premiumAmount = 153;
          }

          if(age >= 51 && age <= 55 ){
            premiumAmount = 174;
          }

          if(age >= 56 && age <= 60 ){
            premiumAmount = 207;
          }

          if(age >= 61 && age <= 65 ){
            premiumAmount = 255;
          }
            break;
        
        default:
          throw new Error('Incorrect sum insured amount selected');
      }
    
      return premiumAmount;
}

const calculateDependentPremium = (_age, _sumInsured) => {
  if(!_age){
    throw new Error('Age is not provided');
  }

  if(!_sumInsured){
    throw new Error('Insured value not provided');
  }
    var age = _age;
    var premiumAmount;
    switch(_sumInsured) {
        case 5000:
          if(age >= 18 && age <= 25 ){
            premiumAmount = 30;
          }

          if(age >= 26 && age <= 40 ){
            premiumAmount = 38;
          }

          if(age >= 41 && age <= 45 ){
            premiumAmount = 42;
          }

          if(age >= 46 && age <= 50 ){
            premiumAmount = 46;
          }

          if(age >= 51 && age <= 55 ){
            premiumAmount = 51;
          }

          if(age >= 56 && age <= 60 ){
            premiumAmount = 61;
          }

          if(age >= 61 && age <= 65 ){
            premiumAmount = 74;
          }
          
          break;
        case 12000:
          if(age >= 18 && age <= 25 ){
            premiumAmount = 36;
          }

          if(age >= 26 && age <= 40 ){
            premiumAmount = 48;
          }

          if(age >= 41 && age <= 45 ){
            premiumAmount = 54;
          }

          if(age >= 46 && age <= 50 ){
            premiumAmount = 58.95;
          }

          if(age >= 51 && age <= 55 ){
            premiumAmount = 67.95;
          }

          if(age >= 56 && age <= 60 ){
            premiumAmount = 82.05;
          }

          if(age >= 61 && age <= 65 ){
            premiumAmount = 103.05;
          }
          break;
        case 18000:
          if(age >= 18 && age <= 25 ){
            premiumAmount = 39.96;
          }

          if(age >= 26 && age <= 40 ){
            premiumAmount = 54.36;
          }

          if(age >= 41 && age <= 45 ){
            premiumAmount = 61.56;
          }

          if(age >= 46 && age <= 50 ){
            premiumAmount = 67.68;
          }

          if(age >= 51 && age <= 55 ){
            premiumAmount = 78.48;
          }

          if(age >= 56 && age <= 60 ){
            premiumAmount = 95.58;
          }

          if(age >= 61 && age <= 65 ){
            premiumAmount = 120.24;
          }
            break;
        case 22000:
          if(age >= 18 && age <= 25 ){
            premiumAmount = 42;
          }

          if(age >= 26 && age <= 40 ){
            premiumAmount = 58;
          }

          if(age >= 41 && age <= 45 ){
            premiumAmount = 66;
          }

          if(age >= 46 && age <= 50 ){
            premiumAmount = 73;
          }

          if(age >= 51 && age <= 55 ){
            premiumAmount = 85;
          }

          if(age >= 56 && age <= 60 ){
            premiumAmount = 104;
          }

          if(age >= 61 && age <= 65 ){
            premiumAmount = 131;
          }
            break;
        case 25000:
          if(age >= 18 && age <= 25 ){
            premiumAmount = 63;
          }

          if(age >= 26 && age <= 40 ){
            premiumAmount = 87;
          }

          if(age >= 41 && age <= 45 ){
            premiumAmount = 99;
          }

          if(age >= 46 && age <= 50 ){
            premiumAmount = 109.50;
          }

          if(age >= 51 && age <= 55 ){
            premiumAmount = 127.50;
          }

          if(age >= 56 && age <= 60 ){
            premiumAmount = 156;
          }

          if(age >= 61 && age <= 65 ){
            premiumAmount = 196.50;
          }
            break;
        default:
            throw new Error('Incorrect sum insured amount selected');
      }
      
      return premiumAmount;
}

module.exports = {
    calculateMainMemberPremium: calculateMainMemberPremium,
    calculateDependentPremium: calculateDependentPremium,
    calculateAge: calculateAge
}