import RegistrationNumbers from "../reg_numbers.js";
import assert from "assert";

describe('Registration Numbers Tests', ()=>{
    describe('Adding Registration Numbers', ()=>{
        it('should create a new registration for the town Cape Town(CA)', ()=>{
            let regNumbers = new RegistrationNumbers();

            regNumbers.setRegNumber('CA 1234');

            assert.equal('CA 1234', regNumbers.getRegNumber());
        })
        it('should create a new registration for the town Paarl(CJ)', ()=>{
            let regNumbers = new RegistrationNumbers();

            regNumbers.setRegNumber('CJ 123-4');

            assert.equal('CJ 123-4', regNumbers.getRegNumber());
        })

        it('should create a new registration for the town Stellenbosch(CL)', ()=>{
            let regNumbers = new RegistrationNumbers();

            regNumbers.setRegNumber('CL 12345');

            assert.equal('CL 12345', regNumbers.getRegNumber());
        })
        it('should create a new registration for the town Kuils River(CF)', ()=>{
            let regNumbers = new RegistrationNumbers();

            regNumbers.setRegNumber('CF 123-456');

            assert.equal('CF 123-456', regNumbers.getRegNumber());
        })
    })
    describe('Should handle errors for invalid registration number inputs', ()=>{
        it('should return and error message if no registration number is inserted', ()=>{
            let regNumbers = new RegistrationNumbers();

            regNumbers.setRegNumber('');

            assert.equal('Please enter a valid unique registration number', regNumbers.addRegNumber());
        })
        it('should return and error message if only numbers are provided', ()=>{
            let regNumbers = new RegistrationNumbers();

            regNumbers.setRegNumber('123-456');

            assert.equal('Please enter a valid unique registration number', regNumbers.addRegNumber());
        })
        it('should return and error message if only letters are provided', ()=>{
            let regNumbers = new RegistrationNumbers();

            regNumbers.setRegNumber('CA ');

            assert.equal('Please enter a valid unique registration number', regNumbers.addRegNumber());
        })
        it('should return and error message if an invalid town is provded', ()=>{
            let regNumbers = new RegistrationNumbers();

            regNumbers.setRegNumber('CU 123-456');

            assert.equal('Please enter a valid unique registration number', regNumbers.addRegNumber());
        })
    })

    describe('Filtering the registration numbers according to the selected town', ()=>{
        it('Should return a list of all the Cape Town registration numbers', ()=>{
            let regNumbers = new RegistrationNumbers();

            regNumbers.setRegNumber('CA 1561');
            regNumbers.addRegNumber();
            regNumbers.setRegNumber('CA 1562');
            regNumbers.addRegNumber();
            regNumbers.setRegNumber('CL 1561');
            regNumbers.addRegNumber();
            regNumbers.setRegNumber('CL 1561');
            regNumbers.addRegNumber();

            regNumbers.setTown('Cape Town');
            regNumbers.allFromTown('CA');

            assert.deepEqual(['CA 1561','CA 1562'], regNumbers.filterRegNumbers());
        })
        it('Should return a list of all the Stellenbosch registration numbers', ()=>{
            let regNumbers = new RegistrationNumbers();

            regNumbers.setRegNumber('CA 1561');
            regNumbers.addRegNumber();
            regNumbers.setRegNumber('CA 1562');
            regNumbers.addRegNumber();
            regNumbers.setRegNumber('CL 1566');
            regNumbers.addRegNumber();
            regNumbers.setRegNumber('CL 1563');
            regNumbers.addRegNumber();

            regNumbers.setTown('Stellenbosch');
            regNumbers.allFromTown('CL');

            assert.deepEqual(['CL 1566','CL 1563'], regNumbers.filterRegNumbers());
        })
        it('Should return a list of all Kuils River registration numbers', ()=>{
            let regNumbers = new RegistrationNumbers();

            regNumbers.setRegNumber('CF 1561');
            regNumbers.addRegNumber();
            regNumbers.setRegNumber('CF 1562');
            regNumbers.addRegNumber();
            regNumbers.setRegNumber('CL 1561');
            regNumbers.addRegNumber();
            regNumbers.setRegNumber('CL 1561');
            regNumbers.addRegNumber();

            regNumbers.setTown('Kuils River');
            regNumbers.allFromTown('CF');

            assert.deepEqual(['CF 1561','CF 1562'], regNumbers.filterRegNumbers());
        })
        it('Should return a list of all the Paarl registration numbers', ()=>{
            let regNumbers = new RegistrationNumbers();

            regNumbers.setRegNumber('CJ 1561');
            regNumbers.addRegNumber();
            regNumbers.setRegNumber('CJ 1562');
            regNumbers.addRegNumber();
            regNumbers.setRegNumber('CL 1561');
            regNumbers.addRegNumber();
            regNumbers.setRegNumber('CL 1561');
            regNumbers.addRegNumber();

            regNumbers.setTown('Paarl');
            regNumbers.allFromTown('CJ');

            assert.deepEqual(['CJ 1561','CJ 1562'], regNumbers.filterRegNumbers());
        })
    })
})