# Color Hunt Server 🎨

A Node.js backend server for the Color Hunt project that manages color palette data through a RESTful API.

## Overview

The Color Hunt Server provides a robust backend solution for managing and retrieving color palettes. It handles database connections and offers various endpoints to query color palettes based on different conditions, making it perfect for design applications and color discovery tools.

## Features

- 🎯 RESTful API for color palette management
- 🗄️ Database integration for persistent storage
- 🔍 Advanced palette filtering and search capabilities
- 📊 Support for various query conditions
- 🚀 Fast and efficient data retrieval

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Database (MongoDB)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd color_hunt/server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Get All Palettes
```
GET /api/palettes
```

### Get Palettes by Condition
```
GET /api/palettes?condition=<value>
```

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Project Structure

```
server/
   ├── services/
   ├── modules/
   ├── routers/
   ├── tests/
   └── utils/
├── package.json
└── README.md
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---

*Built with ❤️ for the Color Hunt project*