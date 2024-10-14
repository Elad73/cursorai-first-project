# BudgetMaster

BudgetMaster is a web application designed to help users manage their expenses efficiently. It features a client-server architecture, providing a responsive front-end interface backed by a robust server-side API.

## Project Structure

The project is organized into two main directories:

BudgetMaster/
├── client/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── styles/
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ └── README.md
├── server/
│ ├── routes/
│ ├── models/
│ ├── server.js
│ └── package.json
└── README.md


## Current Status

- **Frontend (Client)**: 
  - Implemented responsive design with a hero image and centered title
  - Created a navigation bar with links to Home, Add Expense, and View Expenses pages
  - Styled components for both desktop and mobile views
  - Utilized React for component-based architecture

- **Backend (Server)**:
  - Set up Express.js server
  - Configured MongoDB connection
  - (Add any specific API endpoints or features implemented on the server)

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)
- MongoDB (Make sure it's installed and running)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/BudgetMaster.git
   cd BudgetMaster
   ```

2. Install dependencies for both client and server:
   ```
   npm install
   cd client
   npm install
   cd ../server
   npm install
   ```

### Running the Application

The project is set up to start both the client and server with a single command from the root directory:


This command uses `concurrently` to run both the server and client simultaneously. The server will start on `http://localhost:5000`, and the client will start on `http://localhost:3000`.

If you prefer to run the server and client separately:

1. Start the server:
   ```
   cd server
   npm start
   ```

2. In a new terminal, start the client:
   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Next Steps

- Implement user authentication
- Create forms for adding and editing expenses
- Develop a dashboard for expense overview and analytics
- Enhance mobile responsiveness and user experience
- Add data validation and error handling

## Contributing

(Add guidelines for contributing to the project, if applicable)

## License

This project is licensed under the MIT License.

MIT License

Copyright (c) 2024 Elad Ron

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
