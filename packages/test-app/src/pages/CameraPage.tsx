// import React from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
// import { CameraResultType } from '@capacitor/core';
// import { usePlatform } from '@ionic/react-hooks/platform';
// import { useCamera, availableFeatures } from '@ionic/react-hooks/camera';

// const CameraPage: React.FC = () => {
//   const { platform } = usePlatform();
//   const { photo, getPhoto } = useCamera();

//   const handleTakePhoto = () => {
//     if (availableFeatures.getPhoto) {
//       getPhoto({
//         quality: 100,
//         allowEditing: false,
//         resultType: CameraResultType.DataUrl
//       })
//     }
//   }

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>Camera</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useCamera
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.getPhoto)} </p>
//             {availableFeatures.getPhoto && (
//               <div>
//                 <div><IonButton onClick={handleTakePhoto}>Take Photo</IonButton></div>
//                 <div>{photo && <img alt="" src={photo.dataUrl} />}</div>
//               </div>
//             )}
//           </IonCardContent>
//         </IonCard>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default CameraPage;
export default {};
