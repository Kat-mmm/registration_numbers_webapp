export default function RegNumbersDatabase(db){
    async function addRegNumber(regNumber){
        try{
            let prefix = regNumber.slice(0, 2).toUpperCase();
            let result = await db.oneOrNone(`INSERT INTO registration_numbers (registration_number, town_id) VALUES ($1, (SELECT id FROM towns WHERE town_prefix = $2)) ON CONFLICT (registration_number) DO NOTHING RETURNING id;`, [regNumber, prefix]);

            return result;
        }
        catch(error){
            throw new Error(`Error adding registration number: ${error.message}`)
        }
    }

    async function getAllRegNumbers(){
        let result = await db.any(`SELECT registration_number FROM registration_numbers`);

        return result;
    }

    async function filteredRegNumbers(town) {
        try {
            if(town === ''){
                return await db.any(`SELECT registration_number FROM registration_numbers`);
            }
            let result = await db.any(`SELECT r.registration_number FROM registration_numbers r JOIN towns t ON r.town_id = t.id WHERE t.town_name = $1;`, [town]);
            return result;
        } catch (error) {
            throw new Error(`Error getting filtered registration numbers: ${error.message}`);
        }
    }

    async function getRegistration(reg){
        let result = await db.oneOrNone(`SELECT registration_number FROM registration_numbers WHERE registration_number = $1;`, [reg]);

        return result;
    }

    async function clearRegistrations(){
        await db.none("TRUNCATE TABLE registration_numbers RESTART IDENTITY CASCADE;");
    }

    return{
        addRegNumber,
        getAllRegNumbers,
        filteredRegNumbers,
        getRegistration,
        clearRegistrations
    }
}