alerts = {};
function newAlert(){
    let table = document.getElementById("alerts");
    let length = table.rows.length;
    let new_row = table.insertRow(length) 

    let alert_name_input = document.getElementById("name_input").value;
    let alert_scrip_input = document.getElementById("scrip_input").value;
    let alert_criteria_input = document.getElementById("criteria_input").value;
    let alert_price_input = document.getElementById("price_input").value;

    if(isNaN(alert_price_input)){
        alert("Please select a valid price!")
        return;
    }
    else if(!alert_price_input){
        alert("Alert price cannot be empty!");
        return;
    }

    if(alert_name_input in alerts){
        alert(`${alert_name_input} is already running!`);
        return;
    }
    else if(alert_name_input==""){
        alert("Alert Name cannot be empty!");
        return;
    }
    alerts[alert_name_input] = [alert_scrip_input, alert_criteria_input, alert_price_input];

    let alert_name = new_row.insertCell(0);
    alert_name.innerHTML = alert_name_input;

    let alert_scrip = new_row.insertCell(1);
    alert_scrip.innerHTML = alert_scrip_input;

    let alert_criteria = new_row.insertCell(2);
    alert_criteria.innerHTML = alert_criteria_input;

    let alert_price = new_row.insertCell(3);
    alert_price.innerHTML = alert_price_input;

    // update with LTP
    let balert_price = new_row.insertCell(4);
    balert_price.innerHTML = alert_price_input;

    let del_button = new_row.insertCell(5);
    let del_html = `<button type="button" class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                    </svg>
                </button>`;
    del_button.innerHTML = del_html;

    // On clicking delete button 
    del_button.addEventListener('click', function(){
        new_row.remove();
        delete alerts[alert_name_input];
    });
}

var requestLoop = setInterval(()=>{
    const url = 'http://127.0.0.1:3000/json';
    axios.get(url)
    .then(data => update_LTP(data.data))
    .catch(error => console.log(error))
}, 5000)

function update_LTP(data){
    console.log(data);
    let table = document.getElementById("alerts");
    for (let i=1, row; row = table.rows[i]; i++) {
        let scrip = row.cells[1].innerText;
        row.cells[4].innerHTML = data[scrip];
    }
}