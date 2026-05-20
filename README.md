# EVgo UI App

Expo Router mobile UI recreation for the EVgo screens from the provided PDF.

## Stack

- Expo
- Expo Router
- React Native
- JavaScript / JSX
- React Native `StyleSheet`
- Axios service layer
- Context API state management

## Run

```bash
npm install
npm run start
```

Open the main app at `/`.

The splash / landing screen is available at `/splash`.

## Project Structure

```text
app/
  _layout.jsx
  login.jsx
  register.jsx
  record.jsx
  income.jsx
  splash.jsx
  (tabs)/
    _layout.jsx
    index.jsx
    equipment.jsx
    recharge.jsx
    payment.jsx
    withdraw.jsx
    team.jsx
    profile.jsx
    support.jsx
components/
  evgo/
    BrandArt.jsx
    Button.jsx
    Card.jsx
    Header.jsx
    HomeHero.jsx
    ListItem.jsx
constants/
  colors.js
context/
  AppContext.js
services/
  api.js
  authService.js
  userService.js
  transactionService.js
  mockData.js
```

## Backend Integration

API calls are centralized in `services/` and currently point to `https://api.example.com/`.
Replace `API_BASE_URL` in `services/api.js` with the real backend URL.
