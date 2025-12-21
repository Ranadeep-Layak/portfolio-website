const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
let db;
const client = new MongoClient(MONGODB_URI);

async function connectDB() {
  try {
    await client.connect();
    db = client.db('portfolio_db');
    console.log('✓ Connected to MongoDB');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    process.exit(1);
  }
}

// Initialize collections
async function initializeCollections() {
  try {
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Create collections if they don't exist
    if (!collectionNames.includes('messages')) {
      await db.createCollection('messages');
      console.log('✓ Messages collection created');
    }
    
    if (!collectionNames.includes('portfolio_data')) {
      await db.collection('portfolio_data').insertOne({
        _id: 'main',
        hero: {
          title: 'Ranadeep Layak',
          subtitle: 'Full Stack Developer',
          description: 'Building amazing digital experiences',
          cta: 'Get in Touch'
        },
        about: {
          title: 'About Me',
          description: 'I am a passionate developer with expertise in full-stack development. I love creating beautiful and functional web applications.',
          image: 'https://media.licdn.com/dms/image/v2/D5603AQHoDzRti1l7fQ/profile-displayphoto-scale_200_200/B56Zs2NE0PIkAY-/0/1766140958496?e=2147483647&v=beta&t=wzbXwtVeygKlLohXBNPx0yhpBs173xKydahYJSY-4ZM'
        },
        education: [
          {
            degree: 'AISSCE',
            institution: 'D.A.V Public School',
            field: 'Science',
            year: '2023-2025',
            details: 'Focused on science stream with major subjects Physics, Chemistry, Mathematics, and Computer Science'
          },
          {
            degree: 'Bachelor of Computer Applications',
            institution: 'Asansol Engineering College',
            field: 'Computer Applications',
            year: '2025-2029',
            details: 'Focused on computer applications and software engineering'
          }
        ],
        skills: [
          { name: 'JavaScript', category: 'Language', icon: '⚡' },
          { name: 'React', category: 'Frontend', icon: '⚛️' },
          { name: 'Node.js', category: 'Backend', icon: '🟢' },
          { name: 'MongoDB', category: 'Database', icon: '🍃' },
          { name: 'Express', category: 'Backend', icon: '🚀' },
          { name: 'CSS3', category: 'Frontend', icon: '🎨' },
          { name: 'HTML5', category: 'Frontend', icon: '📄' },
          { name: 'Git', category: 'Tools', icon: '🔧' }
        ],
        projects: [
          {
            title: 'Simple Portfolio Website',
            description: 'A simple portfolio website made with basic javascript, html and css',
            technologies: ['JavaScript', 'HTML', 'CSS'],
            github: 'https://github.com/Ranadeep-Layak/Code-Zero',
            icon: '💻'
          },
          {
            title: 'Simple UI using ReactJS',
            description: 'A simple user interface built with ReactJS',
            technologies: ['JavaScript', 'React'],
            github: 'https://github.com/Ranadeep-Layak/codeease-session',
            icon: '🎨'
          },
          {
            title: 'Portfolio Website',
            description: 'A full-stack portfolio website showcasing projects and skills',
            technologies: ['JavaScript', 'MongoDB', 'Express', 'Node.js'],
            github: 'https://github.com/Ranadeep-Layak/portfolio-website',
            icon: '🖥️'
          }
        ],
        contact: {
          email: 'ranadeeplayak7777@gmail.com',
          phone: '+91 73188 14033',
          location: 'West Bengal, India'
        },
        social: [
          { name: 'LinkedIn', url: '#https://www.linkedin.com/in/ranadeep-layak-8013ab388', icon: 'in' },
          { name: 'GitHub', url: '#https://github.com/Ranadeep-Layak', icon: 'git' }
        ]
      });
      console.log('✓ Portfolio data collection initialized');
    }
  } catch (error) {
    console.error('✗ Error initializing collections:', error);
  }
}

// API Routes

// Get all portfolio data
app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolio = await db.collection('portfolio_data').findOne({ _id: 'main' });
    res.json(portfolio || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
});

// Get specific portfolio section
app.get('/api/portfolio/:section', async (req, res) => {
  try {
    const portfolio = await db.collection('portfolio_data').findOne({ _id: 'main' });
    const section = req.params.section;
    
    if (portfolio && portfolio[section]) {
      res.json(portfolio[section]);
    } else {
      res.status(404).json({ error: 'Section not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch section data' });
  }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const messageDoc = {
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
      read: false
    };
    
    const result = await db.collection('messages').insertOne(messageDoc);
    
    res.status(201).json({
      success: true,
      message: 'Message received successfully',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Failed to submit message' });
  }
});

// Get all messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await db.collection('messages')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Get message count
app.get('/api/messages/count', async (req, res) => {
  try {
    const count = await db.collection('messages').countDocuments();
    const unreadCount = await db.collection('messages').countDocuments({ read: false });
    
    res.json({ total: count, unread: unreadCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get message count' });
  }
});

// Mark message as read
app.patch('/api/messages/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.collection('messages').updateOne(
      { _id: new ObjectId(id) },
      { $set: { read: true } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// Delete message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.collection('messages').deleteOne(
      { _id: new ObjectId(id) }
    );
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// Start server
const startServer = async () => {
  await connectDB();
  await initializeCollections();
  
  app.listen(PORT, () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Health check: http://localhost:${PORT}/api/health\n`);
  });
};

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n✓ Shutting down gracefully...');
  await client.close();
  process.exit(0);
});
