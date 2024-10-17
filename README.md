
# Random Placeholder Image Generator

A simple web application to generate random placeholder images for your projects via API. It includes a shuffle feature and a copy-to-clipboard button for easy image retrieval.

## Features
- Fetch random placeholder images via API
- Copy image URL to clipboard
- Skeleton loading state while fetching images
- Shadcn UI components for clean and responsive design

## API
Fetch a random image using the following endpoint:
```
https://zhenfon.github.io/random-placeholder/api/random-image
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zhenfon/random-placeholder.git
   cd random-placeholder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your Supabase API keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

1. **Fetching Images**:
   - Upon page load, a random placeholder image will be fetched automatically.
   - Click the **Shuffle** button to get a new random image.

2. **Copy to Clipboard**:
   - Click the **Copy** button to copy the API URL of the random image to your clipboard.

## License
This project is licensed under the GPL-3.0 License - see the [LICENSE](./LICENSE) file for details.
