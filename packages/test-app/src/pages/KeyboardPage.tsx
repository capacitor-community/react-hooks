import React, { useEffect } from 'react';
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
import { Capacitor } from '@capacitor/core';
import { useKeyboard } from '@capacitor-community/keyboard-react';

const KeyboardPage: React.FC = () => {
  const platform = Capacitor.getPlatform();
  const { isOpen, keyboardHeight, keyboard } = useKeyboard();

  useEffect(() => {
    keyboard.setAccessoryBarVisible({ isVisible: true });
  }, []);

  const handleOpenKeyboard = () => {
    keyboard.show();
  };
  const handleHideKeyboard = () => {
    keyboard.hide();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Keyboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>useKeyboard</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {/* <p>
              isAvailable on {platform}: {JSON.stringify(availableFeatures.getPhoto)}{' '}
            </p> */}
            {/* {availableFeatures.getPhoto && ( */}
            <div>
              <div>
                <IonButton onClick={handleOpenKeyboard}>Open Keyboard</IonButton>
                <IonButton onClick={handleHideKeyboard}>Hide Keyboard</IonButton>
              </div>
              <div>
                isOpen: {isOpen ? 'true' : 'false'}, keyboard height: {keyboardHeight}
              </div>
              <div>
                Input: <IonInput />
              </div>
            </div>
            {/* )} */}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default KeyboardPage;
