import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5db6551534e145df84820237ca328164',
  appName: 'PET Gyan - UPSSSC Notes',
  webDir: 'dist',
  server: {
    url: "https://5db65515-34e1-45df-8482-0237ca328164.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FF9500",
      showSpinner: false
    }
  }
};

export default config;