const firebase = require('../db')
const User = require('../models/user');
const firestore = firebase.firestore();

const addUser = async(req,res,next) => {
    try{
        pass = req.body.password;
        cpass = req.body.confPassword;
        const profile = await firestore.collection('users').where("email", "==", req.body.email).get();
        if((pass==cpass) || !(Object.keys(profile).length === 0 && profile.constructor === Object)){
        const data = req.body;
        const user = await firestore.collection('users').doc().set(data);
        }
        res.redirect('http://localhost:3000/')
    }catch(error){
        res.status(400).send(error.message);
    }   

}

const verifyPass = async(req,res,next) => {
    try {
        const profile = await firestore.collection('users').where("email", "==", req.body.email).get();
        const snapshot = profile.docs[0];
        const data = snapshot.data();
        if(req.body.password==data.password){
            res.redirect('http://localhost:3000/profile')
        }
        else{
            res.redirect('http://localhost:3000/')
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUsers = async(req,res,next) => {
    try{
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if(data.empty){
            res.status(404).send("No User Record Found");
        }else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().name,
                    doc.data().email,
                    doc.data().city,
                    doc.data().phoneNumber,
                    doc.data().activity
                );
                usersArray.push(user);
            });
            res.send(usersArray);
        }
    } catch(error){
        res.status(400).send(error.message);
    }
}

const getUser = async(req,res,next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
        if(!data.exists){
            res.status(404).send("No User with this ID Found");
        }else{
            res.send(data.data());
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async(req,res,next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await firestore.collection("users").doc(id);
        await user.update(data);
        res.send('Student record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async(req,res,next) => {
    try {
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.send('Record deleted successfully')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    verifyPass
}