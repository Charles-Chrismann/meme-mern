import express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import multer from 'multer';
import 'dotenv/config'

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    cb(null, name.split('.')[0] + '-' + Date.now() + '.' + extension);
  }
})
const upload = multer({ storage })

interface Meme {
  _id: string;
  filename: string;
  likes: number;
  dislikes: number;
  date: Date;
}

const memeSchema = new Schema<Meme>({
  filename: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

const MemeModel = model<Meme>('Meme', memeSchema);

(async () => {
  console.log(process.env.MONGO_URL)
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Connected to MongoDB');

  const app = express();
  app.use(express.json());
  
  app.use('/assets', express.static(path.join(__dirname, '..', 'mern-front', 'assets')));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.get('/', (req, res) => {
    console.log(path.join(process.cwd()))
    res.sendFile(path.join(process.cwd(), 'dist', 'apps', 'mern-front', 'index.html'));
  });
  
  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to mern-back!' });
  });

  // Gets all memes
  app.get('/api/memes', (req, res) => {

  })

  // Gets a random meme
  app.get('/api/memes/random', async (req, res) => {
    const [meme] = await MemeModel.aggregate([{ $sample: { size: 1 } }])
    res.send(meme);
  })

  // Gets a specific meme
  app.get('/api/memes/:id', (req, res) => {

  })

  // Saves one or more memes
  app.post('/api/memes', upload.single('file'), async (req: any, res) => {
    const meme = new MemeModel({
      filename: req.file.filename,
      date: new Date()
    });
    meme.save();

    res.send({
      message: 'ok',
      meme
    });
  })

  // app.get('/api/posts', async (req, res) => {
  //   const posts = await PostModel.find();

  //   res.send({ posts });
  // });

  // app.post('/api/posts', async (req, res) => {
  //   const post = new PostModel({
  //     author: req.body.author,
  //     title: req.body.title,
  //     body: req.body.body,
  //     date: new Date()
  //   });

  //   await post.save();

  //   res.send({ message: 'ok' });
  // });
  
  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`App listening`);
  });
  server.on('error', console.error);
})();