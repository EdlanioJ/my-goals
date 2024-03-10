import '@/libs/dayjs'
import '@/styles/global.css'

import { Slot } from 'expo-router'
import { useCallback } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import { SQLiteProvider } from 'expo-sqlite/next'
import * as SplashScreen from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  useFonts,
  OpenSans_700Bold,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from '@expo-google-fonts/open-sans'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { dbInit } from '@/db/init'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/libs/query-client'

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [isFontsLoaded] = useFonts({
    OpenSans_600SemiBold,
    OpenSans_400Regular,
    OpenSans_700Bold,
  })

  const onLayoutRootView = useCallback(async () => {
    if (isFontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [isFontsLoaded])

  if (!isFontsLoaded) return null

  return (
    <SafeAreaView onLayout={onLayoutRootView} className="flex-1 bg-gray-600">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <SQLiteProvider databaseName="my_goal.db" onInit={dbInit}>
          <QueryClientProvider client={queryClient}>
            <BottomSheetModalProvider>
              <Slot />
            </BottomSheetModalProvider>
          </QueryClientProvider>
        </SQLiteProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}
