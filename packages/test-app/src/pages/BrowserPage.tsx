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
  IonButton,
  IonInput,
} from '@ionic/react';

import { useClose, useOpen, availableFeatures } from '@capacitor-community/browser-react';

const BrowserPage: React.FC = () => {
  const platform = Capacitor.getPlatform();
  const { close } = useClose();
  const { open } = useOpen();
  const [openUrlText, setOpenUrlText] = useState('https://www.ionicframework.com');

  const handleClose = () => {
    if (availableFeatures.close) {
      close();
    }
  };

  const handleOpen = () => {
    if (availableFeatures.open) {
      open({
        url: openUrlText,
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Browser</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>useClose</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              isAvailable on {platform}: {JSON.stringify(availableFeatures.close)}{' '}
            </p>
            {availableFeatures.close && <IonButton onClick={handleClose}>Close</IonButton>}
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>useOpen</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              isAvailable on {platform}: {JSON.stringify(availableFeatures.open)}{' '}
            </p>
            {availableFeatures.open && (
              <div>
                <div>
                  <IonInput
                    value={openUrlText}
                    onIonChange={(e) => setOpenUrlText(e.detail.value!)}
                  />
                </div>
                <div>
                  <IonButton onClick={handleOpen}>Open</IonButton>
                </div>
              </div>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default BrowserPage;
