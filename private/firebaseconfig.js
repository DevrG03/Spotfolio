import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "portfolio-78f40.firebaseapp.com",
    projectId: "portfolio-78f40",
    storageBucket: "portfolio-78f40.appspot.com",
    messagingSenderId: "781020140490",
    appId: "1:781020140490:web:15fa4a02de57e8eb32b533",
    measurementId: "G-G648NS39X1",
};

export default firebaseConfig;