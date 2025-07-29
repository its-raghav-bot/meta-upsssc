import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Card } from '@/components/ui/card';

interface AdBannerProps {
  adId?: string;
  position?: 'top' | 'bottom' | 'center';
  className?: string;
}

export const AdBanner = ({ 
  adId = 'ca-app-pub-3940256099942544/6300978111', // Test ad unit ID
  position = 'bottom',
  className = ''
}: AdBannerProps) => {
  const [isAdReady, setIsAdReady] = useState(false);
  const [adError, setAdError] = useState<string>('');

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      initializeAds();
    }
    
    return () => {
      if (Capacitor.isNativePlatform()) {
        hideBanner();
      }
    };
  }, []);

  const initializeAds = async () => {
    try {
      // AdMob integration will be implemented when needed
      // For now, just set as ready for future implementation
      console.log('AdMob initialization placeholder');
      setIsAdReady(true);
    } catch (error) {
      console.error('Error initializing ads:', error);
      setAdError('Ad initialization failed');
    }
  };

  const hideBanner = async () => {
    try {
      console.log('Hide banner placeholder');
    } catch (error) {
      console.error('Error hiding banner:', error);
    }
  };

  // For web, show a placeholder
  if (!Capacitor.isNativePlatform()) {
    return (
      <Card className={`p-4 bg-muted/50 border-dashed ${className}`}>
        <div className="text-center text-sm text-muted-foreground">
          📱 विज्ञापन (केवल मोबाइल ऐप में दिखेगा)
        </div>
      </Card>
    );
  }

  // On native platforms, return empty div as ads are shown by the native layer
  return (
    <div 
      className={`ad-banner-container ${className}`}
      style={{
        height: position === 'center' ? '50px' : '0px',
        margin: position === 'center' ? '8px 0' : '0',
      }}
    >
      {adError && (
        <div className="text-xs text-destructive text-center p-2">
          {adError}
        </div>
      )}
    </div>
  );
};