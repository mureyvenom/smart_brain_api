const handleProfile = (req, res, db_conn) => {    
    const { id } = req.params;

    db_conn('public.users').where({
        id: id
    })
    .then(user => {
        if(user.length){
            res.json(user[0]);
        }else{
            res.status(404).json('Profile does not exist')
        }
        
    })    

}

module.exports = {
    handleProfile: handleProfile
}