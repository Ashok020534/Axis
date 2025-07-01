import app from './app.js';
import { connectToDatabase } from './db/config/db.js';
import { MONGO_URI, PORT } from './env.js';

connectToDatabase(); 

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`MongoDB URI: ${MONGO_URI}`);
});
