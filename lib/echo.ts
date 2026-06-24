import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { tokenStorage } from "@/lib/api";

/**
 * Laravel Echo (broadcaster Reverb) untuk notifikasi real-time.
 *
 * Echo & Pusher menyentuh `window`, jadi instance dibuat lazy di sisi client
 * lewat `getEcho()` (jangan diinisialisasi saat SSR). Autentikasi private
 * channel memakai Sanctum Bearer token yang sama dengan REST API.
 */

type EchoInstance = InstanceType<typeof Echo>;

// Bentuk respons `/broadcasting/auth` (selaras ChannelAuthorizationData pusher-js).
interface BroadcastAuthData {
  auth: string;
  channel_data?: string;
  shared_secret?: string;
}

let echoInstance: EchoInstance | null = null;

// `/broadcasting/auth` berada di root domain (bukan di bawah /api/v1), jadi
// origin diturunkan dari NEXT_PUBLIC_API_URL. Bisa dioverride bila perlu.
const resolveAuthEndpoint = (): string => {
  const override = process.env.NEXT_PUBLIC_REVERB_AUTH_ENDPOINT;
  if (override) return override;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    return `${new URL(apiUrl ?? "").origin}/broadcasting/auth`;
  } catch {
    return "/broadcasting/auth";
  }
};

export function getEcho(): EchoInstance | null {
  if (typeof window === "undefined") return null;
  if (echoInstance) return echoInstance;

  // Pusher dibutuhkan oleh Echo sebagai transport layer.
  (window as unknown as { Pusher: typeof Pusher }).Pusher = Pusher;

  const port = Number(process.env.NEXT_PUBLIC_REVERB_PORT) || 8080;
  const scheme = process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "http";
  const authEndpoint = resolveAuthEndpoint();

  echoInstance = new Echo({
    broadcaster: "reverb",
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
    wsPort: port,
    wssPort: port,
    forceTLS: scheme === "https",
    enabledTransports: ["ws", "wss"],
    authorizer: (channel: { name: string }) => ({
      authorize: (
        socketId: string,
        callback: (error: Error | null, data: BroadcastAuthData | null) => void,
      ) => {
        fetch(authEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${tokenStorage.get() ?? ""}`,
          },
          body: JSON.stringify({
            socket_id: socketId,
            channel_name: channel.name,
          }),
        })
          .then((res) => res.json())
          .then((data: BroadcastAuthData) => callback(null, data))
          .catch((err) => callback(err as Error, null));
      },
    }),
  });

  return echoInstance;
}

/** Tutup koneksi WebSocket (mis. saat logout). */
export function disconnectEcho(): void {
  if (echoInstance) {
    echoInstance.disconnect();
    echoInstance = null;
  }
}
