const handleSignin = (req, res, db_conn, bcrypt)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json('All fields are required');
    }
    db_conn.select('email', 'hash')
    .from('public.login')
    .where({
        email: req.body.email
    })
    .then(data => {
       const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
       if(isValid){
           return db_conn.select('*')
           .from('public.users')
           .where({
               email: req.body.email
           })
           .then(user => {
               res.json(user[0]);
           })
           .catch(err => res.status(400).json('Unable to get user'))
       }else{
            res.status(404).json('Wrong login credentials')
       }
    })
    .catch(err => res.status(404).json('No user with this email found'))
}

module.exports = {
    handleSignin: handleSignin
}