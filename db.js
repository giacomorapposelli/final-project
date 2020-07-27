const spicedPg = require("spiced-pg");
const { NamedModulesPlugin } = require("webpack");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPass } = require("./secrets");
    db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/speedkobra`);
}

exports.addUser = (
    firstname,
    lastname,
    email,
    address,
    zip,
    city,
    country,
    password
) => {
    if (
        firstname.trim() === "" ||
        lastname.trim() === "" ||
        email.trim() === "" ||
        address.trim() === "" ||
        zip.trim() === "" ||
        city.trim() === "" ||
        country.trim() === "" ||
        password.trim() === ""
    ) {
        return;
    }
    return db.query(
        `INSERT INTO users (first, last, email, address, zip, city, country, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [firstname, lastname, email, address, zip, city, country, password]
    );
};

exports.getEmail = (email) => {
    return db.query(
        `
        SELECT * FROM users
        WHERE email = $1
        `,
        [email]
    );
};

exports.addTshirt = (size, userId) => {
    return db.query(
        `INSERT INTO orders (tshirt,size,price,imgurl,user_id) VALUES ('Harvester of Hate T-shirt',$1,10,'tshirt.jpg',$2) RETURNING id,tshirt,size,price,imgurl,user_id`,
        [size, userId]
    );
};

exports.addLongsleeve = (size, userId) => {
    return db.query(
        `INSERT INTO orders (tshirt,size,price,imgurl,user_id) VALUES ('Dehumanized Longsleeve',$1,15,'longsleeve.jpg',$2) RETURNING id,tshirt,size,price,imgurl,user_id`,
        [size, userId]
    );
};

exports.addVinyl = (color, imgurl, userId) => {
    return db.query(
        `INSERT INTO orders (vinyl,color,price,imgurl,user_id) VALUES ('Days Of Madness LP 12"',$1,12,$2,$3) RETURNING id,vinyl,color,price,imgurl,user_id`,
        [color, imgurl, userId]
    );
};

exports.removeItem = (id) => {
    return db.query(
        `
        DELETE FROM orders WHERE id = $1;
        `,
        [id]
    );
};

exports.submitOrder = (userId) => {
    return db.query(
        `
        SELECT users.id, orders.id AS order_id, first, last, email,address,zip,city,country,vinyl,color,price,tshirt,size,imgurl, orders.created_at
        FROM users
        JOIN orders ON (user_id = users.id AND user_id = $1 AND CURRENT_TIMESTAMP - orders.created_at < INTERVAL '1 minute');
        `,
        [userId]
    );
};
