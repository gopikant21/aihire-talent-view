# AIHire Talent View

A modern talent management platform for recruiters to manage candidates and job positions effectively.

## 🚀 Features

- **Candidate Management**: Track and manage candidate profiles and applications
- **Job Management**: Create, edit, and manage job listings
- **Dashboard**: Get an overview of your recruitment process
- **Insights**: Data-driven recruitment analytics
- **Chatbot**: AI-powered assistance for recruitment queries

## 💻 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: Shadcn UI (based on Radix UI)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: TanStack React Query
- **Charts**: Recharts

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn or bun

### Installation

1. Clone the repository

```bash
git clone https://github.com/gopikant21/aihire-talent-view.git
cd aihire-talent-view
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build

```bash
npm run build
# or
yarn build
# or
bun build
```

To preview the build:

```bash
npm run preview
# or
yarn preview
# or
bun preview
```

## 🧪 Linting

```bash
npm run lint
# or
yarn lint
# or
bun lint
```

## 📁 Project Structure

```
aihire-talent-view/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── candidates/  # Candidate-related components
│   │   ├── jobs/        # Job-related components
│   │   ├── layout/      # Layout components
│   │   └── ui/          # UI components (from shadcn/ui)
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Application pages
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Application entry point
└── ...config files      # Various configuration files
```

## 🔑 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
VITE_API_URL=your_api_url_here
```

## 📄 License

[MIT](LICENSE)
