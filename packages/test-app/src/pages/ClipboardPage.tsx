// import React, { useState } from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonButton } from '@ionic/react';
// import { usePlatform } from '@ionic/react-hooks/platform';
// import { useClipboard, availableFeatures } from '@ionic/react-hooks/clipboard';

// const ClipboardPage: React.FC = () => {
//   const { platform } = usePlatform();
//   const { value, getValue, setValue } = useClipboard();
//   const [inputText, setInputText] = useState('Text to copy');

//   const handleCopy = () => {
//     if (availableFeatures.useClipboard) {
//       setValue(inputText);
//     }
//   }

//   const handlePaste = () => {
//     if (availableFeatures.useClipboard) {
//       getValue();
//     }
//   }

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>Clipboard</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useClipboard
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.useClipboard)} </p>
//             {availableFeatures.useClipboard && (
//               <>
//                 <p>
//                   <IonInput value={inputText} onIonChange={e => setInputText(e.detail.value!)} />
//                 </p>
//                 <p>
//                   <IonButton onClick={handleCopy}>Copy Input Text</IonButton>
//                 </p>
//                 <p>
//                   <IonButton onClick={handlePaste}>Paste Text into Div</IonButton>
//                 </p>
//                 <p>
//                   {value}
//                 </p>
//               </>
//             )}
//           </IonCardContent>
//         </IonCard>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default ClipboardPage;
export default {};
