// import React from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
// import { usePlatform } from '@ionic/react-hooks/platform';
// import { useGetInfo, useGetLanguageCode, availableFeatures } from '@ionic/react-hooks/device';

// const DevicePage: React.FC = () => {
//   const { platform } = usePlatform();
//   const { info } = useGetInfo();
//   const { languageCode } = useGetLanguageCode();

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>Device</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useGetInfo
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.getInfo)} </p>
//             {availableFeatures.getInfo && (
//               <>
//                 <p>Device info:</p>
//                 <p>{JSON.stringify(info)} </p>
//               </>
//             )}
//           </IonCardContent>
//         </IonCard>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useGetLanguageCode
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.getLanguageCode)} </p>
//             {availableFeatures.getLanguageCode && (
//               <>
//                 <p>Language Code:</p>
//                 <p>{languageCode}</p>
//               </>
//             )}
//           </IonCardContent>
//         </IonCard>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default DevicePage;
export default {};
