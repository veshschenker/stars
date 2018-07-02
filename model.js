const { Client } = require('pg');
const client = new Client({
    user: "vreni",
    password: "Vreni1980",
    host: "192.168.99.100",
    port: 5432,
    database: "stars",
})

client.connect();
console.log('connected to database');

exports.getListOfStars = async function () {
    console.log('getting list of stars');
    const sql = "select * from stars";
    const res = await client.query(sql);
    return res.rows;
}

exports.getStar = async function (starId) {
    console.log('getting star with id ' + starId);
    const sql = 'select * from stars where starId=' + starId;
    const res = await client.query(sql);
    return res.rows[0];
}

exports.addStar = async function (star) {
    const result = await client.query('SELECT MAX(starId)  AS maxId FROM stars');
    const maxId = result.rows[0].maxid || 1;
    console.log(maxId);
    console.log(result, result.rows.length);
    const sql = 'INSERT INTO stars(starId,name,classification,image) VALUES($1,$2,$3,$4) RETURNING *';
    const values = [maxId + 1, star.name, star.classification, star.image];
    const res = await client.query(sql, values);
}


exports.deletStar = async function (starId) {
    console.log('deleting star with id ' + starId);
    const sql = "delete from stars where starId=" + starId;
    await client.query(sql);
}

exports.updateStar = async function (starId, newStar) {
    console.log('updating star with id '+ starId,newStar);
    const sql = 'UPDATE stars SET name=$1, classification=$2, image=$3 WHERE starid=$4';
    const values = [
        newStar.name,
        newStar.classification,
        newStar.image,
        starId
    ];
    const res = await client.query(sql, values);
}


