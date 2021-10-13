// import React from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
// import { usePlatform } from '@ionic/react-hooks/platform';
// import { useCurrentPosition, useWatchPosition, availableFeatures } from '@ionic/react-hooks/geolocation';

// const GeolocationPage: React.FC = () => {
//   const { platform } = usePlatform();
//   const { error, currentPosition, getPosition } = useCurrentPosition();
//   const { currentPosition: watchPosition, startWatch, clearWatch} = useWatchPosition();

//   const handleRefreshPosition = () => {
//     if(availableFeatures.getCurrentPosition) {
//       getPosition();
//     }
//   }

//   console.log(error, currentPosition);

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>Geolocation</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useCurrentPosition
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.getCurrentPosition)}</p>
//             {availableFeatures.getCurrentPosition && (
//               <>
//                 <p>Current Position</p>
//                 <p>Lat: {currentPosition && currentPosition.coords.latitude}</p>
//                 <p>Lon: {currentPosition && currentPosition.coords.longitude}</p>
//                 <p>
//                   <IonButton onClick={handleRefreshPosition}>Refresh Current Position</IonButton>
//                 </p>
//               </>
//             )}
//           </IonCardContent>
//         </IonCard>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useWatchPosition
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.watchPosition)}</p>
//             {availableFeatures.watchPosition && (
//               <>
//                 <p>Current Position</p>
//                 <p>Lat: {watchPosition && watchPosition.coords.latitude}</p>
//                 <p>Lon: {watchPosition && watchPosition.coords.longitude}</p>
//                 <p><IonButton onClick={() => startWatch()}>Start watching location</IonButton></p>
//                 <p><IonButton onClick={() => clearWatch()}>Stop watching location</IonButton></p>
//               </>
//             )}
//           </IonCardContent>
//         </IonCard>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default GeolocationPage;
export default {};
