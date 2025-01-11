# Harmony: Product Code Generator for Pharmaceutical Brands

## Overview

Harmony is an application designed to generate unique product codes for pharmaceutical brands. This ensures that each product can be easily identified, cataloged, and tracked within a pharmaceutical database. The system is inspired by standards like FDA product codes but tailored for pharmaceutical businesses and brands.

## Features

- **Unique Product Code Generation**: Ensures that every product has a distinct and non-repeating code.
- **Customizable Code Formats**: Allows businesses to define specific formats for their product codes.
- **Brand-Specific Integration**: Each code is linked to a specific pharmaceutical brand.
- **User-Friendly Interface**: Intuitive design for easy operation.
- **Database Storage**: Codes and product details are stored securely in a database called `harmony`.
- **Scalability**: Supports an expanding catalog of products and brands.

## Technologies Used

- **Backend**: Node.js with Express
- **Frontend**: React.js
- **Database**: MySQL (Database name: `harmony`)
- **Authentication**: Session-based authentication
- **Testing**: Jest

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MySQL
- npm

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/harmony.git
   ```

2. Navigate to the project directory:

   ```bash
   cd harmony
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the database:
   - Create a MySQL database named `harmony`.

5. Start the application:

   ```bash
   npm start
   ```

6. Open the application in your browser:

   ```
   http://localhost:3000
   ```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Product Code Management

- `POST /api/brands/` - Create a brand and generate a code
- `GET /api/brand/` - Retrieve all brands
- `GET /api/brands/:id` - Retrieve a specific brand
- `DELETE /api/brand/:id` - Delete a product

## Testing

Run the test suite using Jest:

```bash
npm test
# or
yarn test
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For questions, feedback, or collaboration, please contact:
[Your Email Address]\
[Your LinkedIn Profile]

