# Mobile App Setup Guide

## Features Implemented

### 1. PDF Download Tracking
- ✅ Track downloaded PDFs locally
- ✅ Show "Open PDF" instead of "Download" for already downloaded files
- ✅ Enhanced PDF viewer with share functionality
- ✅ Better user experience with download status indicators

### 2. Google AdMob Integration (Ready for Implementation)
- ✅ AdMob dependency added (`@capacitor-community/admob`)
- ✅ Ad banner components created and placed strategically
- ✅ Capacitor configuration updated for ads
- ✅ Placeholder ads shown in web version

## Mobile App Setup Instructions

### Prerequisites
1. Install Android Studio (for Android)
2. Install Xcode (for iOS - Mac only)
3. Have your project transferred to GitHub

### Setup Steps

1. **Transfer to GitHub**
   - Use the "Export to GitHub" button in Lovable
   - Clone the repository locally

2. **Install Dependencies**
   ```bash
   git pull
   npm install
   ```

3. **Add Mobile Platforms**
   ```bash
   # Add platforms
   npx cap add android
   npx cap add ios  # Mac only
   ```

4. **Build and Sync**
   ```bash
   npm run build
   npx cap sync
   ```

5. **Run on Device/Emulator**
   ```bash
   # For Android
   npx cap run android
   
   # For iOS (Mac only)
   npx cap run ios
   ```

## AdMob Setup (For Production)

### 1. Create AdMob Account
- Go to [Google AdMob](https://admob.google.com/)
- Create account and add your app
- Get your App ID and Ad Unit IDs

### 2. Update Configuration
Edit `src/components/AdBanner.tsx`:
```typescript
// Replace test ad ID with your real ad unit ID
adId = 'ca-app-pub-YOUR-PUBLISHER-ID/YOUR-AD-UNIT-ID'
```

Edit `capacitor.config.ts`:
```typescript
AdMob: {
  adMobTestDeviceIds: [], // Remove test device IDs for production
  tagForChildDirectedTreatment: false,
  tagForUnderAgeOfConsent: false,
  maxAdContentRating: "T"
}
```

### 3. Enable AdMob in Components
Update `src/components/AdBanner.tsx` to use real AdMob implementation:
- Uncomment the AdMob import
- Remove placeholder initialization
- Implement actual AdMob calls

## Key Features Added

### PDF Viewer Enhancements
- Smart download tracking
- "Open PDF" button for downloaded files
- Share functionality using native share API
- Better mobile user experience

### Ad Placement Strategy
- Top banners on main screens
- Bottom banners for navigation
- Center ads in content areas
- Non-intrusive placeholder in web version

### Mobile-Optimized Features
- Native file sharing
- Enhanced PDF viewing
- Better touch interactions
- Optimized for mobile screens

## Files Modified
- `src/components/PdfViewer.tsx` - New PDF viewer component
- `src/components/AdBanner.tsx` - Ad banner component
- `src/hooks/usePdfDownloadTracker.ts` - Download tracking
- `src/hooks/usePdfData.ts` - Enhanced PDF handling
- `src/components/TopicContent.tsx` - Updated with new components
- `src/pages/Index.tsx` - Added ad banners
- `capacitor.config.ts` - Mobile configuration

## Testing
- Web version shows placeholder ads
- PDF download tracking works in browser
- Mobile features will activate when built as native app

## Production Deployment
1. Replace test AdMob IDs with production IDs
2. Configure AdMob account properly
3. Test on actual devices
4. Submit to app stores

## Support
For any issues with mobile development, refer to:
- [Capacitor Documentation](https://capacitorjs.com/)
- [AdMob Capacitor Plugin](https://github.com/capacitor-community/admob)
- [Lovable Mobile Guide](https://lovable.dev/blogs/TODO)