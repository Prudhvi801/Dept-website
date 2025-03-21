# ASCESS Department Website

This is the official website and admin dashboard for ASCESS, the Computer Science Department student forum.

## Project Overview

The ASCESS website serves as a central information hub for the Computer Science Department, featuring:

- Department announcements and alerts
- Upcoming events
- Club information and achievements
- A secure admin dashboard for content management

## Project Structure

This project is designed to be flexible, supporting multiple development approaches:

```
dept-website/
├── core/                        # Core HTML/CSS/JS implementation
│   ├── assets/                  # Images, fonts, etc.
│   ├── css/
│   │   ├── styles.css           # Main stylesheet
│   │   └── admin.css            # Admin dashboard styles
│   ├── js/
│   │   ├── script.js            # Main JavaScript
│   │   └── admin.js             # Admin dashboard JavaScript
│   ├── index.html               # Main homepage
│   └── admin/
│       └── alerts.html          # Alerts management page
│
├── next-app/                    # Next.js implementation
│   ├── app/
│   │   ├── api/                 # API routes
│   │   │   └── alerts/
│   │   │       ├── route.js     # GET/POST alerts
│   │   │       └── [id]/
│   │   │           └── route.js # GET/PUT/DELETE specific alert
│   │   ├── admin/
│   │   │   └── alerts/
│   │   │       └── page.js      # Admin dashboard for alerts
│   │   └── page.js              # Homepage
│   ├── components/
│   ├── public/
│   └── ...                      # Other Next.js files
│
├── django-app/                  # Django implementation
│   ├── ascess_project/          # Project settings
│   ├── website/                 # Main app
│   │   ├── templates/
│   │   ├── static/
│   │   ├── models.py            # Data models (incl. Alert)
│   │   ├── views.py             # View functions
│   │   ├── admin.py             # Admin configurations
│   │   └── urls.py              # URL routing
│   ├── manage.py
│   └── requirements.txt
│
├── node-backend/                # Node.js backend implementation
│   ├── controllers/
│   │   └── alertController.js
│   ├── models/
│   │   └── Alert.js
│   ├── routes/
│   │   └── alertRoutes.js
│   ├── app.js
│   └── package.json
```

## Getting Started

Choose the implementation that best fits your development preferences:

### Option 1: Plain HTML/CSS/JavaScript

The simplest way to get started is with the core implementation:

1. Navigate to the `core/` directory
2. Open `index.html` in your browser to view the website
3. For admin functionality, open `admin/alerts.html`

For data persistence with the core implementation:
- Use browser's localStorage (temporary solution)
- Connect to a simple backend service like Firebase

### Option 2: Next.js (React)

For a full-stack React implementation:

1. Navigate to the `next-app/` directory
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_secret_key
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_admin_password
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Access the website at `http://localhost:3000`
6. Access the admin dashboard at `http://localhost:3000/admin/alerts`

### Option 3: Django

For a Python-based implementation:

1. Navigate to the `django-app/` directory
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/Mac: `source venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Run migrations:
   ```
   python manage.py migrate
   ```
6. Create a superuser:
   ```
   python manage.py createsuperuser
   ```
7. Start the development server:
   ```
   python manage.py runserver
   ```
8. Access the website at `http://localhost:8000`
9. Access the admin dashboard at `http://localhost:8000/admin`

### Option 4: Node.js Backend

For a Node.js API backend:

1. Navigate to the `node-backend/` directory
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables in `.env`:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3001
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```
   npm start
   ```
5. The API will be available at `http://localhost:3001/api`

## Admin Dashboard Features

The admin dashboard allows authorized users to:

1. **Manage Alerts/Notifications**
   - Create, edit, and delete alerts
   - Mark alerts as "New" (displays a badge)
   - Set alerts as active/inactive
   
2. **Authentication**
   - Secure login for admin access
   - Protected routes for authenticated users only

## Data Model: Alerts

Each alert contains:
- **Title**: The headline of the alert
- **Content**: The detailed message
- **Date**: When the alert was created/updated
- **isNew**: Boolean flag for new alerts (shows badge)
- **active**: Boolean to determine if alert is visible on the site

## Deployment

### Vercel Deployment (Next.js)

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure environment variables in Vercel's dashboard
4. Deploy

### Traditional Hosting

If using the core HTML/CSS/JS implementation:
1. Upload the contents of the `core/` directory to your web hosting service
2. Ensure proper file permissions
3. Access your website via the provided URL

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.  