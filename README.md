# Romantic Date Invitation — Dearest Dr Trunali 🌹✨

A luxury romantic interactive date proposal application built with React, Vite, Tailwind CSS, Motion, and Radix UI.

## 🚀 How to Publish to GitHub Pages

This repository is already configured with an automated GitHub Pages deployment workflow (`.github/workflows/deploy.yml`) and relative asset paths (`base: './'`).

### Option 1: Direct Export via AI Studio (Recommended)
1. Click the **Export** / **GitHub** icon or open the top menu in AI Studio.
2. Select **Export to GitHub** (or connect your GitHub repository).
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Push to `main` (or trigger the action under the **Actions** tab) to automatically publish your live URL at `https://<your-username>.github.io/<your-repo-name>/`!

### Option 2: Manual Push from Local Machine
```bash
# 1. Clone or download project files
git init
git add .
git commit -m "feat: romantic date invitation for Dr Trunali"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
The included GitHub Action will automatically build and publish the live site.
