
# Random Placeholder Image Generator

A web application that generates random placeholder images for your projects. It fetches images from a Supabase storage bucket and allows users to shuffle through random images and copy the image URL to their clipboard.

## Features
- Fetch a random placeholder image from a Supabase bucket.
- Copy the image URL to your clipboard with a single click.
- Shadcn UI components for a clean and responsive design.
- Skeleton loader while fetching the images.
- Automatically fetches a random image on page load.

## API

The app provides a simple API endpoint to fetch a random image URL:

```
/api/random-image
```

Use this endpoint in your own projects to retrieve a random placeholder image.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

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

3. Create a `.env.local` file and add your Supabase environment variables:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Configure your Supabase domain in `next.config.js`:
   
   ```js
   module.exports = {
     images: {
       domains: ['your_supabase_domain.supabase.co'],
     },
   };
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Usage

1. **Fetching a Random Image**:
   - A random image is fetched automatically when the page loads.
   - Click the **Shuffle** button to fetch a new random image.

2. **Copying the Image URL**:
   - The image URL is displayed in an input field.
   - Click the **Copy** button to copy the image URL to your clipboard.

## Deployment

The app is configured to be deployed to Vercel. Follow these steps to deploy:

1. Push your repository to GitHub (if not already pushed).
2. Log in to [Vercel](https://vercel.com/), connect your GitHub repository, and deploy.

Alternatively, if you're deploying to another platform, ensure the environment variables for Supabase are properly set.

### Environment Variables

Make sure to set these environment variables in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](./LICENSE) file for details.
