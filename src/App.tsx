import { useEffect, useState, type FormEvent } from 'react'
import { authenticate, type UserRole } from './auth'
import './App.css'

const roleRoutes: Record<UserRole, string> = {
  admin: '/panels/admin',
  operator: '/panels/operator',
  viewer: '/panels/viewer',
}

const roleTitles: Record<UserRole, string> = {
  admin: 'Yönetici Paneli',
  operator: 'Operatör Paneli',
  viewer: 'Kullanıcı Paneli',
}

const routeRoles: Record<string, UserRole> = {
  '/panels/admin': 'admin',
  '/panels/operator': 'operator',
  '/panels/viewer': 'viewer',
}

function App() {
  const [pathname, setPathname] = useState(window.location.pathname)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [forgotOpen, setForgotOpen] = useState(false)
  const [forgotMessage, setForgotMessage] = useState('')

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', syncPathname)
    return () => window.removeEventListener('popstate', syncPathname)
  }, [])

  function navigate(path: string) {
    window.history.pushState({}, '', path)
    setPathname(path)
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoginError('')
    const user = authenticate(email.trim(), password)

    if (!user) {
      setLoginError('E-posta veya şifre hatalı.')
      return
    }

    navigate(roleRoutes[user.role])
  }

  function handleForgotPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setForgotMessage('Şifre sıfırlama servisi henüz bağlı değil.')
  }

  function handleLogout() {
    setPassword('')
    navigate('/')
  }

  const activeRole = routeRoles[pathname]

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="background-grid" aria-hidden="true" />

      <section className="auth-card" aria-label="Rosat Vision giriş">
        <div className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <path d="M7 25.5 24 8l17 17.5L24 42 7 25.5Z" />
            <path d="M15 25.5 24 16l9 9.5L24 35l-9-9.5Z" />
            <circle cx="24" cy="25.5" r="3.5" />
          </svg>
        </div>

        {activeRole ? (
          <div className="panel-view">
            <p className="eyebrow">ROSAT VISION</p>
            <h1>{roleTitles[activeRole]}</h1>
            <button className="submit-button logout-button" onClick={handleLogout} type="button">
              <span>Çıkış yap</span>
              <span className="button-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        ) : (
          <>
            <header className="card-heading">
              <p className="eyebrow">ROSAT VISION</p>
              <h1>Giriş yap</h1>
            </header>

            <form className="login-form" onSubmit={handleLogin}>
              <label className="field-label" htmlFor="email">E-posta</label>
              <div className="input-wrap">
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3.5" y="5" width="17" height="14" rx="3" />
                  <path d="m5 7 7 5.5L19 7" />
                </svg>
                <input
                  autoComplete="username"
                  id="email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="ornek@rosatvision.com"
                  required
                  type="email"
                  value={email}
                />
              </div>

              <div className="password-heading">
                <label className="field-label" htmlFor="password">Şifre</label>
              </div>
              <div className="input-wrap">
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="4.5" y="10" width="15" height="10" rx="2.5" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v2" />
                </svg>
                <input
                  autoComplete="current-password"
                  id="password"
                  minLength={8}
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Şifrenizi girin"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                />
                <button
                  aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  aria-pressed={showPassword}
                  className="visibility-button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  type="button"
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                      <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5.5 0 9 7 9 7a15 15 0 0 1-3.1 3.8M6.2 6.2C3.9 7.8 3 12 3 12s3.5 7 9 7a9.8 9.8 0 0 0 3-.5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {loginError && <p className="form-message error-message" role="alert">{loginError}</p>}

              <button className="submit-button" type="submit">
                <span>Giriş yap</span>
                <span className="button-arrow" aria-hidden="true">↗</span>
              </button>
              <div className="forgot-link-row">
                <button
                  className="text-button"
                  onClick={() => {
                    setForgotMessage('')
                    setForgotOpen(true)
                  }}
                  type="button"
                >
                  Şifremi unuttum
                </button>
              </div>
            </form>
          </>
        )}
      </section>

      {forgotOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setForgotOpen(false)
        }}>
          <section aria-labelledby="forgot-title" aria-modal="true" className="forgot-modal" role="dialog">
            <button
              aria-label="Kapat"
              className="modal-close"
              onClick={() => setForgotOpen(false)}
              type="button"
            >
              ×
            </button>
            <p className="eyebrow">ROSAT VISION</p>
            <h2 id="forgot-title">Şifremi unuttum</h2>
            <form className="login-form" onSubmit={handleForgotPassword}>
              <label className="field-label" htmlFor="reset-email">E-posta</label>
              <div className="input-wrap">
                <input
                  autoComplete="email"
                  id="reset-email"
                  onChange={() => setForgotMessage('')}
                  placeholder="ornek@rosatvision.com"
                  required
                  type="email"
                />
              </div>
              {forgotMessage && <p className="form-message" role="status">{forgotMessage}</p>}
              <button className="submit-button" type="submit">
                <span>Devam et</span>
                <span className="button-arrow" aria-hidden="true">↗</span>
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
