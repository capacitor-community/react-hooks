import React, { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
} from '@ionic/react';
// import { usePlatform } from '@ionic/react-hooks/platform';
import {
  useIsScreenReaderEnabled,
  availableFeatures,
  useSpeak,
} from '@capacitor-community/screen-reader-react';

const ScreenReaderPage: React.FC = () => {
  // const { platform } = usePlatform();
  const platform = Capacitor.getPlatform();

  const { speak } = useSpeak();
  const { isScreenReaderEnabled } = useIsScreenReaderEnabled();
  const [textToSpeak, setTextToSpeak] = useState('');

  const handleSpeak = () => {
    if (availableFeatures.speak) {
      speak({ value: textToSpeak });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Accessibility</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>useIsScreenReaderEnabled</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              isAvailable on {platform}: {JSON.stringify(availableFeatures.isScreenReaderAvailable)}{' '}
            </p>
            {availableFeatures.isScreenReaderAvailable && (
              <p>isScreenReaderEnabled: {JSON.stringify(isScreenReaderEnabled)}</p>
            )}
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>useSpeak</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              isAvailable on {platform}: {JSON.stringify(availableFeatures.speak)}{' '}
            </p>
            {availableFeatures.speak && (
              <div>
                <div>
                  <IonInput
                    value={textToSpeak}
                    onIonChange={(e) => setTextToSpeak(e.detail.value!)}
                    placeholder="Enter text to speak"
                  />
                </div>
                <div>
                  <IonButton onClick={handleSpeak}>Speak</IonButton>
                </div>
              </div>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ScreenReaderPage;
