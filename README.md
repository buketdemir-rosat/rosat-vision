# Rosat Vision

React ve TypeScript ile hazırlanmış giriş ekranı. Form doğrulamaları, şifre göster/gizle, şifremi unuttum arayüzü, hareketli arka plan ve örnek rol bazlı panel yönlendirmesi içerir.

## Çalıştırma

```bash
npm install
npm run dev
```

## Örnek girişler

Bu girişler yalnızca arayüz demosu içindir; gerçek kimlik doğrulama değildir.

| E-posta | Rol | Şifre |
|---|---|---|
| `admin@rosatvision.com` | Yönetici | `Rosat123!` |
| `operator@rosatvision.com` | Operatör | `Rosat123!` |
| `viewer@rosatvision.com` | Kullanıcı | `Rosat123!` |

Gerçek kullanım öncesinde `src/auth.ts` içindeki örnek doğrulamayı güvenli sunucu tarafı kimlik doğrulama API'sine bağlayın. Şifre sıfırlama işlevi de bir sıfırlama servisine bağlanmalıdır.
