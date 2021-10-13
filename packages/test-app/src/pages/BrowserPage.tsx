// import React, { useState } from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonInput } from '@ionic/react';
// import { usePlatform } from '@ionic/react-hooks/platform';
// import { useClose, useOpen, usePrefetch, availableFeatures } from '@ionic/react-hooks/browser';

// const BrowserPage: React.FC = () => {
//   const { platform } = usePlatform();
//   const { close } = useClose();
//   const { open } = useOpen();
//   const { prefetch } = usePrefetch();
//   const [openUrlText, setOpenUrlText] = useState('https://www.ionicframework.com');
//   const [prefetchUrl, setPrefetchUrl] = useState('https://www.ionicframework.com');

//   const handleClose = () => {
//     if(availableFeatures.close) {
//       close();
//     }
//   };

//   const handleOpen = () => {
//     if(availableFeatures.open) {
//       open({
//         url: openUrlText
//       });
//     }
//   };

//   const handlePrefetch = () => {
//     if(availableFeatures.prefetch) {
//       prefetch({
//         urls: [prefetchUrl]
//       });
//     }
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>Browser</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useClose
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.close)} </p>
//             {availableFeatures.close && (
//               <IonButton onClick={handleClose}>Close</IonButton>
//             )}
//           </IonCardContent>
//         </IonCard>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useOpen
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.open)} </p>
//             {availableFeatures.open && (
//               <div>
//                 <div><IonInput value={openUrlText} onIonChange={e => setOpenUrlText(e.detail.value!)} /></div>
//                 <div><IonButton onClick={handleOpen}>Open</IonButton></div>
//               </div>

//             )}
//           </IonCardContent>
//         </IonCard>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               usePrefetch
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.prefetch)} </p>
//             {availableFeatures.prefetch && (
//               <div>
//                 <div><IonInput value={prefetchUrl} onIonChange={e => setPrefetchUrl(e.detail.value!)} /></div>
//                 <div><IonButton onClick={handlePrefetch}>Prefetch</IonButton></div>
//               </div>

//             )}
//           </IonCardContent>
//         </IonCard>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default BrowserPage;
export default {};
