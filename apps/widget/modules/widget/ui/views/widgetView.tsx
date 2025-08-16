"use client"

interface Props {
    organizationId: string;
}

import React from 'react'
import WidgetAuthScreen from '../screens/widgetAuthScreen';

const WidgetView = ({ organizationId }: Props) => {
  return (
    <main className='min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted'>
        <WidgetAuthScreen />
        {/* <WidgetFooter /> */}
    </main>
  )
}

export default WidgetView