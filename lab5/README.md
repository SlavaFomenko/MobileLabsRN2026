# Lab5 — ShopApp: Expo Router навігація

**Лабораторна робота №5** — Побудова навігації у React Native із використанням Expo Router.

---

## Структура проекту

```
lab5/
├── app/
│   ├── _layout.jsx              # Кореневий layout + AuthProvider
│   ├── index.jsx                # Redirect → /login
│   ├── +not-found.jsx           # 404 екран
│   ├── (auth)/                  # Публічна група маршрутів
│   │   ├── _layout.jsx
│   │   ├── login.jsx            # Екран входу
│   │   └── register.jsx         # Екран реєстрації
│   └── (app)/                   # Захищена група маршрутів
│       ├── _layout.jsx          # Перевірка isAuthenticated
│       ├── index.jsx            # Каталог товарів
│       └── details/
│           └── [id].jsx         # Деталі товару (динамічний маршрут)
├── context/
│   └── AuthContext.jsx          # Глобальний контекст авторизації
├── data/
│   └── products.js              # Масив тестових даних (8 товарів)
├── app.json
├── babel.config.js
└── package.json
```

---

## Інструкція запуску

```bash

npm install

npx expo start

```

---

## Реалізований функціонал

| Пункт | Опис |
|---|---|
| File-based routing | Структура `/app` є маніфестом навігації |
| AuthContext | `isAuthenticated`, `user`, `login()`, `register()`, `logout()` |
| Група `(auth)` | Публічні екрани: Login, Register |
| Група `(app)` | Захищені екрани з перевіркою `isAuthenticated` |
| Redirect | Неавторизований → `/login` |
| Каталог | `FlatList` з 8 товарами, пошук, картки з фото/ціною |
| Деталі | Динамічний маршрут `details/[id]`, `useLocalSearchParams` |
| Not Found | `+not-found.jsx` з поверненням на головну |

---

## Скриншоти

### Логін
![Логін](./screenshots/1.png)

### Каталог
![Каталог](./screenshots/2.png)

### Регістер
![Регістер](./screenshots/3.png)

### Дітейлс
![Дітейлс](./screenshots/3.png)