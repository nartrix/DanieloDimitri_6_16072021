const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // creates the image address
      likes:0,
      dislikes:0,
      usersLiked:[],
      usersDisliked:[]
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? // check if the file exists
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // update the existing file
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};

exports.getSauce=(req, res, next)=>{
    Sauce.findOne({_id :req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({error:error})
    );
};

exports.getSauces = (req, res, next) =>{
    Sauce.find() // get all sauces
    .then((sauces)=> res.status(200).json(sauces))
    .catch((error) => res.status(400).json({error}));
};

exports.likeSauce = (req, res, next) =>{
  if(req.body.like ==1){//si user a like
    Sauce.updateOne({_id: req.params.id}, {$inc:{likes:1}, $push:{usersLiked:req.body.userId },_id:req.params.id } )//c est l id qu on va modifie
    .then(sauces=> res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
  }else if(req.body.like ==-1){//si user a dislike
    Sauce.updateOne({_id: req.params.id}, {$inc:{dislikes:1}, $push:{usersDisliked:req.body.userId },_id:req.params.id } )
    .then(sauces=> res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
  }else if(req.body.like ==0){
    Sauce.findOne({_id: req.params.id})
    .then(sauces=> {
      if(sauces.usersLiked.find(user=> user===req.body.userId)){//si il avait like
        Sauce.updateOne({_id: req.params.id}, {$inc:{likes:-1}, $pull:{usersLiked:req.body.userId },_id:req.params.id } )
        .then(sauces=> res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
      }
      if(sauces.usersDisliked.find(user=> user===req.body.userId)){//si il avait dislike
        Sauce.updateOne({_id: req.params.id}, {$inc:{dislikes:-1}, $pull:{usersDisliked:req.body.userId },_id:req.params.id } )
        .then(sauces=> res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
      }
    })
    .catch(error=> res.status(500).json({ error }));
  }
}