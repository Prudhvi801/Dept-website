# ASCESS Department Website Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Project Structure](#project-structure)
4. [Development Approaches](#development-approaches)
5. [Admin Dashboard](#admin-dashboard)
6. [Data Models](#data-models)
7. [API Endpoints](#api-endpoints)
8. [Deployment Guide](#deployment-guide)
9. [Troubleshooting](#troubleshooting)

## Introduction

The ASCESS (Association of Computer Science and Engineering Students Society) Department Website serves as the digital hub for the Computer Science Department. This documentation provides comprehensive guidance for developers working on any aspect of the website.

### Purpose

- Provide department announcements and alerts
- Showcase upcoming events and activities
- Display information about the department and ASCESS club
- Allow administrators to manage content through a secure dashboard

### Technologies

The project supports multiple technology stacks:
- HTML/CSS/JavaScript (Core implementation)
- Next.js (React-based full-stack solution)
- Django (Python-based framework)
- Node.js (JavaScript backend)

## Architecture

### Overall System Architecture

The ASCESS Department Website is built with flexibility in mind, supporting multiple architectural patterns depending on the implementation approach chosen.

#### Core HTML/CSS/JS Architecture (Client-Side Rendering)

```
┌─────────────────────────────┐
│                             │
│  Browser                    │
│  ┌─────────────────────┐    │
│  │                     │    │
│  │  HTML/CSS/JS Files  │    │
│  │                     │    │
│  └─────┬───────────────┘    │
│        │                    │
└────────┼────────────────────┘
         │
         ▼
┌─────────────────────┐       ┌─────────────────────┐
│                     │       │                     │
│  localStorage       │  or   │  External API       │
│  (Client Storage)   │       │  (Optional)         │
│                     │       │                     │
└─────────────────────┘       └─────────────────────┘
```

- **Client-Side Architecture**: Static HTML files with CSS styling and JavaScript for interactivity
- **Data Storage**: Uses browser's localStorage or an external API service
- **Authentication**: Simple client-side authentication (for demonstration purposes)
- **Benefits**: Simple to deploy, no server required
- **Limitations**: Limited persistence, security handled client-side

#### Next.js Architecture (Full-Stack)

```
┌───────────────────┐
│                   │
│  Client Browser   │
│                   │
└─────────┬─────────┘
          │
          │ HTTP/HTTPS
          ▼
┌───────────────────────────────────────────────────┐
│                                                   │
│  Vercel Platform                                  │
│  ┌───────────────────────────────────────────┐   │
│  │                                           │   │
│  │  Next.js Application                      │   │
│  │  ┌─────────────────┐  ┌────────────────┐  │   │
│  │  │                 │  │                │  │   │
│  │  │  React Frontend │  │  API Routes    │  │   │
│  │  │  (Pages/App)    │  │  (Serverless)  │  │   │
│  │  │                 │  │                │  │   │
│  │  └─────────────────┘  └────────┬───────┘  │   │
│  │                                │          │   │
│  └────────────────────────────────┼──────────┘   │
│                                   │              │
└───────────────────────────────────┼──────────────┘
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │                         │
                       │  MongoDB Atlas          │
                       │  (Cloud Database)       │
                       │                         │
                       └─────────────────────────┘
```

- **Full-Stack Architecture**: Next.js providing both frontend and API routes
- **Frontend**: React components with server-side rendering (SSR) and static generation (SSG)
- **Backend**: API routes functioning as serverless endpoints
- **Database**: MongoDB for data persistence
- **Authentication**: NextAuth.js for secure authentication
- **Benefits**: Unified codebase, serverless deployment, optimized performance
- **Deployment**: Vercel platform (optimized for Next.js)

#### Django Architecture (Model-View-Template)

```
┌───────────────────┐
│                   │
│  Client Browser   │
│                   │
└─────────┬─────────┘
          │
          │ HTTP/HTTPS
          ▼
┌────────────────────────────────────────────────┐
│                                                │
│  Web Server (Nginx/Apache)                     │
│  ┌────────────────────────────────────────┐   │
│  │                                        │   │
│  │  WSGI Server (Gunicorn/uWSGI)          │   │
│  │  ┌────────────────────────────────┐    │   │
│  │  │                                │    │   │
│  │  │  Django Application            │    │   │
│  │  │  ┌────────────┐ ┌───────────┐  │    │   │
│  │  │  │            │ │           │  │    │   │
│  │  │  │  Views     │ │  Models   │  │    │   │
│  │  │  │            │ │           │  │    │   │
│  │  │  └─────┬──────┘ └─────┬─────┘  │    │   │
│  │  │        │              │        │    │   │
│  │  │        ▼              ▼        │    │   │
│  │  │  ┌────────────┐ ┌───────────┐  │    │   │
│  │  │  │            │ │           │  │    │   │
│  │  │  │  Templates │ │  Admin    │  │    │   │
│  │  │  │            │ │           │  │    │   │
│  │  │  └────────────┘ └───────────┘  │    │   │
│  │  │                                │    │   │
│  │  └────────────────────┬───────────┘    │   │
│  │                       │                │   │
│  └───────────────────────┼────────────────┘   │
│                          │                    │
└──────────────────────────┼────────────────────┘
                           │
                           ▼
                 ┌─────────────────────┐
                 │                     │
                 │  PostgreSQL/MySQL   │
                 │  Database           │
                 │                     │
                 └─────────────────────┘
```

- **Model-View-Template (MVT) Architecture**: Django's adaptation of MVC pattern
- **Models**: Python classes defining database structure
- **Views**: Python functions handling business logic
- **Templates**: HTML files with Django template language
- **Admin Interface**: Built-in Django admin for content management
- **Authentication**: Django's authentication system
- **Database**: PostgreSQL or MySQL (relational databases)
- **Benefits**: Robust ORM, built-in admin, Python ecosystem
- **Deployment**: Traditional hosting or platform services like PythonAnywhere

#### Node.js Backend Architecture (REST API)

```
┌───────────────────┐
│                   │
│  Client Browser   │
│  or Frontend App  │
│                   │
└─────────┬─────────┘
          │
          │ HTTP/HTTPS
          ▼
┌────────────────────────────────────────────────┐
│                                                │
│  Node.js Server                                │
│  ┌────────────────────────────────────────┐   │
│  │                                        │   │
│  │  Express.js Application                │   │
│  │  ┌────────────┐ ┌───────────────────┐  │   │
│  │  │            │ │                   │  │   │
│  │  │  Routes    │ │  Controllers      │  │   │
│  │  │            │ │                   │  │   │
│  │  └─────┬──────┘ └─────────┬─────────┘  │   │
│  │        │                  │            │   │
│  │        └──────────┬───────┘            │   │
│  │                   │                    │   │
│  │                   ▼                    │   │
│  │  ┌───────────────────────────────┐     │   │
│  │  │                               │     │   │
│  │  │  Models (Mongoose Schemas)    │     │   │
│  │  │                               │     │   │
│  │  └───────────────┬───────────────┘     │   │
│  │                  │                     │   │
│  └──────────────────┼─────────────────────┘   │
│                     │                         │
└─────────────────────┼─────────────────────────┘
                      │
                      ▼
            ┌─────────────────────┐
            │                     │
            │  MongoDB            │
            │                     │
            └─────────────────────┘
```

- **RESTful API Architecture**: Node.js backend serving JSON responses
- **Framework**: Express.js for routing and middleware
- **Routes**: Endpoint definitions
- **Controllers**: Business logic handlers
- **Models**: Mongoose schemas for MongoDB interaction
- **Authentication**: JWT (JSON Web Tokens) for stateless authentication
- **Database**: MongoDB (NoSQL)
- **Benefits**: JavaScript throughout the stack, high performance for APIs
- **Deployment**: Cloud platforms (Heroku, DigitalOcean, AWS)

### Data Flow Architecture (Next.js Example)

The following diagram illustrates the data flow for the alerts management feature using the Next.js implementation:

```
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│  Client (Browser)                                                         │
│  ┌───────────────────────────────────────────────────────────────┐       │
│  │                                                               │       │
│  │  Admin Dashboard (React Components)                           │       │
│  │  ┌─────────────────────┐      ┌─────────────────────┐        │       │
│  │  │                     │      │                     │        │       │
│  │  │  Alert Form         │      │  Alert List         │        │       │
│  │  │  Component          │      │  Component          │        │       │
│  │  │                     │      │                     │        │       │
│  │  └─────────┬───────────┘      └─────────┬───────────┘        │       │
│  │            │                            │                    │       │
│  └────────────┼────────────────────────────┼────────────────────┘       │
│               │                            │                            │
└───────────────┼────────────────────────────┼────────────────────────────┘
                │                            │
                │  POST/PUT/DELETE           │  GET
                │  API Requests              │  API Requests
                ▼                            ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│  Server (Next.js API Routes)                                              │
│  ┌───────────────────────────────────────────────────────────────┐       │
│  │                                                               │       │
│  │  API Routes                                                   │       │
│  │  ┌─────────────────────┐      ┌─────────────────────┐        │       │
│  │  │                     │      │                     │        │       │
│  │  │  /api/alerts        │      │  /api/alerts/[id]   │        │       │
│  │  │  (POST, GET)        │      │  (GET, PUT, DELETE) │        │       │
│  │  │                     │      │                     │        │       │
│  │  └─────────┬───────────┘      └─────────┬───────────┘        │       │
│  │            │                            │                    │       │
│  └────────────┼────────────────────────────┼────────────────────┘       │
│               │                            │                            │
└───────────────┼────────────────────────────┼────────────────────────────┘
                │                            │
                │                            │
                ▼                            ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│  Database Layer                                                           │
│  ┌───────────────────────────────────────────────────────────────┐       │
│  │                                                               │       │
│  │  MongoDB                                                      │       │
│  │  ┌─────────────────────────────────────────────────────┐     │       │
│  │  │                                                     │     │       │
│  │  │  Alerts Collection                                  │     │       │
│  │  │  {                                                  │     │       │
│  │  │    id: "...",                                       │     │       │
│  │  │    title: "Tech Symposium",                         │     │       │
│  │  │    content: "Registration open...",                 │     │       │
│  │  │    date: "2024-03-10T12:00:00.000Z",               │     │       │
│  │  │    isNew: true,                                     │     │       │
│  │  │    active: true                                     │     │       │
│  │  │  }                                                  │     │       │
│  │  │                                                     │     │       │
│  │  └─────────────────────────────────────────────────────┘     │       │
│  │                                                               │       │
│  └───────────────────────────────────────────────────────────────┘       │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

### Authentication Architecture (Next.js Example)

The authentication flow in the Next.js implementation:

```
┌────────────────┐    (1) Login Request     ┌────────────────────┐
│                │ ─────────────────────────▶                    │
│                │                          │                    │
│  Client        │                          │  NextAuth.js       │
│  (Browser)     │                          │  Authentication    │
│                │                          │                    │
│                │ ◀─────────────────────────                    │
└────────────────┘    (2) Session Cookie    └─────────┬──────────┘
       │                                              │
       │                                              │ (3) Verify
       │                                              │ Credentials
       │                                              ▼
       │                                    ┌────────────────────┐
       │                                    │                    │
       │                                    │  Credentials       │
       │                                    │  Provider          │
       │                                    │                    │
       │                                    └────────────────────┘
       │
       │ (4) Request with
       │ Session Cookie
       ▼
┌────────────────┐                         ┌────────────────────┐
│                │                         │                    │
│  Protected     │                         │  API Routes        │
│  Admin Routes  │◀───────────────────────▶│  Middleware        │
│                │                         │                    │
└────────────────┘                         └────────────────────┘
```

1. User submits login credentials
2. NextAuth.js verifies credentials and sets a secure session cookie
3. Subsequent requests include the session cookie
4. Middleware checks the session on protected routes

## Project Structure

The project is organized to support multiple development approaches, with separate directories for each implementation:

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
│
└── README.md                    # Project overview
```

## Development Approaches

### 1. HTML/CSS/JavaScript (Core)

#### Setup and Installation

1. No installation required
2. Navigate to the `core/` directory
3. Open `index.html` in a web browser

#### Development Guide

- **Main Website**:
  - Edit `index.html` for page structure
  - Modify `css/styles.css` for styling
  - Update `js/script.js` for interactive features

- **Admin Dashboard**:
  - Edit `admin/alerts.html` for the admin interface
  - Modify `css/admin.css` for admin styling
  - Update `js/admin.js` for admin functionality

#### Data Persistence

For the core HTML/CSS/JS implementation, alerts data can be persisted using:
1. **Browser localStorage** (temporary solution):
   ```javascript
   // Save alerts
   localStorage.setItem('alerts', JSON.stringify(alertsArray));
   
   // Retrieve alerts
   const alerts = JSON.parse(localStorage.getItem('alerts') || '[]');
   ```

2. **External service integration**:
   - Firebase Realtime Database
   - Any REST API service

### 2. Next.js (React)

#### Setup and Installation

1. Navigate to the `next-app/` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` file with required environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_secret_key
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_admin_password
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access at `http://localhost:3000`

#### Development Guide

- **Main Website**:
  - Edit `app/page.js` for the homepage
  - Create components in the `components/` directory
  - Use CSS modules or modify global styles

- **Admin Dashboard**:
  - Edit `app/admin/alerts/page.js` for the admin interface
  - Update authentication logic in `middleware.js`

- **API Routes**:
  - Modify alert endpoints in `app/api/alerts/route.js` and `app/api/alerts/[id]/route.js`

### 3. Django (Python)

#### Setup and Installation

1. Navigate to the `django-app/` directory
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```bash
   python manage.py migrate
   ```
5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```
6. Run the development server:
   ```bash
   python manage.py runserver
   ```
7. Access at `http://localhost:8000`

#### Development Guide

- **Data Models**:
  - Edit `website/models.py` to modify the Alert model or add new models
  - Run migrations after model changes:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

- **Views and Templates**:
  - Edit views in `website/views.py`
  - Modify templates in `website/templates/`
  - Update URL patterns in `website/urls.py`

- **Admin Interface**:
  - Customize the admin interface in `website/admin.py`
  - Access at `http://localhost:8000/admin`

### 4. Node.js Backend

#### Setup and Installation

1. Navigate to the `node-backend/` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with required environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3001
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. API available at `http://localhost:3001/api`

#### Development Guide

- **Models**:
  - Edit `models/Alert.js` to modify the Alert schema
  
- **Controllers**:
  - Update alert logic in `controllers/alertController.js`
  
- **Routes**:
  - Configure endpoints in `routes/alertRoutes.js`

## Admin Dashboard

The admin dashboard is a secure interface for managing website content, particularly alerts and notifications.

### Features

1. **Authentication**:
   - Secure login system
   - Protected routes accessible only to authorized users

2. **Alerts Management**:
   - View all alerts
   - Create new alerts
   - Edit existing alerts
   - Delete alerts
   - Toggle alert status (active/inactive)
   - Mark alerts as "New" (displays a badge)

### Alert Management Workflow

1. Administrator logs in to the dashboard
2. Views the list of existing alerts
3. Can add a new alert by filling out the alert form
4. Can edit an existing alert by clicking the edit button
5. Can delete an alert by clicking the delete button
6. Can toggle alert visibility by changing the "active" status
7. Can highlight important alerts with the "New" badge

## Data Models

### Alert Model

The core data structure for alerts/notifications:

| Field     | Type      | Description                                  |
|-----------|-----------|----------------------------------------------|
| id        | String    | Unique identifier                            |
| title     | String    | Alert headline (required, max 60 chars)      |
| content   | String    | Alert message (required, max 200 chars)      |
| date      | Date      | Creation/update timestamp                    |
| isNew     | Boolean   | Whether to show the "New" badge              |
| active    | Boolean   | Whether the alert is visible on the website  |

#### JSON Example:

```json
{
  "id": "60d21b4667d0d8992e610c85",
  "title": "Tech Symposium 2024",
  "content": "Registrations open for annual tech fest. Last date: 15th March",
  "date": "2024-03-10T12:00:00.000Z",
  "isNew": true,
  "active": true
}
```

## API Endpoints

### Next.js API Routes

| Endpoint                | Method | Description                |
|-------------------------|--------|----------------------------|
| `/api/alerts`           | GET    | Get all alerts             |
| `/api/alerts`           | POST   | Create a new alert         |
| `/api/alerts/[id]`      | GET    | Get a specific alert       |
| `/api/alerts/[id]`      | PUT    | Update a specific alert    |
| `/api/alerts/[id]`      | DELETE | Delete a specific alert    |

### Node.js Backend

| Endpoint                | Method | Description                |
|-------------------------|--------|----------------------------|
| `/api/alerts`           | GET    | Get all alerts             |
| `/api/alerts`           | POST   | Create a new alert         |
| `/api/alerts/:id`       | GET    | Get a specific alert       |
| `/api/alerts/:id`       | PUT    | Update a specific alert    |
| `/api/alerts/:id`       | DELETE | Delete a specific alert    |
| `/api/auth/login`       | POST   | Authenticate admin user    |

## Deployment Guide

### Vercel Deployment (Next.js)

1. Push your code to a GitHub repository
2. Sign up for a Vercel account (https://vercel.com)
3. Import your GitHub repository
4. Configure environment variables in Vercel's project settings:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
5. Deploy the application

### Traditional Web Hosting (Core HTML/CSS/JS)

1. Upload the contents of the `core/` directory to your web hosting service
2. Ensure proper file permissions (typically 644 for files, 755 for directories)
3. For the admin dashboard to work with persistent data, you'll need:
   - A backend service (could be Firebase, a custom API, etc.)
   - Update the admin.js file to connect to this service

### Django Deployment

1. Choose a hosting provider (PythonAnywhere, Heroku, etc.)
2. Follow their specific deployment guidelines
3. For example, on PythonAnywhere:
   - Upload code or clone from GitHub
   - Create a virtual environment and install dependencies
   - Configure WSGI file
   - Set up a MySQL or PostgreSQL database
   - Collect static files (`python manage.py collectstatic`)

### Node.js Backend Deployment

1. Choose a hosting provider (Heroku, DigitalOcean, etc.)
2. Follow their specific deployment guidelines
3. Ensure environment variables are properly set
4. For MongoDB, consider using MongoDB Atlas for cloud database hosting

## Troubleshooting

### Common Issues

#### Database Connection Problems

**Symptoms**: Error messages involving database connection, alerts not loading

**Solutions**:
1. Check that your MongoDB connection string is correct
2. Ensure network connectivity to the database server
3. Verify IP whitelist settings if using MongoDB Atlas
4. Check database user permissions

#### Admin Authentication Issues

**Symptoms**: Unable to log in to admin dashboard

**Solutions**:
1. Verify that environment variables for admin credentials are set correctly
2. Check for typos in username/password
3. Clear browser cookies and try again
4. Ensure the authentication route is working correctly

#### Deployment Errors

**Symptoms**: Application works locally but fails when deployed

**Solutions**:
1. Check environment variables on the hosting platform
2. Review deployment logs for specific error messages
3. Ensure all dependencies are properly listed in package.json or requirements.txt
4. Verify build scripts and start commands

#### Alert CRUD Operation Failures

**Symptoms**: Unable to create, update, or delete alerts

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify API routes are configured correctly
3. Ensure proper authentication for protected routes
4. Check data validation requirements (title length, etc.)

### Getting Help

If you encounter issues not covered in this documentation:

1. Search for error messages online
2. Review the specific framework documentation:
   - [Next.js Documentation](https://nextjs.org/docs)
   - [Django Documentation](https://docs.djangoproject.com/)
   - [Node.js Documentation](https://nodejs.org/en/docs/)
3. Reach out to the ASCESS development team for assistance
