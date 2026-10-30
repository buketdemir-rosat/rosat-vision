export type UserRole = 'admin' | 'operator' | 'viewer'

type AuthenticatedUser = {
  email: string
  role: UserRole
}

const demoUsers: Record<string, AuthenticatedUser> = {
  'admin@rosatvision.com': { email: 'admin@rosatvision.com', role: 'admin' },
  'operator@rosatvision.com': { email: 'operator@rosatvision.com', role: 'operator' },
  'viewer@rosatvision.com': { email: 'viewer@rosatvision.com', role: 'viewer' },
}

const demoPassword = 'Rosat123!'

export function authenticate(email: string, password: string): AuthenticatedUser | null {
  const user = demoUsers[email.toLowerCase()]
  return user && password === demoPassword ? user : null
}
