const {CreneauBenevole} = require('../models');

const inscription = async (req,res) => {
    try{
        const {idCreneau,idUser, flexible} = req.body;
        const creneau_benevole = await CreneauBenevole.create({
            idUser: idUser,
            idCreneau: idCreneau,
            isPresent: 0,
            flexible: flexible
        });
        res.send(creneau_benevole);
    }
    catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

const changeisPresent = async (req,res) => {
    try{
        const {idCreneau,idUser,isPresent} = req.body;
        const creneau_benevole = await CreneauBenevole.update({
            isPresent: isPresent
        },{
            where: {
                idUser: idUser,
                idCreneau: idCreneau
            }
        });
        res.send(creneau_benevole);
    }
    catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

const desinscription = async (req,res) => {
    try{
        const {idCreneau,idUser} = req.body;
        const creneau_benevole = await CreneauBenevole.destroy({
            where: {
                idUser: idUser,
                idCreneau: idCreneau
            }
        });
        if (creneau_benevole) {
            res.send(false)
        } else {
            res.send(true)
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

const isInscrit = async (req,res) => {
    try{
        const creneau_benevole = await CreneauBenevole.findOne({
            where: {
                idUser: req.params.idUser,
                idCreneau: req.params.idCreneau
            }
        });
        if (!creneau_benevole) {
            res.send("non")
        }
        else if (creneau_benevole.flexible == 0) {
            res.send("oui")
        } else if (creneau_benevole.flexible == 1){
            res.send("flexible")
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}


const getbenevoles = async (req,res) => {
    try{
        const creneau_benevole = await CreneauBenevole.findAll({
            where: {
                idCreneau: req.params.idCreneau
            }
        });
        res.send(creneau_benevole);
    
    }
    catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}
const getcreneaux = async (req,res) => {
    try{
        const creneau_benevole = await CreneauBenevole.findAll({
            where: {
                idUser: req.params.UserId
            }
        });
        res.send(creneau_benevole);
    }
    catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}




module.exports = {
    inscription,
    getbenevoles,
    getcreneaux,
    desinscription,
    changeisPresent,
    isInscrit
}