# BonPlanJV

BonPlanJV is a React application with Firebase as the backend. The application aims to provide users with the best deals and promotions for video games.

Check out the live application [here](https://bonplanjv.netlify.app).

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse the latest video game deals and promotions.
- User authentication (signup and login) using Firebase Authentication.
- Save your favorite deals to your profile.
- Search for specific games or deals.
- Responsive design for optimal viewing on different devices.

## Demo

You can access the live demo of the application [here](https://bonplanjv.netlify.app).

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/bonplanjv.git
   ```

2. Navigate to the project directory:

```bash
cd bonplanjv
```

3. Install the dependencies:

```bash
npm install
```

4. Create a .env file in the root directory and add your Firebase configuration:

```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

5. Start the development server:

```
npm start
Open your browser and navigate to http://localhost:3000.
```

## Usage
Once the application is running, you can:

- Browse the latest deals on the homepage.
- Use the search bar to find specific games or deals.
- Create an account or log in using the authentication system.
- Save deals to your favorites for quick access later.
- Technologies

The project is built with the following technologies:

- React: A JavaScript library for building user interfaces.
- Firebase: Backend as a service, providing authentication, database, and storage.
- Netlify: Hosting and continuous deployment service for the web.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch:

```bash
git checkout -b feature-branch
```

3. Make your changes

4. Commit your changes:

```bash
git commit -m 'Add new feature'
```

5. Push to the branch:

```bash
git push origin feature-branch
```

6. Create a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
