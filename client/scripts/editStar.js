function saveStar(starId) {

    var data = {
        name: document.getElementById('starName').value,
        classification: document.getElementById('starClassification').value,
        image: document.getElementById('starImage').value
    };
    var url = '/api/stars/' + starId;
    axios.put(url, data)
        .then(response => {
            console.log(response);
            window.location.href = "/stars";
        })
        .catch(error => {
            console.log(error);
        });
}

function clearStar(){
    window.location.href="/stars";
}