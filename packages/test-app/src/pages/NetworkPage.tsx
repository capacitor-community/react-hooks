// import React from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
// import { usePlatform } from '@ionic/react-hooks/platform';
// import { useStatus, availableFeatures } from '@ionic/react-hooks/network';

// const NetworkPage: React.FC = () => {
//   const { platform } = usePlatform();
//   const { networkStatus } = useStatus();

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>Network</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useStatus
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.getStatus)} </p>
//             {availableFeatures.getStatus && (
//               <>
//                 <p>Network status:</p>
//                 <p>{JSON.stringify(networkStatus)}</p>
//               </>
//             )}
//           </IonCardContent>
//         </IonCard>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default NetworkPage;
export default {};
