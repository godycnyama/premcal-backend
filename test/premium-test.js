'use strict'

const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');
const { describe, it} = exports.lab = Lab.script();
const CalculationUtil = require('../premium-module/calculationUtil');

describe('Calculate Age', () => {
    it('throws an error if id number is not provided', () => {
        try {
            CalculationUtil.calculateAge();
        } catch (err) {
            expect(err.message).to.equal('ID number is missing');
        }
        
    });

    it('throws an error if id number is invalid', () => {
        try {
            CalculationUtil.calculateAge('77052712367GH');
        } catch (err) {
            expect(err.message).to.equal('ID number is invalid');
        }
    });

    it('throws an error if id number is not equal to 13 characters in length', () => {
        try {
            CalculationUtil.calculateAge('77052712');
        } catch (err) {
            expect(err.message).to.equal('ID number must be 13 characters in length');
        }
    });

    it('throws an error if date of birth in id number is invalid', () => {
        try {
            CalculationUtil.calculateAge('7715276784356');
        } catch (err) {
            expect(err.message).to.equal('Date of birth is invalid');
        }
    });

    it('throws an error if age is not between 18 and 65 years', () => {
        try {
            CalculationUtil.calculateAge('3105276784356');
        } catch (err) {
            expect(err.message).to.equal('Age should be between 18 and 65 years');
        }
    });
});

describe('Main member premium calculation', () => {
    it('throws error if age not provided', () => {
        try {
            CalculationUtil.calculateMainMemberPremium(null,10000);
        } catch (err) {
            expect(err.message).to.equal('Age is not provided');
        }
    })

    it('throws error if insured value is not provided', () => {
        try {
            CalculationUtil.calculateMainMemberPremium(20,null);
        } catch (err) {
            expect(err.message).to.equal('Insured value not provided');
        }
    })

    it('throws error if insured value is not acceptable value for main member', () => {
        try {
            CalculationUtil.calculateMainMemberPremium(20,4000);
        } catch (err) {
            expect(err.message).to.equal('Incorrect sum insured amount selected');
        }
    })
})

describe('Dependent member premium calculation', () => {
    it('throws error if age not provided', () => {
        try {
            CalculationUtil.calculateDependentPremium(null,5000);
        } catch (err) {
            expect(err.message).to.equal('Age is not provided');
        }
    })

    it('throws error if insured value is not provided', () => {
        try {
            CalculationUtil.calculateDependentPremium(20,null);
        } catch (err) {
            expect(err.message).to.equal('Insured value not provided');
        }
    })

    it('throws error if insured value is not acceptable value for dependent member', () => {
        try {
            CalculationUtil.calculateDependentPremium(20,10000);
        } catch (err) {
            expect(err.message).to.equal('Incorrect sum insured amount selected');
        }
    })
})
