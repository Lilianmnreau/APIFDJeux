const {Creneaux} = require('../models');
const {CreneauBenevole} = require('../models');


const createCreneau = async (req, res) => {
    try {
        const { ReferentId, nb_max,nb_inscrit, ouvert, HoraireId, JourId,LigneId,heure_debut,heure_fin,titre,idPlanning } = req.body;
        const creneau = await Creneaux.create({
            ReferentId: ReferentId,
            nb_max: nb_max,
            ouvert: ouvert,
            HoraireId: HoraireId,
            JourId: JourId,
            LigneId: LigneId,
            heure_debut: heure_debut,
            heure_fin: heure_fin,
            titre: titre,
            nb_inscrit: nb_inscrit,
            idPlanning: idPlanning
        });
        res.send(creneau);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
};

const getbyDate = async (req, res) => {
    const isAnimation = req.params.isAnimation
    try {
        const creneau = await Creneaux.findAll({
            where: {
                date: req.params.date,
                isAnimation: isAnimation,
            },
        });
        if (!creneau) throw new Error('Creneau not found');
        res.send(creneau);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
};

const getbyDateAndHoraire = async (req, res) => {
    try {
        const creneau = await Creneaux.findAll({
            where: {
                date: req.params.date,
                heure_debut: req.params.horaire_debut,
                heure_fin: req.params.horaire_fin,
                isAnimation: req.params.isAnimation
            },
        });
        if (!creneau) throw new Error('Creneau not found');
        res.send(creneau);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
};


const getbyDateAndIdUser = async (req, res) => {
    try{
        const creneauxbenevole = await CreneauBenevole.findAll({
            where: {
                idUser: req.params.iduser
            }
        });
        const listeCreneaux = []
        if (!creneauxbenevole) throw new Error('Creneau not found');
        for (let creneau of creneauxbenevole){
            const creneaux = await Creneaux.findOne({
                where: {
                    date: req.params.date,
                    idCreneau: creneau.idCreneau
                }
            });
            if (!creneaux) throw new Error('Creneau not found');
            else {
                listeCreneaux.push(creneaux)
            }
        }
        res.send(listeCreneaux)
    }
    catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
};



const getbyJour = async (req, res) => {
    try {
        const creneau = await Creneaux.findAll({
            where: {
                JourId: req.params.JourId,
                idPlanning: req.params.PlanningId
            },
        });
        if (!creneau) throw new Error('Creneau not found');
        res.send(creneau);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
};

const deleteByHoraireId = async (req, res) => {
    try {
        const id = req.params.id;
        const deletehoraire = await Creneaux.destroy({
            where: { HoraireId: id }
        });

        if (deletehoraire) {
            res.status(200).json({
                message: "Creneau deleted successfully",
            });
        } else {
            res.status(404).json({
                message: "Creneau not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error deleting creneau",
            error: error.message
        });
    }
}

const modifyHoraire = async (req, res) => {
    try {
        const creneaux = await Creneaux.findAll({
            where: {
                HoraireId: req.params.id,
            },
        });
        if (!creneaux.length) throw new Error('Creneau not found');
        for (let creneau of creneaux) {
            await creneau.update({heure_debut:req.body.heure_debut, heure_fin:req.body.heure_fin});
        }
        res.send(creneaux);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
}


const getCreneauById = async (req, res) => {
    try {
        const creneau = await Creneaux.findOne({
            where: {
                idCreneau: req.params.idCreneau,
            },
        });
        if (!creneau) throw new Error('Creneau not found');
        res.send(creneau);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
};


const modifyReferent = async (req, res) => {
    try {
        const creneau = await Creneaux.findOne({
        where: {
            idCreneau: req.params.idCreneau,
        },
        });
        if (!creneau) throw new Error('Creneau not found');
        await creneau.update({ReferentId:req.body.ReferentId});
        res.send(creneau);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
    }


const getbyId = async (req, res) => {
    try {
        const creneau = await Creneaux.findOne({
            where: {
                HoraireId: req.params.HoraireId,
                JourId: req.params.JourId,
                LigneId: req.params.LigneId,
            },
        });
        if (!creneau) throw new Error('Creneau not found');
        res.send(creneau);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
}


const deleteById = async (req, res) => {
    try {
        const creneau = await Creneaux.findOne({
        where: {
            idCreneau: req.params.id,
        },
        });
        if (!creneau) throw new Error('Creneau not found');
        await creneau.destroy();
        res.send(creneau);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
    }


    
    const modifyNbMax = async (req, res) => {
        try {
            const creneau = await Creneaux.findOne({
            where: {
                idCreneau: req.params.idCreneau,
            },
            });
            if (!creneau) throw new Error('Creneau not found');
            await creneau.update({nb_max:req.body.nb_max});
            res.send(creneau);
        } catch (error) {
            console.log(error);
            res.status(400).send({ errors: error.message });
        }
        }
    
    const modifyOuvert = async (req, res) => {
        try {
            const creneau = await Creneaux.findOne({
            where: {
                idCreneau: req.params.idCreneau,
            },
            });
            if (!creneau) throw new Error('Creneau not found');
            await creneau.update({ouvert:req.body.ouvert});
            res.send(creneau);
        } catch (error) {
            console.log(error);
            res.status(400).send({ errors: error.message });
        }
        }


        const addnbinscrit = async (req,res) => {
            try{
                const creneau = await Creneaux.findOne({
                    where: {
                        idCreneau: req.params.idCreneau,
                    },
                    });
                    if (!creneau) throw new Error('Creneau not found');
                    await creneau.update({nb_inscrit: creneau.nb_inscrit + 1});
                res.send(creneau);
            }
            catch(error){
                console.log(error);
                res.status(400).send({errors: error.message});
            }
        }

        const addnbinscritflexible = async (req,res) => {
            try{
                const creneau = await Creneaux.findOne({
                    where: {
                        idCreneau: req.params.idCreneau,
                    },
                    });
                    if (!creneau) throw new Error('Creneau not found');
                    await creneau.update({nb_inscrit_flexible: creneau.nb_inscrit_flexible + 1});
                res.send(creneau);
            }
            catch(error){
                console.log(error);
                res.status(400).send({errors: error.message});
            }
        }

        const subtractnbinscrit = async (req,res) => {
            try{
                const creneau = await Creneaux.findOne({
                    where: {
                        idCreneau: req.params.idCreneau,
                    },
                    });
                    if (!creneau) throw new Error('Creneau not found');
                    await creneau.update({nb_inscrit: creneau.nb_inscrit - 1});
                res.send(creneau);
            }
            catch(error){
                console.log(error);
                res.status(400).send({errors: error.message});
            }
        }

        const subtractnbinscritflexible = async (req,res) => {
            try{
                const creneau = await Creneaux.findOne({
                    where: {
                        idCreneau: req.params.idCreneau,
                    },
                    });
                    if (!creneau) throw new Error('Creneau not found');
                    await creneau.update({nb_inscrit_flexible: creneau.nb_inscrit_flexible - 1});
                res.send(creneau);
            }
            catch(error){
                console.log(error);
                res.status(400).send({errors: error.message});
            }
        }

        const deleteLigne = async(req, res) => {
            try {
                const id = req.params.idligne;
                const deleteligne = await Creneaux.destroy({
                    where: { LigneId: id }
                });
        
                if (deleteligne) {
                    res.status(200).json({
                        message: "Creneau deleted successfully",
                    });
                } else {
                    res.status(404).json({
                        message: "Creneau not found",
                    });
                }
            } catch (error) {
                res.status(500).json({
                    message: "Error deleting creneau",
                    error: error.message
                });
            }
        }

        const deleteByJourId = async (req, res) => {
            try {
                const id = req.params.id;
                const deletejour = await Creneaux.destroy({
                    where: { JourId: id }
                });
        
                if (deletejour) {
                    res.status(200).json({
                        message: "Creneau deleted successfully",
                    });
                } else {
                    res.status(404).json({
                        message: "Creneau not found",
                    });
                }
            } catch (error) {
                res.status(500).json({
                    message: "Error deleting creneau",
                    error: error.message
                });
            }
        }
    

    module.exports = {
        deleteById,
        modifyReferent,
        modifyNbMax,
        modifyOuvert,
        modifyHoraire,
        createCreneau,
        getbyId,
        addnbinscrit,
        addnbinscritflexible,
        subtractnbinscrit,
        subtractnbinscritflexible,
        getCreneauById,
        deleteLigne,
        getbyJour,
        deleteByHoraireId,
        deleteByJourId,
        getbyDate,
        getbyDateAndIdUser,
        getbyDateAndHoraire
    }