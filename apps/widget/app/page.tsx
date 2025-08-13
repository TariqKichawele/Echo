"use client"

import { useVapi } from "@/modules/widget/hooks/useVapi"
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const { isSpeaking, isConnecting, isConnected, transcript, startCall, endCall } = useVapi();

  return (
    <div className="flex items-center justify-center min-h-svh flex-col gap-4">
      <p>apps/widget</p>
      <p>{isSpeaking ? "Speaking" : "Not Speaking"}</p>
      <p>{isConnecting ? "Connecting" : "Not Connecting"}</p>
      <p>{isConnected ? "Connected" : "Not Connected"}</p>
      <p>{transcript.map((t) => t.text).join(" ")}</p>
      <Button onClick={startCall} disabled={isConnecting || isConnected}>Start Call</Button>
      <Button onClick={endCall} disabled={!isConnected} variant="destructive">End Call</Button>
    </div>
  )
}
