class User {
    constructor(id, name, email, city, phoneNumber, activity, password, confPassword){
        this.id = id;
        this.name = name;
        this.email = email;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.activity = activity;
        this.password = password;
        this.confPassword = confPassword;
    }
}

module.exports = User;