**Project Overview**
- **Name:**: codePaste
- **Description:**: A simple paste/code web app built with React + Vite and backend by Appwrite. Users can create, view, edit, and delete code pastes with syntax highlighting and authentication.

**Features**
- **Create Paste:**: Create new code snippets with title and language.
- **View & Edit:**: View a paste with syntax highlighting and edit or delete it.
- **Recent Pastes:**: See recently created pastes.
- **User Authentication:**: Sign up / login via Appwrite.

**Tech Stack**
- **Frontend:**: React, Vite
- **Editor:**: @monaco-editor/react
- **Backend / Auth / DB:**: Appwrite
- **Styling:**: Tailwind CSS

**Prerequisites**
- **Node.js (>=16)**: Install from https://nodejs.org/
- **npm or yarn**: npm comes with Node.js.
- **Appwrite project**: An Appwrite instance (self-hosted or cloud) with a project, database and collection created.

**Configuration**
- **Environment variables:**: This project reads Appwrite settings from Vite env vars. Create a `.env` or `.env.local` file in the project root with the following keys:

```
VITE_APPWRITE_ENDPOINT=https://[YOUR_APPWRITE_ENDPOINT]
VITE_APPWRITE_PROJECT_ID=[YOUR_PROJECT_ID]
VITE_APPWRITE_DATABASE_ID=[YOUR_DATABASE_ID]
VITE_APPWRITE_COLLECTION_ID=[YOUR_COLLECTION_ID]
```

- **Where they are used:**: The file `src/conf/conf.js` loads these values and `src/appwrite/config.js` uses them to instantiate the Appwrite client.

**Install & Run (Windows PowerShell)**

```powershell
cd path\to\codePaste
npm install
npm run dev
```

- **Build for production:**

```powershell
npm run build
npm run preview
```

**Project Structure (key files)**
- **`src/`**: Application source code.
- **`src/appwrite/config.js`**: Appwrite client/service wrapper used to create/list/update/delete pastes.
- **`src/conf/conf.js`**: Loads Vite env vars (`VITE_APPWRITE_*`).
- **`src/components/`**, **`src/pages/`**: UI components and routes.
- **`src/data/languages.json`**: Supported languages for the editor.

**Scripts (from `package.json`)**
- **`dev`**: Runs the Vite development server (`vite`).
- **`build`**: Builds the production bundle (`vite build`).
- **`preview`**: Locally preview the production build (`vite preview`).

**Deployment**
- **Vercel:**: This repository already contains `vercel.json`. Deploy by connecting the repo in Vercel and setting the same Vite env vars (`VITE_APPWRITE_*`) in the Vercel project settings.
- **Other Hosts:**: Build (`npm run build`) and serve the `dist/` folder with any static host.

**Troubleshooting**
- If Appwrite calls fail, confirm `VITE_APPWRITE_ENDPOINT` and `VITE_APPWRITE_PROJECT_ID` are correct and that CORS is configured in Appwrite.
- Check console/logs for errors originating from `src/appwrite/config.js` (service wrapper).

**Contributing**
- Bug reports and PRs are welcome. Please open issues for discussion before large changes.

