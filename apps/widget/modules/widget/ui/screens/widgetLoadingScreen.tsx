'use client';

import React, { useEffect, useState } from 'react'
import WidgetHeader from '../components/widgetHeader'
import { 
    contactSessionIdAtomFamily, 
    errorMessageAtom, 
    loadingMessageAtom, 
    organizationIdAtom, 
    screenAtom 
} from '../../atoms/widget-atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { Loader2Icon } from 'lucide-react';
import { useAction, useMutation } from 'convex/react';
import { api } from '@workspace/backend/_generated/api';

type InitiStep = "org" | "session" | "settings" | "vapi" | "done";

const WidgetLoadingScreen = ({ organizationId }: { organizationId: string | null }) => {

    const [step, setStep] = useState<InitiStep>("org");
    const setErrorMessage = useSetAtom(errorMessageAtom);
    const setOrganizationId = useSetAtom(organizationIdAtom);
    const setScreen = useSetAtom(screenAtom);
    const setLoadingMessage = useSetAtom(loadingMessageAtom);
    const [sessionValid, setSessionValid] = useState(false);
    const loadingMessage = useAtomValue(loadingMessageAtom);

    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId || ""));

    const validateOrganization = useAction(api.public.organizations.validate);

    // Step 1: Validate organization
    useEffect(() => {
        if (step !== "org") return;

        setLoadingMessage("Finding organization Id...");

        if (!organizationId) {
            setErrorMessage("Invalid organization");
            setScreen("error");
        }

        setLoadingMessage("Verifying organization...");

        validateOrganization({ organizationId: organizationId! }).then((res) => {
            if (res.valid) {
                setOrganizationId(organizationId);
                setStep("session");
            } else {
                setErrorMessage(res.error || "Invalid organization");
                setScreen("error");
            }
        }).catch((error) => {
            setErrorMessage("Failed to validate organization");
            setScreen("error");
        })
    }, [
        step, 
        organizationId, 
        setErrorMessage, 
        setOrganizationId, 
        setScreen, 
        setLoadingMessage, 
        validateOrganization
    ]);

    // Step 2: Validate session
    const validateContactSession = useMutation(api.public.contactSessions.validate);
    
    useEffect(() => {
        if (step !== "session") return;

        setLoadingMessage("Finding session Id...");

        if (!contactSessionId) {
            setSessionValid(false);
            setStep("done");
            return;
        }

        setLoadingMessage("Validating session...");

        validateContactSession({
            contactSessionId
        }).then((res) => {
            setSessionValid(res.valid);
            setStep("done")
        }).catch(() => {
            setSessionValid(false);
            setStep("done")
        })
    }, [
        step, 
        contactSessionId, 
        setLoadingMessage,
        validateContactSession
    ])

    useEffect(() => {
        if (step !== "done") return;

        const hasValidSession = contactSessionId && sessionValid;
        setScreen(hasValidSession ? "selection" : "auth");
    }, [
        step, 
        contactSessionId, 
        sessionValid, 
        setScreen
    ])

  return (
    <>
        <WidgetHeader>
            <div className='flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold'>
                <p className='text-3xl'>
                    {organizationId ? "Validating Organization" : "Validating Contact Session"}
                </p>
            </div>
        </WidgetHeader>
        <div className='flex flex-1 flex-col items-center justify-center gap-y-4 p-4'>
            <Loader2Icon className='w-4 h-4 animate-spin' />
            <p className='text-sm'>{loadingMessage || "Please wait while we validate your contact session..."}</p>
        </div>
    </>
  )
}

export default WidgetLoadingScreen;