import { Redirect } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Index() {
  const { currentUser } = useSelector((state: any) => state.user);
  console.log("currentUser", currentUser);

  if (currentUser) {
    return <Redirect href="/welcome" />;
  }

  return <Redirect href="/welcome" />;
}
