# Full Stack Portfolio Website

A modern, fully-functional portfolio website built with **Vanilla JavaScript**, **Express.js**, and **MongoDB**. Features smooth GSAP animations, responsive design, and a complete contact management system.

## 🎯 Features

### Frontend
- ✨ **GSAP Animations** - Smooth fade and scroll animations
- 📱 **Fully Responsive** - Mobile-first design
- 🎨 **Modern UI** - Custom CSS (no frameworks)
- 🧭 **Sticky Navigation** - Hamburger menu for mobile
- 7️⃣ **7 Main Sections** - Hero, About, Education, Skills, Projects, Contact, Footer
- 📧 **Contact Form** - Fully integrated with backend
- 📨 **Message Management** - Admin page to view/manage messages
- 🔗 **Social Links** - LinkedIn and GitHub integration

### Backend
- 🚀 **Express.js API** - RESTful API with 8 endpoints
- 💾 **MongoDB Atlas** - Cloud database for messages
- 📨 **Contact Management** - Store, retrieve, and delete messages
- 🔐 **CORS Security** - Configured for safe cross-origin requests
- ⚡ **Fast & Lightweight** - Minimal dependencies

## 📁 Project Structure

```
Code@EaseProject7/
├── portfolio-backend/          # Express.js backend
│   ├── server.js              # Main server (271 lines)
│   ├── package.json           # Dependencies
│   ├── .env.example           # Environment template
│   ├── vercel.json            # Render deployment config
│   └── .gitignore             # Ignore patterns
│
└── portfolio-frontend/         # Vanilla JS frontend
    ├── index.html             # Main portfolio
    ├── messages.html          # Admin messages page
    ├── script.js              # GSAP animations & API
    ├── style.css              # Responsive styling
    └── .env.example           # Config template

```

## 🚀 Getting Started

### Prerequisites
- Node.js v14+ 
- MongoDB Atlas account (free tier available)
- Render.com account (for backend deployment)
- Vercel.com account (for frontend deployment)

### Local Setup

**Backend:**
```bash
cd portfolio-backend
cp .env.example .env
# Add your MongoDB connection string to .env
npm install
npm start
```

**Frontend:**
```bash
cd portfolio-frontend
# Update API_BASE_URL in script.js if needed
python -m http.server 3000
# Or use any static server
```

Visit `http://localhost:3000` in your browser.

## 🌐 Deployment

### Backend (Render)
1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect GitHub repository
5. Add environment variables (MONGODB_URI, PORT, CORS_ORIGIN)
6. Deploy

### Frontend (Vercel)
1. Go to https://vercel.com
2. Import GitHub repository
3. Select `portfolio-frontend` as root directory
4. Deploy

## 📧 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Health check |
| GET | `/api/portfolio` | Get all portfolio data |
| GET | `/api/portfolio/:section` | Get section data |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/messages` | Get all messages |
| PATCH | `/api/messages/:id/read` | Mark message as read |
| DELETE | `/api/messages/:id` | Delete message |

## 🎨 Customization

All content is stored in `portfolio-backend/server.js` (lines 50-165):
- Hero section (name, title, description)
- About section (bio, image)
- Education (degrees and institutions)
- Skills (with emoji icons)
- Projects (with technologies and links)
- Contact info (email, phone, location)
- Social links (LinkedIn, GitHub)

Edit and redeploy backend to update content.

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Animations | GSAP + ScrollTrigger |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Deployment | Render + Vercel |

## 📄 Key Files

- **server.js** (420 lines) - Complete backend with 8 API endpoints
- **script.js** (454 lines) - Frontend logic, GSAP animations, form handling
- **style.css** (733 lines) - Responsive design with CSS variables
- **messages.html** (486 lines) - Admin dashboard for messages

## ✅ What's Included

✓ Fully working contact form with validation
✓ Message storage and management
✓ Responsive design (mobile, tablet, desktop)
✓ Smooth animations (no lag)
✓ Clean, maintainable code
✓ Environment configuration
✓ Deployment ready
✓ No external CSS frameworks

## 🚀 Ready for Production

- ✅ Backend API tested and working
- ✅ Frontend fully responsive
- ✅ Messages saved to MongoDB
- ✅ CORS properly configured
- ✅ Deployment configs ready
- ✅ No console errors
- ✅ All animations optimized

## 📝 License

Built by Ranadeep Layak - 2025

### Backend Setup

1. **Navigate to backend folder:**
```bash
cd portfolio-backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Update `.env` with your credentials:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_db
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

5. **Start the server:**
```bash
npm start
# For development with auto-reload:
npm run dev
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder:**
```bash
cd reference-frontend
```

2. **Start a local server:**
```bash
# Option 1: Using Python
python -m http.server 3000

# Option 2: Using Node.js
npx http-server -p 3000

# Option 3: Using VS Code Live Server extension
# Right-click on index.html and select "Open with Live Server"
```

3. **Update API URL in `script.js`:**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Visit `http://localhost:3000` in your browser

## 📚 Available Sections

### Hero Section
- Welcome message with title and subtitle
- Call-to-action button
- Animated background elements

### About Section
- Profile description
- Profile image
- Detailed bio

### Education Section
- Timeline of educational qualifications
- Institutions, fields, and dates
- Course details

### Skills Section
- Grid display of skills
- Categorized by type (Language, Frontend, Backend, etc.)
- Icon representation

### Projects Section
- Featured project cards
- Project descriptions
- Technology tags
- Links to live site and GitHub

### Contact Section
- Contact information (email, phone, location)
- Functional contact form
- Form validation
- MongoDB integration

### Footer
- Quick navigation links
- Social media links
- Copyright information

## 🔌 API Endpoints

### Portfolio Data
- **GET** `/api/portfolio` - Get all portfolio data
- **GET** `/api/portfolio/:section` - Get specific section (hero, about, education, skills, projects, contact)

### Contact Messages
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/messages` - Get all messages
- **PATCH** `/api/messages/:id/read` - Mark message as read
- **DELETE** `/api/messages/:id` - Delete message

### Health Check
- **GET** `/api/health` - Backend health status

## 🎨 Customization

### Update Portfolio Content

Edit portfolio data in `server.js` in the `initializeCollections()` function:

```javascript
if (!collectionNames.includes('portfolio_data')) {
    await db.collection('portfolio_data').insertOne({
        _id: 'main',
        hero: {
            title: 'Your Name',
            subtitle: 'Your Title',
            description: 'Your description'
        },
        // ... more sections
    });
}
```

Or update via database directly:

```javascript
db.collection('portfolio_data').updateOne(
    { _id: 'main' },
    { $set: { 'hero.title': 'New Title' } }
);
```

### Customize Styling

Edit `style.css` to change:
- Colors (CSS variables in `:root`)
- Fonts and typography
- Spacing and layout
- Animations

### Customize Animations

GSAP animations are configured in `script.js`:

```javascript
gsap.from('.hero-title', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.2
});
```

## 🌐 Deployment

### Backend Deployment (Render)

1. **Push code to GitHub**
2. **Sign up on [render.com](https://render.com)**
3. **Create new Web Service:**
   - Connect GitHub repository
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Add environment variables
4. **Get Render URL** (e.g., `https://portfolio-backend.onrender.com`)

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
2. **Sign up on [vercel.com](https://vercel.com)**
3. **Import Project:**
   - Select GitHub repository
   - Root Directory: `reference-frontend`
   - Framework: Other
4. **Get Vercel URL** (e.g., `https://portfolio-frontend.vercel.app`)

### Connect Frontend to Backend

Update API URL in `script.js`:

```javascript
const API_BASE_URL = 'https://your-backend.onrender.com/api';
```

Or set environment variable in Vercel:

```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

## 📖 Portfolio Data Structure

```javascript
{
    hero: {
        title: String,
        subtitle: String,
        description: String
    },
    about: {
        description: String,
        details: String,
        image: String (URL)
    },
    education: [
        {
            degree: String,
            institution: String,
            field: String,
            year: String,
            details: String
        }
    ],
    skills: [
        {
            name: String,
            category: String,
            icon: String (emoji)
        }
    ],
    projects: [
        {
            title: String,
            description: String,
            technologies: [String],
            link: String (URL),
            github: String (URL),
            icon: String (emoji)
        }
    ],
    contact: {
        email: String,
        phone: String,
        location: String
    },
    social: [
        {
            name: String,
            url: String,
            icon: String (emoji)
        }
    ]
}
```

## 🔐 MongoDB Setup

### Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Sign up for free
3. Create a cluster
4. Create a database user
5. Add IP address to network access (0.0.0.0/0 for development)
6. Get connection string and add to `.env`

### Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/portfolio_db?retryWrites=true&w=majority
```

## 🐛 Troubleshooting

### Backend not connecting
- Ensure MongoDB URI is correct in `.env`
- Check IP whitelist in MongoDB Atlas
- Verify CORS_ORIGIN matches frontend URL

### Frontend API calls failing
- Check browser console for errors
- Ensure backend is running
- Verify API_BASE_URL is correct in `script.js`
- Check CORS settings in `server.js`

### Form submission not working
- Check backend is running
- Verify MongoDB connection
- Check browser Network tab for errors
- Ensure form validation passes

## 📝 Form Validation

Contact form validates:
- Name is not empty
- Email is valid format
- Subject is not empty
- Message is not empty

## 🎬 GSAP Animations

Includes:
- Hero section fade-in animations
- Floating background elements
- Scroll-triggered card animations
- Smooth transitions on hover
- Page load animations

## 🔄 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a full-stack portfolio website project.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the deployment guides
3. Check browser console for errors
4. Verify API connectivity

---

**Deployment Links** (to be added after deployment):
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.onrender.com`
