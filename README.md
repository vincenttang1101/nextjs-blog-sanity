### [Live demo](https://techblog-orignal.vercel.app/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Fsanity-template-nextjs-blog-comments&project-name=sanity-next-blog-comments&repository-name=sanity-next-blog-comments&demo-title=Next.js%20Blog%20with%20Comments&demo-description=A%20Next.js%20%2B%20Sanity%20blog%20with%20comments%20stored%20in%20Studio%20via%20API%20routes.&demo-url=https%3A%2F%2Ftemplate-nextjs-blog-comments.sanity.build%2F&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fsanity-io%2Fsanity-template-nextjs-blog-comments%2Fmain%2F.sanity-template%2Fassets%2Fpreview-image.jpg&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx)

![screenshot](ihttps://i.ibb.co/19XcZHD/tech-blog.png)

This is a demo of how to add a simple comment section to blog post using [Next.js](https://nextjs.org), [Sanity.io](https://www.sanity.io), and [Vercel](https://vercel.com).

### Running the front-end

You'll need to create a `.env` file to store a few environment variables that Next will use to pull data from the Sanity API.

```dotenv
# For Next Locally
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_TOKEN
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_ID
GITHUB_SECRET

# For Studio Locally
SANITY_STUDIO_API_PROJECT_ID=
SANITY_STUDIO_API_DATASET=
```

To find these, visit https://manage.sanity.io

The Project ID is displayed once you select your project. It is an alphanumeric 8-character string.

You can find or create your Sanity API token by choosing "Settings" and then "API". It is a 180-character string.

The dataset is the name of the dataset that you want to use. For instance "production".

Once those env variables are in place, you can run the following commands to get Next's development server up and running:

```bash
# install packages for frontend
npm install
# install packages for backend
cd server
npm install

# Run the frontend
npm run dev
# Run the backend
cd server
npm run dev || sanity dev
```

The blog will be running at `http://localhost:3000`, the Studio will run at `http://localhost:3333`.
