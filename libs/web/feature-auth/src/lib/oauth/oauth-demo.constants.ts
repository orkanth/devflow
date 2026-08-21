import { OAuthProvider } from '@devflow/shared-types';

export interface OAuthDemoProviderInfo {
  provider: OAuthProvider;
  brandLabel: string;
  headline: string;
  demoUserName: string;
  demoUserEmail: string;
  demoUserRole: string;
  accentColor: string;
}

export const OAUTH_DEMO_PROVIDERS: Record<OAuthProvider, OAuthDemoProviderInfo> = {
  google: {
    provider: 'google',
    brandLabel: 'Google',
    headline: 'Sign in with Google',
    demoUserName: 'Alex Rivera',
    demoUserEmail: 'alex@devflow.dev',
    demoUserRole: 'Admin',
    accentColor: '#4285f4',
  },
  microsoft: {
    provider: 'microsoft',
    brandLabel: 'Microsoft',
    headline: 'Sign in with Microsoft',
    demoUserName: 'Sarah Chen',
    demoUserEmail: 'sarah@devflow.dev',
    demoUserRole: 'Member',
    accentColor: '#0078d4',
  },
};
