/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['zotdhjpwmybffyzgxsrz.supabase.co'],
    },
    api: {
        externalResolver: true,
    },
};

export default nextConfig;
