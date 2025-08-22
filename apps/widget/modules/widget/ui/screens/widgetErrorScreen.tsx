'use client';

import { useAtomValue } from "jotai";
import { errorMessageAtom } from "../../atoms/widget-atoms";
import { AlertTriangleIcon } from "lucide-react";
import WidgetHeader from "../components/widgetHeader";

const WidgetErrorScreen = () => {
    const errorMessage = useAtomValue(errorMessageAtom);

    return (
        <>
            <WidgetHeader>
                <div className='flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold'>
                    <p className='text-3xl'>Oops! 🤔</p>
                    <p className='text-lg'>
                        Something went wrong.
                    </p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground gap-y-4 p-4">
                <AlertTriangleIcon />
                <p className="text-sm">{errorMessage || "Invalid Configuration"}</p>
            </div>
        </>
    )
}

export default WidgetErrorScreen;