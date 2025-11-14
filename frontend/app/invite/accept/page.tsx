"use client";
import { api } from "@/app/lib/api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AcceptInvite() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid invite link");
      return;
    }

    const acceptInvite = async () => {
      try {
        const res = await api.post("/invite/accept", { token });
        const tripId = res.data.result;
        toast.success("invite Accepted");
        router.push(`/dashboard/${tripId}`);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to accept invite");
      }
    };
    acceptInvite();
  }, [token]);

  <div className="min-h-screen flex items-center justify-center">
    Accepting invite...
  </div>;
}
