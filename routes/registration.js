export default function RegNumbersRoutes(regNumbersService, regNumbersFactory){
    async function index(req, res) {
        let town = regNumbersFactory.getTown();

        let addedRegNumbers = await regNumbersService.getAllRegNumbers();
        let filteredRegNumbers = await regNumbersService.filteredRegNumbers(town);

        res.render('index', {
            registration_numbers: filteredRegNumbers || addedRegNumbers,
        })
    }

    async function getRegistration(req, res) {
        let regNumber = req.params.reg_number;
    
        let chosenReg = await regNumbersService.getRegistration(regNumber.toUpperCase());
    
        res.render('reg_number', {chosenReg})
    }

    async function addRegistration(req, res) {
        regNumbersFactory.setRegNumber(req.body.reg);
    
        const regex = /^(CA|CF|CL|CJ)\s\d{3}(-?\d{1,3})$/i;
        let regNumber = regNumbersFactory.getRegNumber();
    
        if(regNumber !== '' && regex.test(regNumber)){
            await regNumbersService.addRegNumber(regNumber);
        }
        else{
            req.flash('error', regNumbersFactory.addRegNumber());
        }
        
        res.redirect('/')
    }

    function filterRegs(req, res) {
        let town = req.body.town;
        regNumbersFactory.setTown(town);
    
        res.redirect('/')
    }

    return{
        index,
        getRegistration,
        addRegistration,
        filterRegs
    }
}