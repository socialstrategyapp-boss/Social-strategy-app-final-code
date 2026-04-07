# Mobile App Scaffold — Expo / React Native

## ⚠️ STATUS: SAVED ONLY — DO NOT IMPLEMENT YET

This folder contains the Expo React Native mobile app scaffold.
It is **saved for future reference only** and must not be built, deployed, or run
until explicit approval is given.

---

## Stack (When Implemented)

- **Framework**: Expo (React Native)
- **Navigation**: React Navigation v7 (bottom tabs + stack)
- **State**: Zustand
- **Styling**: NativeWind (Tailwind for React Native)
- **API**: Shared REST API (same Hono backend)
- **Auth**: Supabase Auth (token-based)
- **Storage**: Expo SecureStore (tokens), AsyncStorage (cache)

---

## Planned Features (When Implemented)

- [ ] Dashboard (KPIs, recent posts, quick actions)
- [ ] Content Studio (generate captions, images, hashtags)
- [ ] Scheduler (view/manage posting calendar)
- [ ] Analytics (engagement charts per platform)
- [ ] Characters (manage brand characters)
- [ ] Settings (profile, plan, notifications)
- [ ] Push notifications for scheduled post status
- [ ] Camera integration for asset upload
- [ ] Offline mode for viewing/editing drafts

---

## Folder Structure

```
apps/mobile/
├── App.tsx              # Entry point
├── app.json             # Expo config
├── package.json         # Dependencies (NOT installed yet)
├── assets/              # Icons, splash screen
└── src/
    ├── components/      # Shared UI components
    ├── navigation/      # Bottom tab + stack navigators
    └── screens/         # Screen components (Dashboard, Content, etc.)
```

---

## Build Order (When Approved)

1. Auth screens (login, register, forgot password)
2. Navigation shell (bottom tabs)
3. Dashboard screen
4. Content Studio screen
5. Scheduler screen
6. Analytics screen
7. Settings screen
8. Push notification integration
9. Camera / media upload
10. App Store / Play Store submission

---

## Do Not Proceed Until

- [ ] Web app fully launched and stable
- [ ] API v1 endpoints locked
- [ ] Design system finalized
- [ ] User approval given
