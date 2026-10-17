import pool from "./pool.js";

async function addUserInDB(firstname,lastname,username,password) {
    await pool.query("INSERT INTO users (firstname,lastname,username,password,ismember,isadmin) VALUES ($1,$2,$3,$4,$5,$6);"[firstname,lastname,username,password,false,false]);
}
async function giveMembershipStatus(id) {
    await pool.query("UPDATE users SET ismember=true WHERE id=$1",[id]);
}
async function giveAdminStatus(id) {
    await pool.query("UPDATE users SET isadmin=true WHERE id=$1",[id]);
}
export {addUserInDB,giveMembershipStatus,giveAdminStatus};