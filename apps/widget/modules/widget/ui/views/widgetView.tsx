"use client"

interface Props {
  organizationId: string;
}

import React from 'react'
import { useAtomValue } from 'jotai';
import WidgetAuthScreen from '../screens/widgetAuthScreen';
import { screenAtom } from '@/modules/widget/atoms/widget-atoms';
import WidgetErrorScreen from '../screens/widgetErrorScreen';
import WidgetLoadingScreen from '../screens/widgetLoadingScreen';
import WidgetSelectionScreen from '../screens/widgetSelectionScreen';
import WidgetChatScreen from '../screens/widgetChatScreen';

const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <WidgetErrorScreen />,
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    selection: <WidgetSelectionScreen />,
    voice: <p>TODO: Voice Screen</p>,
    auth: <WidgetAuthScreen />,
    inbox: <p>TODO: Inbox Screen</p>,
    chat: <WidgetChatScreen />,
    contact: <p>TODO: Contact Screen</p>,
  }

  return (
    <main className='min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted'>
      {screenComponents[screen]}
      {/* <WidgetFooter /> */}
    </main>
  )
}

export default WidgetView