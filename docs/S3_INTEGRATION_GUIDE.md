# S3 / DigitalOcean Spaces Integration — Step-by-Step

This guide walks you through moving **~172MB** of media from your repo into a DigitalOcean Space (S3-compatible) and referencing it from the app. Result: lighter repo, same paths in code, optional CDN for lower latency.

---

## Step 1: Create a Space (bucket) on DigitalOcean

1. Log in to [DigitalOcean](https://cloud.digitalocean.com).
2. Click **Create** → **Spaces**.
3. On **Create a Spaces Bucket**:
   - **Region**: Pick one close to your users (e.g. `nyc3`, `sfo3`, `blr1`).
   - **Storage**: **Standard** (CDN works with this).
   - **Enable CDN**: Turn **ON** (recommended for lower latency and caching).
   - **Bucket name**: e.g. `netiapps-media` (3–63 chars, lowercase, numbers, dashes only).
   - **Project**: Choose your project.
4. Click **Create a Spaces Bucket**.

---

## Step 2: Make the bucket (or folder) publicly readable

1. Open your Space → **Settings**.
2. Under **File Listing**, choose **Public** if you want all files to be readable by URL (typical for site assets).
3. Or use a **CORS config** if you only need browser access from your domain; for public images/videos, **Public** is simplest.

---

## Step 3: Create Spaces access keys (for uploads)

1. In the control panel go to **API** → **Spaces Keys** (or **Manage** → **Spaces access keys**).
2. Click **Generate New Key**.
3. Name it (e.g. `netiapps-upload`).
4. **Save the Key and Secret** somewhere safe; the secret is shown only once.

You’ll use these with AWS CLI or a script to upload files.

---

## Step 4: Get your Space URLs

From your Space’s **Settings**:

- **Endpoint**: `https://<region>.digitaloceanspaces.com`  
  Example: `https://nyc3.digitaloceanspaces.com`
- **Public URL** (if CDN enabled):  
  `https://<bucket>.<region>.cdn.digitaloceanspaces.com`  
  Example: `https://netiapps-media.nyc3.cdn.digitaloceanspaces.com`

Use the **CDN URL** as the base for serving assets (better latency and caching).

---

## Step 5: Upload media from your repo to the Space

Use the **same path structure** as in the app (e.g. `images/...`) so existing paths still work.

### Option A: AWS CLI (S3-compatible)

1. Install [AWS CLI](https://aws.amazon.com/cli/) if needed.
2. Configure a profile for Spaces (no need to change default AWS config):

```bash
# One-time: set credentials (replace with your key/secret and region)
export AWS_ACCESS_KEY_ID="your-spaces-key"
export AWS_SECRET_ACCESS_KEY="your-spaces-secret"
export AWS_DEFAULT_REGION="us-east-1"
```

3. Sync `public/images` into the Space (replace `netiapps-media` and `nyc3` with your bucket and region):

```bash
cd /path/to/netiapps26
aws s3 sync public/images s3://netiapps-media/images \
  --endpoint-url https://nyc3.digitaloceanspaces.com \
  --acl public-read
```

4. If you have other folders under `public/` to move (e.g. fonts), sync them too:

```bash
aws s3 sync public/ s3://netiapps-media/ \
  --endpoint-url https://nyc3.digitaloceanspaces.com \
  --acl public-read
```

### Option B: DigitalOcean web UI

1. Open your Space → **Files**.
2. Create a folder `images`.
3. Upload the contents of `public/images` into `images/` (keep the same filenames/structure).

---

## Step 6: Set the base URL in your app

1. Copy the env example and add your CDN base URL (no trailing slash):

```bash
cp env.example .env.local
```

2. In `.env.local`:

```env
# Base URL for media (DigitalOcean Space CDN). Leave empty to use local /public.
NEXT_PUBLIC_MEDIA_BASE_URL=https://netiapps-media.nyc3.cdn.digitaloceanspaces.com
```

3. Restart the dev server (or redeploy). The app uses `getMediaUrl()` so all existing paths (e.g. `/images/logo.svg`) resolve to the Space when this is set.

---

## Step 7: Remove media from the repo (optional but recommended)

After confirming the site works with the Space:

1. Delete local media (they’re now on the Space):

```bash
# From repo root
rm -rf public/images/*
# Or remove only the heavy assets you uploaded; keep small SVGs in repo if you prefer.
```

2. Add a **.gitignore** entry so re-added media aren’t committed again:

```gitignore
# Optional: ignore re-added media if you serve everything from S3
# public/images/*.png
# public/images/*.mp4
# public/images/*.jpg
```

3. Commit the removal and push. The repo becomes lighter; clones and CI are faster.

---

## Step 8: Deploy / CI

- In your deployment (Vercel, DO App Platform, etc.), set the same variable:
  - `NEXT_PUBLIC_MEDIA_BASE_URL=https://<bucket>.<region>.cdn.digitaloceanspaces.com`
- No code change needed; the app already uses `getMediaUrl()`.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Create a Space (bucket) on DO, enable CDN. |
| 2 | Set Space/file listing to Public (or configure CORS if needed). |
| 3 | Create Spaces API key/secret for uploads. |
| 4 | Note CDN URL: `https://<bucket>.<region>.cdn.digitaloceanspaces.com`. |
| 5 | Upload `public/images` (and any other public assets) to the Space with the same paths. |
| 6 | Set `NEXT_PUBLIC_MEDIA_BASE_URL` in `.env.local` and redeploy. |
| 7 | Optionally remove media from the repo and add `.gitignore` entries. |
| 8 | Set `NEXT_PUBLIC_MEDIA_BASE_URL` in production env. |

**Latency:** Serving from the Space (especially with CDN) can reduce latency for users far from your app server because assets are cached at the edge. The app code stays the same; only the base URL and where files are stored change.
