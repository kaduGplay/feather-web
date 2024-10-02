'use client'

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

const CrispChat = () => {
  useEffect(() => {
    console.log(1);
    
    Crisp.configure("cfc99ca0-c74c-4807-86d2-084e3abef98f");
  });

  return null;
}

export default CrispChat;