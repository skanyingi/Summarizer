# The Curator - AI Document Summarizer

An intelligent document summarization tool that transforms lengthy PDFs into concise, actionable insights using AI.

## Features

- **PDF Upload** - Drag and drop or browse to upload PDF documents for processing
- **AI-Powered Analysis** - Uses OpenRouter API to extract key information from documents
- **Executive Summaries** - Automatically generates structured summaries with key insights
- **Metadata Extraction** - Identifies dates, entities, analysts, and other important metadata
- **Confidence Scoring** - Provides AI confidence scores for each analysis
- **Export & Share** - Download summaries as JSON or share with team members

## How It Works

1. **Upload** - Upload a PDF document through the intuitive drag-and-drop interface
2. **Process** - The AI extracts text and analyzes the document content
3. **Summarize** - Receive an executive summary with key insights and metadata
4. **Export** - Download or share the results

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenRouter API (Mistral/Sonnet models)
- **PDF Processing**: pdf2json
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenRouter API key

### Environment Variables

Create a `.env.local` file in the root directory:

```env
OPENROUTER_API_KEY=your_api_key_here
```

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Deployment

This app deploys to Netlify. Make sure to set the `OPENROUTER_API_KEY` environment variable in your Netlify dashboard.

## Project Structure

```
src/
├── app/
│   ├── api/process/    # PDF processing API endpoint
│   ├── library/        # Document history page
│   ├── processing/     # Document processing progress page
│   ├── summary/        # Results and insights display
│   ├── upload/         # PDF upload page
│   └── page.tsx        # Dashboard home
├── components/         # Reusable UI components
└── lib/
    └── store.ts        # Client-side file storage
```

## Screenshots

- **Dashboard** - Upload zone with processing pipeline overview
- **Processing** - Real-time progress with step-by-step status
- **Summary** - Executive summary with insights and metadata
- **Library** - History of processed documents

## License

MIT