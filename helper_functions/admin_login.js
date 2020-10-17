const getUser = (user, db) => {
  return db.query(`SELECT * FROM admin WHERE name = $1`, [user])
  .then(res => res.rows)
  .catch(err => console.log('error', err));
};

const validateUser = (user, name, password, res) => {
  if (!user) {
    res.redirect('./login')
    return;
  }
  if (user.name === name && user.password === password) {
    res.redirect('./pending');
    return;
  }

  //user exists, password is wrong
  //TODO ADD ERROR MESSAGE
  res.redirect('./login');
};


module.exports = {
  getUser,
  validateUser
}

