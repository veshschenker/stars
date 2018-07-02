function addStar() {

    var data = {
        classification: document.getElementById("starClassification").value,
        name: document.getElementById("starName").value,
    };

    axios.post('/api/stars', data)
        .then(response => {
            console.log(response);
            //this will navigate back to the list of stars.
            window.location.href = "/stars"; 
        })
        .catch(error => {
            alert(error);
        })
}

function cancel() {
    //this will navigate back to the list of stars.
    window.location.href = '/stars';
}