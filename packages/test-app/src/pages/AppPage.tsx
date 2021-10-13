// import React from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
// import { usePlatform } from '@ionic/react-hooks/platform';
// import { useAppState, useAppUrlOpen, useLaunchUrl, availableFeatures } from '@ionic/react-hooks/app';

// const AppPage: React.FC = () => {
//   const { platform } = usePlatform();
//   const { state } = useAppState();
//   const { appUrlOpen } = useAppUrlOpen();
//   const { launchUrl } = useLaunchUrl();

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>App</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useAppState
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.appState)} </p>
//             <p>state: {JSON.stringify(state)}</p>
//           </IonCardContent>
//         </IonCard>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useAppUrlOpen
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.appUrlOpen)} </p>
//             {availableFeatures.appUrlOpen && (
//               <p>appUrlOpen: {appUrlOpen}</p>
//             )}
//             {availableFeatures.getLaunchUrl && (
//               <p>launchUrl: {launchUrl}</p>
//             )}
//           </IonCardContent>
//         </IonCard>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useLaunchUrl
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.getLaunchUrl)} </p>
//             {availableFeatures.getLaunchUrl && (
//               <p>launchUrl: {launchUrl}</p>
//             )}
//           </IonCardContent>
//         </IonCard>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default AppPage;
export default {};
