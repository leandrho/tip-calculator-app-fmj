
const billInput = document.querySelector('#bill-input');
const customInput = document.querySelector('#custom');
const peopleInput = document.querySelector('#people-input');

const radios = document.querySelectorAll('input[type="radio"]');

const calculateAndSet = () => {
    const billValue = +billInput.value;
    const peopleValue = +peopleInput.value;
    let tipValue = +customInput.value;
    if(tipValue==0){
        for(let i = 0; i<radios.length; ++i){
            if(radios[i].checked){
                tipValue=radios[i].value;   
                break;
            }
        }
    }
    const total = calculate(billValue, tipValue, peopleValue);
    const tipAmountElem = document.querySelector('#tip-per-person');
    const totalElem = document.querySelector('#total-per-person');
    tipAmountElem.value = `$${total.tipamount}`;
    totalElem.value = `$${total.total}`;
}

customInput.addEventListener('focus',()=>{
    for(let i = 0; i<radios.length; ++i){
        radios[i].checked=false;    
    }
});
const calculate = (bill, tip, people) => {
    console.log('BILL: ',bill);
    console.log('TIP: ',tip);
    console.log('PEOPLE: ',people);
    const tipt = (bill*tip)/100;
    const tipp = tipt/people;
    const totalp = (bill+tipt)/people;

    return {tipamount: tipp.toFixed(2), total: totalp.toFixed(2)}
}
const checkInputs = () => {
    if(billInput.value.trim()=='')
        return 0;
    else if(peopleInput.value.trim()=='')
        return -1;
    if(peopleInput.value==0)
        return -2;
    for(let i = 0; i<radios.length; ++i){
        if(radios[i].checked)
            return 1;
    }
    if(customInput.value.trim()=='')
        return -3;

    return 1;
}
const checkForm = () => {

    let err = checkInputs();
    const req = document.querySelector('.required');
    if(err==-2)
        req.classList.add('error');
    else
        req.classList.remove('error');

    if(err==1){
        calculateAndSet();
        return true;
    }

    return false;
}
billInput.addEventListener('change', (e) => {
    checkForm();
});
peopleInput.addEventListener('change', (e) => {
    checkForm();
});
customInput.addEventListener('change', (e) => {
    checkForm();
});
radios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
        customInput.value = '';
        checkForm();
    });
});

