const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

const originURL = process.env.ORIGIN_URL || 'http://localhost:5173';

const bcryptSalt = bcrypt.genSaltSync(10); // Se recomienda definir el valor de salt en lugar de usar bcrypt.genSalt
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: originURL,
}));


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/test', (req, res) => {
  res.json('Test OK');
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json(userDoc);
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        res.json('pass ok');
      } else {
        res.status(401).json('Incorrect password');
      }
    } else {
      res.status(404).json('User not found');
    }
  } catch (error) {
    console.error('Error in /login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

  
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});












//  const express = require('express')
//  const cors = require('cors');
//  const mongoose = require('mongoose');
//  const User = require('./models/User.js')
//  const bcrypt = require('bcryptjs')

//  require('dotenv').config()



//  const app = express()

// const bcryptSalt = bcrypt.genSalt(10);

//  app.use(express.json())
//  app.use(cors({
//    credential:true,
//    origin:'http://localhost:5173',
//  }));

//  mongoose.connect(process.env.MONGO_URL)

//  app.get('/test', (req, res)=>{
//     res.json('tes ok');
//  })


//  app.post('/register', async(req,res)=> {
//    const {name,email,password} = req.body;
//    const userDoc = await User.create({
//       name,
//       email,
//       password:bcrypt.hashSync(password, bcryptSalt),
//    })
//    res.json(userDoc)
//  })



//  app.listen(4000);



// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const User = require('./models/User.js');
// require('dotenv').config();

// const app = express();
// app.use(express.json());
// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:5173',
// }));

// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// app.get('/test', (req, res) => {
//   res.json('Test OK');
// });

// app.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = new User({
//       name,
//       email,
//       password,
//     });
//     const userDoc = await user.save();
//     res.json(userDoc);
//   } catch (error) {
//     console.error('Error in /register:', error);
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });

// app.listen(4000, () => {
//   console.log('Server is running on port 4000');
// });
