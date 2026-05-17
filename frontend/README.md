# StackNest Frontend

This is a simple Next.js frontend for the StackNest Java social media backend.

## Tech Used

- Next.js App Router
- React
- Tailwind CSS
- JavaScript
- Backend proxy through `next.config.mjs`

## Run Locally

Start the Spring Boot backend first on `http://localhost:8080`, then run:

```powershell
cd E:\StackNest\frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

If the backend runs somewhere else, copy `.env.example` to `.env.local` and change:

```env
STACKNEST_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_API_BASE_URL=/api/backend
```

## Folder Structure

- `src/app/page.js` - main page, loads posts and communities, stores the auth token in `localStorage`.
- `src/app/layout.js` - shared app layout and metadata.
- `src/app/globals.css` - Tailwind import and small global styles.
- `src/lib/api.js` - small fetch helper for calling backend APIs.
- `src/components/AuthPanel.js` - login and signup form.
- `src/components/CommunityPanel.js` - community list and create community form.
- `src/components/PostComposer.js` - create post form and image upload.
- `src/components/PostCard.js` - post display, voting, comments.
- `src/components/Header.js` - top navigation.
- `public/stacknest-cover.jpg` - local visual asset used in the first screen.

## Backend Endpoints Used

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/communities`
- `POST /api/communities`
- `GET /api/posts`
- `POST /api/posts`
- `POST /api/upload`
- `POST /api/votes`
- `GET /api/comments/post/{postId}`
- `POST /api/comments`

## Documentation Resources

These are the main docs/resources used from the PDF and official documentation:

- Next.js docs: https://nextjs.org/docs
- Next.js project structure: https://nextjs.org/docs/app/getting-started/project-structure
- Next.js rewrites: https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites
- Tailwind CSS docs: https://tailwindcss.com/docs
- Node.js docs: https://nodejs.org/docs/latest/api/
- REST API reference: https://restfulapi.net/
- Spring Boot project docs: https://spring.io/projects/spring-boot
- Spring Security docs: https://spring.io/projects/spring-security
- PostgreSQL docs: https://www.postgresql.org/docs/
- Cloudinary docs: https://cloudinary.com/documentation
- Vercel docs: https://vercel.com/docs
- Railway docs: https://docs.railway.app
- Render docs: https://render.com/docs
