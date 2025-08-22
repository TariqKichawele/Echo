'use client'

import React from 'react'
import WidgetHeader from '../components/widgetHeader'
import { Button } from '@workspace/ui/components/button'
import { ArrowLeftIcon, MenuIcon } from 'lucide-react'
import { 
    conversationIdAtom, 
    contactSessionIdAtomFamily, 
    organizationIdAtom, 
    screenAtom,
} from '../../atoms/widget-atoms'
import { useAtomValue, useSetAtom } from 'jotai'
import { api } from '@workspace/backend/_generated/api'
import { useQuery } from 'convex/react'

const WidgetChatScreen = () => {

    const setScreen = useSetAtom(screenAtom);
    const setConversationId = useSetAtom(conversationIdAtom);
    const conversationId = useAtomValue(conversationIdAtom);
    const organizationId = useAtomValue(organizationIdAtom);
    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId || ""));

    const conversation = useQuery(api.public.conversations.getOne, 
        conversationId && contactSessionId ? {
            conversationId,
            contactSessionId,
        } : "skip",
    );

    const handleBack = () => {
        setConversationId(null);
        setScreen("selection");
    }

  return (
    <>
        <WidgetHeader className="flex items-center justify-between">
            <div className='flex items-center gap-x-2'>
                <Button
                    size='icon'
                    variant={'transparent'}
                    onClick={handleBack}
                >
                    <ArrowLeftIcon className='size-4' />
                </Button>
                <p className='font-semibold'>Chat</p>
            </div>
            <Button
                size='icon'
                variant={'transparent'}
            >
                <MenuIcon />
            </Button>
        </WidgetHeader>
        <div className="flex flex-1 flex-col gap-y-4 p-4 overflow-y-auto">
           {JSON.stringify(conversation)}
        </div>
    </>
  )
}

export default WidgetChatScreen