import React, { useState, useEffect } from 'react';
import { Redirect, Slot, useRouter } from 'expo-router';

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    if (!isAuthenticated && isMounted) {
      router.replace('/login');
    }
  }, [isAuthenticated, isMounted]);
  return <Slot />;
}