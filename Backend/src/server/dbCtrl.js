import { connectDB, mysqlConnection } from "../config/database.js";

export default async function dbCtrl(app) {
    const port = process.env.PORT || 5000;
    connectDB()
        .then(() => {
            // MySQL connection and sync
            mysqlConnection.authenticate()
                .then(() => {
                    console.log('MySQL connected successfully');
                    return mysqlConnection.sync(); // Sync models
                })
                .then(() => {
                    console.log('MySQL models synced');
                })
                .catch(err => console.error('MySQL error:', err));

            app.listen(port, () => {
                console.log(`⚙️ Server is running at http://localhost:${port}`);
            });
        })
        .catch((err) => {
            console.error('MONGO db connection failed !!! ', err);
            process.exit(1);
        });
}