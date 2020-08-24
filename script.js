const balance = document.getElementById('balance');
const income  = document.getElementById('money-plus')
const expense = document.getElementById('money-minus')
const history = document.getElementById('list')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

//Buttons

const addBtn = document.getElementById('btn')

let data = [
    

]

const randomNo = () =>{
    return Math.floor(Math.random()*10000000)
}


const updateStats = () =>{
    let userBalance=0;
    let userIncome=0;
    let userExpense=0;
    data.forEach((elem)=>{
        userBalance+=elem.amount

        if(elem.amount>0){
            userIncome+=elem.amount
        }
        else{
            userExpense+=elem.amount
        }
    })
    balance.innerHTML=`$${userBalance.toFixed(2)}`;
    income.innerHTML=`+$${userIncome.toFixed(2)}`
    expense.innerHTML=`-$${Math.abs(userExpense.toFixed(2))}`
   

}

const deleteElem = (e) =>{
    

    data=data.filter((elem)=>{
       
        return elem.id!== +e.parentElement.getAttribute('data-uid')

        
    })
    localStorage.setItem('dataSet', JSON.stringify(data))
    loadHistory(data);
    updateStats();
}

const loadHistory = (display=data) =>{
    history.innerHTML=''
   
        
    
    display.forEach(elem => {
        let addedClass = elem.amount<0? 'minus': 'plus'
        let item = document.createElement('li')
        item.setAttribute('class', addedClass)
        item.setAttribute('data-uid',elem.id)
        item.innerHTML=`${elem.name} <span>${elem.amount}$</span> <button class="delete-btn" onclick='deleteElem(this)'>x</button>`
        console.log(item);
        history.appendChild(item)
        updateStats();
        
       
        
    });

}

const getLocalData = () =>{
        let localData=localStorage.getItem('dataSet')
        if(localData!==''){
            let localDataOriginal = JSON.parse(localData)
            data = [...localDataOriginal]
            loadHistory()
    } 
}

const addTransaction = (e) =>{
    e.preventDefault()
   
    let transactionName = text.value
    let transactionAmount = amount.value
    if(transactionName==''||transactionAmount==''){
        alert('Please Enter Both The Fields')
    }
    else{
        let addedData = {
            name:`${transactionName}`,
            amount:+`${transactionAmount}`,
            id:randomNo()
        }
        

        data.push(addedData)
        localStorage.setItem('dataSet', JSON.stringify(data))
        loadHistory();
        text.value=``;
        amount.value='';
    }

}



getLocalData();

addBtn.addEventListener('click', addTransaction)