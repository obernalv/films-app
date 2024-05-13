const app = require('./app');
const sequelize = require('./utils/connection');

const PORT = process.env.PORT || 8080;

const main = async () => {
    try {
        console.log("DB connected");
        sequelize.sync(); //{alter: true}
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log(error)
    }
}

main();
