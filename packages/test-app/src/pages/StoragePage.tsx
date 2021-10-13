// import React, { useState } from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonButton } from '@ionic/react';
// import { usePlatform } from '@ionic/react-hooks/platform';
// import { useStorage, useStorageItem, availableFeatures } from '@ionic/react-hooks/storage';

// const StoragePage: React.FC = () => {
//   const { platform } = usePlatform();

//   const { get, set, remove, getKeys, clear } = useStorage();
//   const [keyText, setKeyText] = useState('')
//   const [valueText, setValueText] = useState('')
//   const [itemValueText, setItemValueText] = useState('')
//   const [keys, setKeys] = useState<string[]>([]);
//   const [storageValue, setStorageValue] = useState('');
//   const [data, setData] = useStorageItem('name');

//   const handleSet = () => {
//     if (availableFeatures.useStorage) {
//       set(keyText, valueText);
//     }
//   }

//   const handleGet = async () => {
//     if (availableFeatures.useStorage) {
//       const value = await get(keyText);
//       setStorageValue(value || '');
//     }
//   }

//   const handleRemove = () => {
//     if (availableFeatures.useStorage) {
//       remove(keyText);
//     }
//   }

//   const handleClear = () => {
//     if (availableFeatures.useStorage) {
//       clear();
//     }
//   }

//   const handleGetKeys = () => {
//     if (availableFeatures.useStorage) {
//       if(availableFeatures.useStorage) {
//         getKeys().then(result => setKeys(result.keys));
//       }
//     }
//   }

//   const handleSetItem = () => {
//     if (availableFeatures.useStorage) {
//       setData(itemValueText)
//     }
//   }

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>Storage</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useStorage
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.useStorage)} </p>
//             {availableFeatures.useStorage && (
//               <>
//                 <p>Key: <IonInput value={keyText} onIonChange={e => setKeyText(e.detail.value!)} /></p>
//                 <p>Value: <IonInput value={valueText} onIonChange={e => setValueText(e.detail.value!)} /></p>
//                 <p>
//                   <IonButton onClick={handleSet}>Set</IonButton>
//                   <IonButton onClick={handleGet}>Get</IonButton>
//                   <IonButton onClick={handleRemove}>Remove</IonButton>
//                   <IonButton onClick={handleClear}>Clear</IonButton>
//                   <IonButton onClick={handleGetKeys}>Get Keys</IonButton>
//                 </p>
//                 <p>Value: {storageValue}</p>
//                 <p>Keys: {keys.map(k => `${k}, `)}</p>
//               </>
//             )}
//           </IonCardContent>
//         </IonCard>
//         <IonCard>
//           <IonCardHeader>
//             <IonCardTitle>
//               useStorageItem
//             </IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>isAvailable on {platform}: {JSON.stringify(availableFeatures.useStorage)} </p>
//             {availableFeatures.useStorage && (
//               <>
//                 <p>Key: name</p>
//                 <p>Value: <IonInput value={itemValueText} onIonChange={e => setItemValueText(e.detail.value!)} /></p>
//                 <p>
//                   <IonButton onClick={handleSetItem}>Set</IonButton>
//                 </p>
//                 <p>Value: {data}</p>
//               </>
//             )}
//           </IonCardContent>
//         </IonCard>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default StoragePage;
export default {};
