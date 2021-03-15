const firebase = require('../db')
const Center = require('../models/fitCenter');
const firestore = firebase.firestore();

const addCenter = async(req,res,next) => {
    try{
        const data = req.body;
        const center = await firestore.collection('centers').doc().set(data);
        res.send(center);
    }catch(error){
        res.status(400).send(error.message);
    }
}

const getAllCenters = async(req,res,next) => {
    try{
        const users = await firestore.collection('centers');
        const data = await users.get();
        const centersArray = [];
        if(data.empty){
            res.status(404).send("No Center Record Found");
        }else {
            data.forEach(doc => {
                const center = new Center(
                    doc.id,
                    doc.data().name,
                    doc.data().phoneNumber,
                    doc.data().title,
                    doc.data().img_url,
                    doc.data().web_url,
                    doc.data().timing,
                    doc.data().activity,
                );
                centersArray.push(center);
            });
            res.send(centersArray);
        }
    } catch(error){
        res.status(400).send(error.message);
    }
}

const deleteCenter = async(req,res,next) => {
    try {
        const id = req.params.id;
        await firestore.collection('centers').doc(id).delete();
        res.send('Record deleted successfully')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addCenter,
    getAllCenters,
    deleteCenter
}