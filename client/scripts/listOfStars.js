function deleteStar(starId) {
    const url = "/api/stars/" + starId;
    axios.delete(url)
        .then(response => {
            console.log(response);
            var row = document.getElementById('row-' + starId);
            row.parentElement.removeChild(row);
        })
        .catch(error => {
            console.log(error);
        })
}

function editStar(starId){
window.location.href="/stars/edit/"+ starId;
}