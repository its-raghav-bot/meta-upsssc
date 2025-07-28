import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5db6551534e145df84820237ca328164',
  appName: 'PET Gyan - UPSSSC Notes',
  webDir: 'dist',
  server: {
    url: "https://5db65515-34e1-45df-8482-0237ca328164.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  android: {
    minWebViewVersion: 88,
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FF9500",
      showSpinner: false,
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    },
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#FF9500"
    }
  }
};

export default config;