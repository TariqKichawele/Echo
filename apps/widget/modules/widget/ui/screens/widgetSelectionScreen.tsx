'use client'

import React, { useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import WidgetHeader from '../components/widgetHeader'
import { ChevronRightIcon, MessageSquareTextIcon } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { 
    contactSessionIdAtomFamily, 
    conversationIdAtom, 
    errorMessageAtom, 
    organizationIdAtom, 
    screenAtom 
} from '@/modules/widget/atoms/widget-atoms'
import { useMutation } from 'convex/react'
import { api } from '@workspace/backend/_generated/api'

const WidgetSelectionScreen = () => {
    const setScreen = useSetAtom(screenAtom);
    const setErrorMessage = useSetAtom(errorMessageAtom);
    const setConversationId = useSetAtom(conversationIdAtom);
    const organizationId = useAtomValue(organizationIdAtom);
    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId || ""));

    const createConversation = useMutation(api.public.conversations.create);
    const [isPending, setIsPending] = useState(false);

    const handleNewConversation = async () => {


        if (!organizationId) {
            setScreen("error");
            setErrorMessage("Missing Organization ID");
            return;
        }

        if (!contactSessionId) {
            setScreen("auth");
            return;
        }

        setIsPending(true);

        try {
            const conversationId = await createConversation({
                contactSessionId,
                organizationId,
            });

            setConversationId(conversationId);
            setScreen("chat");
        } catch (error) {
            setScreen("error");
            setErrorMessage("Failed to create conversation");
            console.error(error);
        } finally {
            setIsPending(false);
        }
    }
  return (
    <>
    <WidgetHeader>
        <div className='flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold'>
            <p className='text-3xl'>Select a conversation</p>
            <p className='text-lg'>
                Select a conversation to continue
            </p>
        </div>
    </WidgetHeader>
    <div className="flex flex-1 flex-col gap-y-4 p-4 overflow-y-auto">
        <Button
            variant='outline'
            className='w-full justify-between h-16'
            onClick={handleNewConversation}
            disabled={isPending}
        >
            <div className='flex items-center gap-x-2'>
                <MessageSquareTextIcon  className='size-4' />
                <span>Start Chat</span>
            </div>
            <ChevronRightIcon />
        </Button>
    </div>
</>
  )
}

export default WidgetSelectionScreen