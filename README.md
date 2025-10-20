# Padel Tournament Web Application

A modern, responsive web application for managing padel tournaments with a beautiful glassmorphism design.

## Features

- **Home Page**: Registration form with tournament information
- **Bracket Page**: Tournament bracket view with match results
- **Admin Panel**: Authentication and tournament management
- **Responsive Design**: Mobile-first approach with glassmorphism UI
- **Real-time Updates**: Live tournament progress tracking
- **Modern Tech Stack**: React, TypeScript, Tailwind CSS, Framer Motion

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism components
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Backend**: Supabase (PostgreSQL + Real-time + Auth)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (optional - app works with mock data)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd padel-tournament-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase Setup (Optional)

If you want to use Supabase for data persistence:

1. Create a new Supabase project
2. Run the following SQL to create the database schema:

```sql
-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  level VARCHAR(20) CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create matches table
CREATE TABLE matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  round VARCHAR(20) CHECK (round IN ('quarterfinals', 'semifinals', 'final')) NOT NULL,
  team1_id VARCHAR(255) NOT NULL,
  team2_id VARCHAR(255) NOT NULL,
  team1_score INTEGER DEFAULT 0,
  team2_score INTEGER DEFAULT 0,
  status VARCHAR(20) CHECK (status IN ('pending', 'in_progress', 'completed')) DEFAULT 'pending',
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tournament_info table
CREATE TABLE tournament_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location VARCHAR(255) NOT NULL,
  max_participants INTEGER NOT NULL,
  current_participants INTEGER DEFAULT 0,
  rules TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admins table
CREATE TABLE admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default tournament info
INSERT INTO tournament_info (name, date, location, max_participants, rules) VALUES (
  'Winter Padel Championship 2024',
  '2024-12-15 09:00:00+00',
  'Padel Center Madrid, Spain',
  24,
  'Double elimination format, best of 3 sets per match, standard padel scoring system.'
);

-- Insert default admin (password: admin123)
INSERT INTO admins (email, password_hash) VALUES (
  'admin@padel.com',
  'admin123'
);
```

3. Update your `.env.local` file with the Supabase URL and anon key.

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components (Navbar, etc.)
│   └── tournament/   # Tournament-specific components
├── pages/
│   ├── home/         # Home page with registration
│   ├── bracket/      # Tournament bracket page
│   └── admin/        # Admin panel
├── hooks/            # Custom React hooks
├── services/         # API services and Supabase config
├── styles/           # Global styles and Tailwind config
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Features Overview

### Home Page
- Registration form with validation
- Tournament information display
- Responsive design with glassmorphism effects

### Bracket Page
- Tournament bracket visualization
- Match status tracking
- Filter by tournament round
- Real-time updates

### Admin Panel
- Secure authentication
- Participant management
- Match result entry
- Tournament settings

## Demo Credentials

For the admin panel:
- Email: `admin@padel.com`
- Password: `admin123`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Design System

The app uses a custom glassmorphism design system with:
- Dark gradient backgrounds
- Glass effect cards with backdrop blur
- Neon green accent color (#00ff88)
- Smooth animations and transitions
- Mobile-first responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
