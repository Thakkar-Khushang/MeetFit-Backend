class Center {
    constructor(id, name, phoneNumber, title, img_url, web_url, timing, activity){
        this.id = id;
        this.name = name;
        this.title = title;
        this.phoneNumber = phoneNumber;
        this.img_url = img_url;
        this.web_url = web_url;
        this.timing = timing;
        this.activity = activity;
    }
}

module.exports = Center;