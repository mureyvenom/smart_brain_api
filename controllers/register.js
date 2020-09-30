const handleRegister = (req, res, db_conn, bcrypt)=>{
    const {email, name, password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('All fields are required');
    }
    const hash = bcrypt.hashSync(password);

    db_conn.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('public.login')
        .returning('email')
        .then(loginEmail => {
            return trx('public.users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => res.status(404).json(err))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })   

}

module.exports = {
    handleRegister: handleRegister
}