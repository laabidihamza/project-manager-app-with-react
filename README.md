# Project Manager With React

A modern React-based project management application to help users organize, track, and complete projects efficiently.

## Features

- **Dashboard Overview**: Get a quick glance at all your projects and tasks
- **Project Management**: Create, edit, and organize projects with ease
- **Task Tracking**: Manage tasks with priority levels, due dates, and assignments
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React.js with Hooks
- **Styling**: CSS
- **State Management**: Context API
- **Routing**: React Router
- **Build Tool**: Vite

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/project-management-app.git
   cd project-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
project-management/
├── public/               # Static files
├── src/                  # Source files
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable components
│   │   ├── auth/         # Authentication
│   │   ├── Layout/       # Header, Sidebar
│   │   ├── projects/     # Project-specific components
│   │   ├── tasks/        # Task-specific components
│   │   └── PrivateRoute  # Routing
│   ├── pages/            # Page components
│   ├── App.jsx           # Main app component
│   ├── index.css         # Global styles
│   └── main.jsx          # Entry point
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore file
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── README.md             # Project documentation
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

## Configuration

### Tailwind CSS

The project uses a custom Tailwind CSS configuration with an extended color palette and component classes. See `tailwind.config.js` for details.

## Styling Guide

The application uses a consistent styling approach with Tailwind CSS. Common components include:

- **Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`, etc.
- **Cards**: `.card`, `.project-card`, `.dashboard-card`, etc.
- **Forms**: `.form-group`, `.form-input`, `.form-label`, etc.
- **Layout**: `.page-container`, `.section`, etc.

For more details, refer to the `index.css` file.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)


---

Made with ❤️ by Hamza Laabidi.
