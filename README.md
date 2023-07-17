# inpublic

## https://inpublic.dev

### Project-centric blogging, built for fast and informal updates that keep you accountable

Follow development on [inpublic](https://inpublic.dev/justinpchang/inpublic).

Please log all bugs and feature requests as [GitHub issues](https://github.com/justinpchang/inpublic/issues).

### Tech

- Backend
  - Code in `api` directory
  - Ruby on Rails 7 app
  - Deployed on Fly.io via Github Actions
  - Storage with PostgreSQL 14
- Frontend
  - Code in `web` directory
  - Next.js app (no api pages)
  - Deployed on Vercel via Github hooks

### Local development

A Procfile is defined at the root directory to facillitate local development.

```
cd api
bundle
cd ../web
yarn
cd ..
foreman start
```
