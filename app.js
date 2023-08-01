const express = require("express");
var cors = require('cors');
const mysql = require("mysql");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin');
const axios = require('axios');
const { time } = require("console");
require('dotenv').config();
const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://medisail-project-default-rtdb.europe-west1.firebasedatabase.app/'
});

//connexion to mySQL// 
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "base-centrale"
});
// Define the pool variable

const pool = require('mysql').createPool({
  host: 'localhost',
  user: 'root',
  database: 'base-centrale',
});
const connection_medisail = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "base-medisail-connect"
});
//Connect to both databases
connection.connect(error => {
  if (error) throw error;
  console.log("Connected to the database base-centrale");
});

connection_medisail.connect(error => {
  if (error) throw error;
  console.log("Connected to the database base-medisail-connect");
});

// get all client
app.get("/client", (req, res) => {
  connection.query("SELECT * FROM client  ", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

//get les coedonnées du client  by id//
app.get("/client/:id_client", (req, res) => {
  connection.query("SELECT * from client WHERE id_client = ? ", [req.params.id_client], (error, results) => {
    if (error) throw error;
    res.send(results);

  });
});

app.get('/client/:email/:password', async (req, res) => {
  connection.query("SELECT id_client from client WHERE email = ? And password=? ", [req.params.email, req.params.password], (error, results) => {

    if (error) throw error;
    res.send(results);
  });
});


//ajouter un client
app.post("/client/inscription", (req, res) => {
  const params = req.body;

  // Vérifier si tous les champs requis sont remplis
  const requiredFields = ['nom_particulier', 'prenom_particulier', 'email', 'password', 'confirmPassword', 'adresse_postale', 'code_postal', 'telephone']; // Remplacez avec les noms de vos champs requis
  const missingFields = requiredFields.filter(field => !params.hasOwnProperty(field) || params[field] === '');

  if (missingFields.length > 0) {
    // Envoyer une réponse d'erreur indiquant que des champs sont manquants
    res.status(400).json({ success: false, message: 'Certains champs sont vides.', missingFields });
  } else {
    // Tous les champs requis sont remplis, procéder à l'insertion dans la base de données
    const columns = Object.keys(params);
    const values = Object.values(params);
    const placeholders = values.map(() => '?').join(', ');
    const sql = `INSERT INTO client (${columns.join(', ')}) VALUES (${placeholders})`;
    const password = params.password;
    const confirmPassword = params.confirmPassword; // Ajouter le champ confirmPassword depuis le formulaire
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères, au moins 1 chiffre et 1 majuscule' });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Le mot de passe et le mot de passe de confirmation ne sont pas identiques' });
    }
    // Vérifier le format du numéro de téléphone
    const telephone = params.telephone;
    if ((telephone.length !== 8 && telephone.length !== 9) || isNaN(telephone)) {
      return res.status(400).json({ message: 'Le numéro de téléphone doit être un numéro tunisien (8 chiffres) ou un numéro français (9 chiffres)' });
    }


    connection.query(sql, values, (error, results) => {
      if (error) throw error;

      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Client ajouté.' });
      } else {
        res.status(401).json({ success: false, message: 'Inscription non réussie.' });
      }
    });
  }
});



const secretKey = 'maCleSecrete';

// connexion a un client
app.post('/client/login', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const sql = "SELECT * FROM client WHERE email = ? AND password = ?";
  connection.query(sql, [email, password], function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      res.status(200).json({ success: true, message: 'client connecté' });
    } else {
      res.status(401).json({ success: false, message: 'Wrong email or password' });
    }
  });
});


//Modification du profil
app.put("/client/update/:id_client", (req, res) => {
  const { id_client, nom_particulier, prenom_particulier, email, password, confirmPassword, adresse_postale, code_postal, telephone } = req.body;
  // Vérifier si les champs sont vides
  if (!nom_particulier || !prenom_particulier || !email || !password || !confirmPassword || !adresse_postale || !code_postal || !telephone) {
    return res.status(400).json({ message: 'Tous les champs doivent être remplis' });
  }
  // Vérifier si confirmPassword correspond à password
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Le mot de passe de confirmation ne correspond pas au mot de passe' });
  }
  // Vérifier le format du numéro de téléphone
  if ((telephone.length !== 8 && telephone.length !== 9) || isNaN(telephone)) {
    return res.status(400).json({ message: 'Le numéro de téléphone doit être un numéro tunisien (8 chiffres) ou un numéro français (9 chiffres)' });
  }
  // Effectuer la mise à jour des données dans la base de données
  connection.query("UPDATE client SET nom_particulier = ?, prenom_particulier = ?, email = ?, password = ?, confirmPassword = ?, adresse_postale = ?, code_postal = ?, telephone = ? WHERE id_client = ?", [nom_particulier, prenom_particulier, email, password, confirmPassword, adresse_postale, code_postal, telephone, req.params.id_client], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'Données mises à jour' });
  });
});


//get all bateau
app.get("/bateau", (req, res) => {
  connection.query("SELECT * FROM bateau  ", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

//get boitier imei by idbateau 
app.get("/boat/:id_bateau", (req, res) => {
  connection.query("SELECT boitier_imei FROM bateau WHERE  id_bateau = ? ", [req.params.id_bateau], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


//get bateau by clientId
app.get('/bateau/:id_client', (req, res) => {
  connection.query("SELECT * FROM bateau WHERE id_client = ? ", [req.params.id_client], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


//ajout bateau
app.post("/bateau/ajout/:id_client", (req, res) => {
  const params = req.body;
  const id_client = req.params.id_client;
  params.id_client = id_client;
  const boitier_imei = params.boitier_imei;
  if (!/^\d+$/.test(boitier_imei)) {
    res.status(400).json({ message: 'boitier_imei must contain only digits' });
    return;
  }
  const boitier_phone = params.boitier_phone;
  if (!/^\d+$/.test(boitier_phone)) {
    res.status(400).json({ message: 'boitier_phone must contain only digits' });
    return;
  }
  const requiredFields = ['name', 'boitier_imei', 'boitier_phone']; // Replace with the names of your required fields
  const missingFields = requiredFields.filter(field => !params.hasOwnProperty(field) || params[field] === '');

  if (missingFields.length > 0) {
    // Send an error response indicating that some fields are missing
    res.status(400).json({ success: false, message: 'Certains champs sont vides.', missingFields });
  } else {
    // Check the length of imei and phone
    if (boitier_imei.length !== 15 || boitier_phone.length !== 8) {
      res.status(400).json({ message: 'Invalid imei or phone number' });
      return;
    }
    const columns = Object.keys(params);
    const values = Object.values(params);
    const placeholders = values.map(() => '?').join(', ');
    const sql = `INSERT INTO bateau (${columns.join(', ')}) VALUES (${placeholders})`;

    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      res.status(200).json({ message: 'boat ajouté' });

      // Add the boat to Firebase
      const firebaseRef = admin.database().ref('devices/' + boitier_imei);
      const data = {
        altitude: 36.336,
        battery_voltage_113: 50,
        crash_detection_247: 0,
        device_angle: 26,
        external_voltage_66: 50,
        fuel_9: 40,
        gnss_status_69: 0,
        gsm_signal_21: 4,
        latitude: 36.4059383,
        longitude: 10.6039,
        option_3: 0,
        remote_engine_179: 1,
        remote_option_180: 0,
        speed_24: 70,
        status_pump_2: 0,
        status_sos_1: 0,
        timestamp_data: 1674353622000,
        trip_odometer_199: 0,
        unplug_detection_252: 12,
      };
      firebaseRef.set(data)
        .then(() => {
          console.log('Boat added to Firebase');
        })
        .catch((firebaseError) => {
          console.error('Failed to add boat to Firebase:', firebaseError);
        });
    });
  }
});




//supprimer un bateau
app.delete("/bateau/:id_client/:boitier_imei/supp", (req, res) => {
  const boitier_imei = req.params.boitier_imei;
  connection.query("DELETE from bateau WHERE id_client = ? And boitier_imei = ?", [req.params.id_client, boitier_imei], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'boat deleted' });
  });
  // Supprimez le bateau de Firebase
  const firebaseRef = admin.database().ref('devices/' + boitier_imei);
  firebaseRef.remove()
    .then(() => {
      console.log('Boat deleted from MySQL and Firebase');
    })
    .catch((firebaseError) => {
      console.log('Error deleting boat from Firebase');
    });
});


//Modification des données du bateau
app.put("/bateau/update/:id_client/:id_bateau", (req, res) => {
  const { id_bateau, id_client, name, boitier_imei, boitier_phone } = req.body
  if (boitier_imei.length !== 15 || !/^\d+$/.test(boitier_imei)) {
    res.status(400).json({ message: 'Invalid IMEI number' });
    return;
  }
  if (boitier_phone.length !== 8 || !/^\d+$/.test(boitier_imei)) {
    res.status(400).json({ message: 'Invalid phone number' });
    return;
  }
  connection.query("SELECT boitier_imei FROM bateau WHERE id_client=? AND id_bateau=?", [req.params.id_client, req.params.id_bateau], (error, results) => {
    if (error) throw error;

    const oldBoitierImei = results[0].boitier_imei;
    connection.query("UPDATE bateau SET name=?, boitier_imei=?, boitier_phone=? WHERE id_client=? AND id_bateau=?", [name, boitier_imei, boitier_phone, req.params.id_client, req.params.id_bateau], (error, results) => {
      if (error) throw error;
      res.status(200).json({ message: 'data updated' });

      const oldFirebaseRef = admin.database().ref('devices/' + oldBoitierImei);
      const newFirebaseRef = admin.database().ref('devices/' + boitier_imei);

      oldFirebaseRef.once('value')
        .then((snapshot) => {
          const oldData = snapshot.val();
          oldFirebaseRef.remove()
            .then(() => {
              newFirebaseRef.set(oldData)
                .then(() => {
                  console.log('IMEI updated in Firebase');
                })
                .catch((firebaseError) => {
                  console.log('Error updating IMEI in Firebase');
                });
            })
            .catch((firebaseError) => {
              console.log('Error removing old IMEI from Firebase');
            });
        })
        .catch((firebaseError) => {
          console.log('Error retrieving old IMEI data from Firebase');
        });
    });
  });
});


///---forgot password---//
function generateUniqueId() {
  return uuidv4();
}
function isValidResetId() {
  return uuidv4();
}
// Définir l'adresse e-mail de l'expéditeur
const emailSender = 'yosrmahfoudh@gmail.com';


// Définir les options de configuration de nodemailer
const transport = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: 'yosrmahfoudh@gmail.com',
    pass: 'pancupwmcddoaiqv'
  }
});

app.post('/forgotpassword', (req, res) => {
  const userEmail = req.body.email;

  // Vérifier si l'adresse e-mail existe
  if (!userEmail) {
    res.status(400).send({ message: 'Veuillez fournir une adresse e-mail valide.' });
    return;
  }

  connection.query("SELECT id_client FROM client WHERE email = ?", [userEmail], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send({ message: 'Une erreur est survenue lors de la recherche de l\'adresse e-mail.' });
      return;
    }

    const id_client = results[0].id_client;

    // Générer un identifiant unique pour le lien de réinitialisation de mot de passe
    const resetId = isValidResetId();

    // Vérifier si l'adresse e-mail a été trouvée dans la base de données
    if (results.length === 0) {
      res.status(400).send({ message: 'L\'adresse e-mail fournie n\'est pas associée à un compte utilisateur.' });
      return;
    }

    // Générer un identifiant unique pour le lien de réinitialisation de mot de passe
    //const resetId = isValidResetId();

    // Définir la date d'expiration du lien de réinitialisation de mot de passe (1 heure)
    const expiryDate = new Date(Date.now() + 3600000);

    // Envoyer l'e-mail de réinitialisation de mot de passe
    const mailOptions = {
      from: emailSender,
      to: userEmail,
      subject: 'Réinitialisation de mot de passe',
      html: `Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe : <a href="http://localhost:4200/reset-password/${id_client}">http://localhost:4200/reset-password/${id_client}</a>. Le lien expirera à ${expiryDate}.`
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: 'Une erreur est survenue lors de l\'envoi de l\'e-mail.' });
        return;
      }
      console.log(`E-mail envoyé à ${userEmail}: ${info.response}`);
      res.status(200).send({ message: 'Un e-mail de réinitialisation de mot de passe a été envoyé.' });
    });
  });
});

app.post('/reset-password/:id_client', (req, res) => {
  const id_client = req.params.id_client;
  const resetId = req.query.resetId;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // Vérifier si l'identifiant est valide et que le délai d'expiration n'est pas dépassé
  if (!isValidResetId(resetId)) {
    res.status(400).send({ message: 'Le lien de réinitialisation de mot de passe est invalide ou a expiré.' });
    return;
  }
  // Mettre à jour le mot de passe de l'utilisateur avec le nouveau mot de passe
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Une erreur est survenue lors de la connexion à la base de données.' });
      return;
    }
    connection.query('UPDATE client SET password = ?, confirmPassword = ? WHERE id_client = ?', [password, confirmPassword, id_client], function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ message: 'Une erreur est survenue lors de la mise à jour du mot de passe.' });
        return;
      }
      console.log(`Le mot de passe de l'utilisateur a été mis à jour : ${password}`);
      res.status(200).send({ message: 'Le mot de passe a été réinitialisé avec succès.' });
    });
  });
});




// navigation
/*app.get('/navigation/:id_bateau', (req, res) => {
  connection_medisail.query("SELECT latitude , longitude ,speed FROM navigation WHERE id_bateau = ? ", [req.params.id_bateau], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});*/
//recuperer geofence
app.get('/geofence/:id_bateau', (req, res) => {
  connection_medisail.query("SELECT  radius FROM geofence WHERE id_bateau = ? ", [req.params.id_bateau], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});
//ajouter geofence
app.post('/geofence/ajout/:id_bateau', (req, res) => {
  const id_bateau = req.params.id_bateau;
  const radius = req.body.radius;

  connection_medisail.query(`INSERT INTO geofence (id_bateau, radius) VALUES (${id_bateau}, ${radius})`, (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: 'La geofence a été ajoutée avec succès' });
  });
});
//modifier geofence
app.put("/geofence/update/:id_bateau", (req, res) => {
  const { id_bateau, radius } = req.body;

  // Vérification si le champ radius contient des lettres, *, +, - ou /
  if (/[a-zA-Z*+\-\/]/.test(radius)) {
    res.status(400).json({ message: 'Le champ radius contient des caractères non valides.' });
    return;
  }

  connection_medisail.query("UPDATE geofence SET radius=? WHERE id_bateau = ?", [radius, req.params.id_bateau], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'radius updated' });
  });
});
// ajouter une nouvelle position 
app.post("/waypoint/ajout/:id_bateau", (req, res) => {
  const params = req.body;
  const id_bateau = req.params.id_bateau;
  params.id_bateau = id_bateau;

  // Vérification des champs obligatoires
  if (!params.name) {
    res.status(400).json({ message: 'name cannot be empty' });
    return;
  }

  // Vérification des champs obligatoires
  if (!params.latitude) {
    res.status(400).json({ message: 'Latitude cannot be empty' });
    return;
  }

  if (!params.longitude) {
    res.status(400).json({ message: 'Longitude cannot be empty' });
    return;
  }

  const columns = Object.keys(params);
  const values = Object.values(params);
  const placeholders = values.map(() => '?').join(', ');
  const sql = `INSERT INTO waypoint (${columns.join(', ')}) VALUES (${placeholders})`;

  connection_medisail.query(sql, values, (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'waypoint added' });
  });
});
//get all positions
app.get('/waypoint/:id_bateau', (req, res) => {
  connection_medisail.query("SELECT  name, latitude , longitude  FROM waypoint WHERE id_bateau = ? ", [req.params.id_bateau], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

//ajouter SOS
app.put('/alerts/sos/:boitier_imei', (req, res) => {
  const boitier_imei = req.params.boitier_imei;
  connection_medisail.query('UPDATE alerts SET sos =1 WHERE boitier_imei=?', [boitier_imei], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving SOS request to database' });
    } else {
      console.log(`SOS request saved to database for boat ${boitier_imei}:`, results);
      res.send({ message: `SOS received and saved to database for boat ${boitier_imei}` });
    }
  });
});
///parametres notif///
app.put('/params/sos', (req, res) => {
  //const boitier_imei = req.params.boitier_imei;
  connection_medisail.query('UPDATE notif_param SET sos= IF(sos = 1, 0, 1) ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving notif param request to database' });
    } else {
      console.log(`notif  request saved to database for boat:`, results);
      res.send({ message: `notif received and saved to database for boat ` });
    }
  });
});

app.put('/params/vol', (req, res) => {
  connection_medisail.query('UPDATE notif_param SET antitheft= IF(antitheft = 1, 0, 1) ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving notif param request to database' });
    } else {
      console.log(`notif  request saved to database for boat `, results);
      res.send({ message: `notif received and saved to database for boat ` });
    }
  });
});

app.put('/params/pump', (req, res) => {

  connection_medisail.query('UPDATE notif_param SET pump= IF(pump = 1, 0, 1) ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving notif param request to database' });
    } else {
      console.log(`notif  request saved to database for boat `, results);
      res.send({ message: `notif received and saved to database for boat` });
    }
  });
});

app.put('/params/door', (req, res) => {

  connection_medisail.query('UPDATE notif_param SET door= IF(door = 1, 0, 1) ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving notif param request to database' });
    } else {
      console.log(`notif  request saved to database for boat `, results);
      res.send({ message: `notif received and saved to database for boat ` });
    }
  });
});

app.put('/params/movement', (req, res) => {

  connection_medisail.query('UPDATE notif_param SET movement= IF(movement = 1, 0, 1) ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving notif param request to database' });
    } else {
      console.log(`notif  request saved to database for boat `, results);
      res.send({ message: `notif received and saved to database for boat` });
    }
  });
});

app.put('/params/battery', (req, res) => {

  connection_medisail.query('UPDATE notif_param SET battery=1 IF(battery = 1, 0, 1) ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving notif param request to database' });
    } else {
      console.log(`notif  request saved to database for boat `, results);
      res.send({ message: `notif received and saved to database for boat ` });
    }
  });
});
app.put('/params/smoke', (req, res) => {

  connection_medisail.query('UPDATE notif_param SET smoke= IF(smoke = 1, 0, 1) ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving notif param request to database' });
    } else {
      console.log(`notif  request saved to database for boat `, results);
      res.send({ message: `notif received and saved to database for boat ` });
    }
  });
});

app.put('/params/unplug', (req, res) => {

  connection_medisail.query('UPDATE notif_param SET unplug=1 IF(unplug = 1, 0, 1) ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving notif param request to database' });
    } else {
      console.log(`notif  request saved to database for boat`, results);
      res.send({ message: `notif received and saved to database for boat ` });
    }
  });
});

app.put('/params/fuel', (req, res) => {

  connection_medisail.query('UPDATE notif_param SET fuel=1 IF(fuel = 1, 0, 1) ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving notif param request to database' });
    } else {
      console.log(`notif  request saved to database for boat `, results);
      res.send({ message: `notif received and saved to database for boat ` });
    }
  });
});


app.put('/params/speed', (req, res) => {

  connection_medisail.query('UPDATE notif_param SET speed=1 IF(speed = 1, 0, 1) ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving notif param request to database' });
    } else {
      console.log(`notif  request saved to database for boat `, results);
      res.send({ message: `notif received and saved to database for boat` });
    }
  });
});

app.put('/params/alarm', (req, res) => {
  const boitier_imei = req.params.boitier_imei;
  connection_medisail.query('UPDATE notif_param SET alarm= IF(alarm = 1, 0, 1) ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving notif param request to database' });
    } else {
      console.log(`notif  request saved to database for boat `, results);
      res.send({ message: `notif received and saved to database for boat` });
    }
  });
});

app.put('/params/ancher', (req, res) => {

  connection_medisail.query('UPDATE notif_param SET ancher= IF(ancher = 1, 0, 1) ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving notif param request to database' });
    } else {
      console.log(`notif  request saved to database for boat `, results);
      res.send({ message: `notif received and saved to database for boat ` });
    }
  });
});


//Historique//
app.get('/history/:imei/:date', (req, res) => {
  const imei = req.params.imei;
  const date = req.params.date;
  const query = `SELECT longitude, latitude FROM locations_history WHERE imei = ${imei} AND date = '${date}'`;
  connection_medisail.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération du trajet');

    } else if (results.length === 0) {
      res.status(404).send('Date introuvable');
    } else {
      res.send(results);
    }
  });
});


app.get('/history/:imei', (req, res) => {
  const imei = req.params.imei;

  const query = `SELECT date FROM locations_history WHERE imei = ${imei} `;
  connection_medisail.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération du date');

    } else if (results.length === 0) {
      res.status(404).send('Date introuvable');
    } else {
      res.send(results);
    }
  });
});

//post latitude, longitude from firebase in historique//
app.post('/history/:imei', (req, res) => {
  const imei = req.params.imei;
  const { longitude, latitude, date } = req.body;

  const query = 'INSERT INTO locations_history (longitude, latitude, date,imei) VALUES (?, ?, ?, ?)';
  const values = [longitude, latitude, date, imei];
  connection_medisail.query(query, values, (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'historique added' });
  });
});



//SMS//
const genToken = async () => {
  const result = await axios
    .post(
      "https://api.orange.com/oauth/v3/token",
      {
        grant_type: "client_credentials",
      },
      {
        headers: {
          Authorization: process.env.TOKEN_AUTH,
          Accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => res.data);
  return result.access_token;
};
app.post("/sms", async function (req, res, next) {
  const token = await genToken();
  const devPhoneNumber = process.env.NUMBER_DEV;
  const recipientPhoneNumber = req.body.phoneNumber;
  const message = req.body.message;
  axios.post(`https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B${devPhoneNumber}/requests`, {
    "outboundSMSMessageRequest": {
      "address": `tel:+${recipientPhoneNumber}`,
      "senderAddress": `tel:+${devPhoneNumber}`,
      "outboundSMSTextMessage": {
        "message": message,
      },
    },
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    }
  }).then(() => {
    console.log("SMS sent successfully!");
    res.status(200).json({
      status: "success",
      message: "SMS sent successfully!",
    });
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "error",
        message: err.response.data.requestError,
      });
    });
});

//Notification
app.post('/notifications', (req, res) => {
  const { message, type, imei, id_client } = req.body;
  const date = new Date().toISOString();
  const temps = new Date();
  const sql = 'INSERT INTO notifications (message,type ,imei, id_client , date,temps) VALUES (?, ?,?, ?, ?,?)';
  const values = [message, type, imei, id_client, date, temps];

  connection_medisail.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: `Erreur serveur` });
    } else {
      res.json({ message: `Notification enregistrée avec succès` });
    }
  });
});

app.get('/notification/:id_client/:date', (req, res) => {
  const date = req.params.date;
  const id_client = req.params.id_client;
  const startDate = `${date} 00:00:00`; // Début du jour spécifié
  const endDate = `${date} 23:59:59`; // Fin du jour spécifié
  const query = `SELECT message, type, temps FROM notifications WHERE  id_client = ${id_client} AND date >= '${startDate}' AND date <= '${endDate}'`;
  connection_medisail.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: `Erreur lors de la récupération des notifications` });
    } else if (results.length === 0) {
      res.status(404).send({ message: `Date introuvable` });
    } else {
      res.send(results);
    }
  });
});



//listening to port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});








