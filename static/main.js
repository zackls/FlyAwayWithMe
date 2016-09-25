var dataList = document.getElementById('json-datalist');
var input = document.getElementById('ajax');

var request = new XMLHttpRequest();
request.onreadystatechange = function(response) {
    if (request.readystate === 4){
        if(request.status === 200) {
            var jsonOptions = JSON.parse(request.responseText);
            jsonOptions.forEach(function(item) {
            var option = document.createElement('Airport');
            option.value = item;
            dataList.appendChild(item);
        });
        input.placeholder = "Enter Airport Name";
        } else {
            input.placeholder = "An Error Occured";
        }
    }
};

input.placeholder = "Loading Options";
request.open('GET', input-airports.json, true);
request.send();