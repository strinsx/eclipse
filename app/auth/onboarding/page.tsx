"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasProfiles } from "@/app/lib/services/profile.services";
import CreateProfileForm from "@/app/components/auth/CreateProfileForm";

export default function OnboardingPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    hasProfiles().then((exists) => {
      if (exists) {
        router.push("/auth/onboarding/profile-selection");
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return <CreateProfileForm />;
}
