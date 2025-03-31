# Radiator Builder

A web application built with React and TypeScript.

## Technologies Used

- **Frontend Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Development Tools**:
  - ESLint for code linting
  - PostCSS for CSS processing
  - TypeScript for type safety

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
cd radiator-builder
```

2. Install dependencies:
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

3. Start the development server:
```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

The application will be available at `http://localhost:5173` by default.

## Project Structure

- `/src` - Source code directory
- `/public` - Static assets
- `/src/components` - React components
- `/src/context` - React context
- `/src/types` - TypeScript type definitions
- `/src/api` - Function used to fetch data
- `/src/providers` - Folder for providers such as `i18n` configuration file
- `/src/locales` - Folder for translations
- `jsonConverter` - Script used to transform a given data which are placed in `radiator_builder_data.txt`
- `radiatior_builder_data.json` - Data used in the present App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

