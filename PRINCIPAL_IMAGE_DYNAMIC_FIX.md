# Principal Image Dynamic Fix

Updated project behavior:

- Homepage principal image now comes from Teacher Info.
- About page principal image now comes from Teacher Info.
- Principal name/designation also comes from matched teacher record.
- Matching priority:
  1. Teacher name matches institution `principal_name`
  2. Teacher designation contains `প্রধান শিক্ষক`
  3. Teacher designation contains `অধ্যক্ষ`
  4. Teacher designation contains `Head Teacher`
  5. Teacher designation contains `Principal`
- Fallback image uses DiceBear initials if teacher photo URL is missing or broken.

Changed files:

- `src/data.ts`
  - Added `getPrincipalTeacher()` helper.
- `src/components/PublicHome.tsx`
  - Principal card now uses teacher photo/name/designation dynamically.
- `src/App.tsx`
  - About page principal message section now uses teacher photo/name/designation dynamically.

How to test:

1. Run project:

```powershell
npm install
npm run dev
```

2. Open admin panel in browser:

```text
http://localhost:3000/
```

3. Go to admin/teacher section and update teacher record where designation is `প্রধান শিক্ষক`.

4. Change `photo_url` to an online image URL or local public path such as:

```text
/principal.jpg
```

5. For local public image, place file here:

```text
public/principal.jpg
```

6. Refresh homepage.

If old image still shows, clear browser localStorage:

```js
localStorage.clear();
location.reload();
```
