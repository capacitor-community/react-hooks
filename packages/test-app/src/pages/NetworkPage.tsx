import React from 'react';
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
} from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { useStatus, availableFeatures } from '@capacitor-community/network-react';

const NetworkPage: React.FC = () => {
  const platform = Capacitor.getPlatform();
  const { networkStatus } = useStatus();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Network</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>useStatus</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              isAvailable on {platform}: {JSON.stringify(availableFeatures.getStatus)}{' '}
            </p>
            {availableFeatures.getStatus && (
              <>
                <p>Network status:</p>
                <p>{JSON.stringify(networkStatus)}</p>
              </>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default NetworkPage;
