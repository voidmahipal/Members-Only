import pool from "./pool.js";

async function getAllMessages() {
    const {rows} = await pool.query("SELECT m.*,u.firstname,u.lastname,u.username FROM messages m JOIN users u ON m.userid=u.id ;");
    return rows;
}
async function addUserInDB(firstname,lastname,username,password) {
    await pool.query("INSERT INTO users (firstname,lastname,username,password,ismember,isadmin) VALUES ($1,$2,$3,$4,$5,$6);",[firstname,lastname,username,password,false,false]);
}
async function giveMembershipStatus(id) {
    await pool.query("UPDATE users SET ismember=true WHERE id=$1",[id]);
}
async function giveAdminStatus(id) {
    await pool.query("UPDATE users SET isadmin=true WHERE id=$1",[id]);
}
async function getUserByUsername(name) {
    const {rows} = await pool.query("SELECT * FROM users WHERE username=$1;",[name]);
    return rows[0];
}
async function getUserById(id) {
    const {rows} = await pool.query("SELECT * FROM users WHERE id=$1;",[id]);
    return rows[0];
}
export {getAllMessages,addUserInDB,giveMembershipStatus,giveAdminStatus,getUserByUsername,getUserById};