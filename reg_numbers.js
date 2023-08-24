export default function RegistrationNumbers(){
    let regNumbers = [];
    let theRegNumber = '';
    let selectedTown = '';

    function setRegNumber(regNumber){
        theRegNumber = regNumber;
    }

    function getRegNumber(){
        return theRegNumber;
    }

    function getRegNumbers(){
        return regNumbers;
    }

    function addRegNumber(){
        if(theRegNumber !== '' && validateRegNo(theRegNumber) && !regNumbers.includes(theRegNumber)){
            regNumbers.push(theRegNumber);
        }
        else{
            return error();
        }
    }

    function validateRegNo(regNo) {
        const regex = /^(CA|CF|CL|CJ)\s\d{3}(-?\d{1,3})$/i;
    
        return regex.test(regNo);
    }

    function setTown(selectedTown1){
        selectedTown = selectedTown1;
    }

    function getTown(){
        return selectedTown;
    }

    function allFromTown(city) {
        var newArr = [];
      
        for (var i = 0; i < regNumbers.length; i++) {
          let reg = regNumbers[i].toUpperCase();
          if(reg.startsWith(city.toUpperCase())){
              newArr.push(reg);
          }
        }
      
        return newArr;
    }

    function showReg(reg){
        let regNum = reg.toUpperCase();
        let chosenReg = '';
        regNumbers.forEach(reg =>{
            if(reg.toUpperCase() === regNum){
                chosenReg = reg;
            }
        })
        return chosenReg || 'Registration not found!';
    }

    function error(){
        return 'Please enter a valid unique registration number';
    }

    function emptyError(){
        return 'No registration numbers to display';
    }

    function filterRegNumbers() {
        if(selectedTown === 'Cape Town') {
            let capeRegs = allFromTown('CA');
            
            return capeRegs;
        }
        else if(selectedTown === 'Paarl'){
            let paarlRegs = allFromTown('CJ');
            
            return paarlRegs;
        }
        else if(selectedTown === 'Kuils River'){
            let KuilsRegs = allFromTown('CF');
            
            return KuilsRegs;
        }
        else if(selectedTown === 'Stellenbosch'){
            let stellRegs = allFromTown('CL');
            
            return stellRegs;
        }
        else{
            return regNumbers
        }
    }

    return {
        setRegNumber,
        getRegNumber,
        getRegNumbers,
        setTown,
        getTown,
        addRegNumber,
        allFromTown,
        filterRegNumbers,
        error,
        emptyError,
        showReg
    }
}