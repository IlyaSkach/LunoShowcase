# LUNO Shop - Credentials & Configuration

## Google Sheets Configuration

### Table ID
```
1rYsQHif3ediKIW2nNLwdDO_Q_Mw_KjNpXNRMBqQDQtQ
```

### Table URL
```
https://docs.google.com/spreadsheets/d/1rYsQHif3ediKIW2nNLwdDO_Q_Mw_KjNpXNRMBqQDQtQ/edit
```

### Service Account Email
```
luno-sheets-writer@inner-bot-475506-s0.iam.gserviceaccount.com
```

⚠️ **Важно:** Этот email должен иметь доступ "Editor" к таблице!

### JSON Credentials File Path
```
bot/credentials.json
```

---

## Google Cloud Project

### Project Name
```
Voice
```

### Project ID
```
inner-bot-475506-s0
```

### Project Number
```
706937364297
```

---

## Environment Variables (.env)

```env
# Telegram Bot
BOT_TOKEN=7773899730:AAHtTS07bnAE6jjQme0NEXlNxrMlxkYag0E
ADMIN_ID=271823315
MINI_APP_URL=https://lunosho.netlify.app/
PORT=3001

# Google Sheets
GOOGLE_SHEETS_ID=1rYsQHif3ediKIW2nNLwdDO_Q_Mw_KjNpXNRMBqQDQtQ
GOOGLE_SHEETS_CREDENTIALS_PATH=./credentials.json
```

---

## Instructions

### 1. Enable Google Sheets API
1. Go to: https://console.cloud.google.com/apis/library/sheets.googleapis.com?project=inner-bot-475506-s0
2. Click "Enable"

### 2. Create Service Account
1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=inner-bot-475506-s0
2. Click "Create Service Account"
3. Name: `luno-sheets-writer`
4. Click "Create and Continue"
5. Skip role assignment → "Done"

### 3. Create JSON Key
1. Open the created service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Select "JSON" → "Create"
5. Save the downloaded file as `bot/credentials.json`

### 4. Grant Access to Spreadsheet
1. Open the JSON file, find `client_email` (e.g., `luno-sheets-writer@inner-bot-475506-s0.iam.gserviceaccount.com`)
2. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1rYsQHif3ediKIW2nNLwdDO_Q_Mw_KjNpXNRMBqQDQtQ/edit
3. Click "Share" button
4. Paste the `client_email` address
5. Give "Editor" permissions
6. Click "Send"

---

## Security Notes

⚠️ **NEVER commit `credentials.json` to Git!**

The file `bot/credentials.json` is already in `.gitignore`.
