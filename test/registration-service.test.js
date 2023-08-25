import assert from 'assert';
import pgPromise from 'pg-promise';
import RegNumbersDatabase from '../services/reg_numbers.database.js';

const password = process.env.Password;

const connection = process.env.DATABASE_URL || `postgresql://postgres:${password}@localhost:5432/reg_testdb`;

const db = pgPromise()(connection);

describe("Registration numbers database web app", function () {
    this.timeout(7000);
    beforeEach(async function () {
        try {
            await db.none("TRUNCATE TABLE registration_numbers RESTART IDENTITY CASCADE;");
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    it("should able to add a registration number", async function () {
        try{
            let registrationService = RegNumbersDatabase(db);

            await registrationService.addRegNumber('CA 1234');
            await registrationService.addRegNumber('CL 123-456');

            let registration_numbers = await registrationService.getAllRegNumbers();
            
            assert.equal(2, registration_numbers.length);
        }
        catch(err){
            console.log(err);
        }
    });

    it("Should able to filter registration numbers for a specific town", async function () {
        try{
            let registrationService = RegNumbersDatabase(db);

            await registrationService.addRegNumber('CA 1234');
            await registrationService.addRegNumber('CL 123-456');
            await registrationService.addRegNumber('CA 1568');
            await registrationService.addRegNumber('CL 173-456');
            await registrationService.addRegNumber('CA 8854');

            let capeRegs = await registrationService.filteredRegNumbers('Cape Town');

            assert(3, capeRegs.length);
        }
        catch(err){
            console.log(err);
        }
    });

    it("should able to get a specific registration number", async function () {
        try{
            let registrationService = RegNumbersDatabase(db);

            await registrationService.addRegNumber('CA 1234');
            await registrationService.addRegNumber('CL 123-456');
            await registrationService.addRegNumber('CA 1568');

            let regNumber = await registrationService.getRegistration('CA 1234');

            assert.equal('CA 1234', regNumber.registration_number);
        }
        catch(err){
            console.log(err);
        }
    });

    after(function () {
        db.$pool.end;
    });
});