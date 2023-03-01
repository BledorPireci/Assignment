function insertUser(connection, email, password, name) {
    connection.query(
        `INSERT INTO users(email, userPassword, userName)
        VALUES("${email}", "${password}", "${name}");`,
    )
}

async function getUserById(connection, id) {
    let user;
    if (id.includes('@'))
        user = await getQueryWithPromise(connection, `SELECT * FROM users WHERE email = "${id}";`);
    else
        user = await getQueryWithPromise(connection, `SELECT * FROM users WHERE id = ${id};`);
    return user[0];
}

async function emailExists(connection, email) {
    const user = await getUserById(connection, email);
    if (user)
        return true;
    return false;
}

async function getUsers(connection) {
    return await getQueryWithPromise(connection, "SELECT * FROM users;");
}

async function getQueryWithPromise(connection, queryStatement) {
    return connection.promise().query(queryStatement).then(([rows, fields]) => {
        return(rows);
    }).catch(console.log);
}

async function deleteUser(connection, user_id) {
    connection.query(
        `DELETE FROM users WHERE id = ${user_id};`
    );
}

function updateUser(connection, id, email, password, userName) {
    connection.query(
        `UPDATE users SET email = "${email}", password = "${password}",
        userName = "${userName}" WHERE id = ${id};`
    )
}

module.exports = { insertUser, getUserById, getUsers, deleteUser, updateUser, emailExists };