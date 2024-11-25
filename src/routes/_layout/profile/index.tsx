import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "@/features/profile/components/profile";

export const Route = createFileRoute("/_layout/profile/")({
  component: UserProfile,
});

function UserProfile() {
  return (
    <div className="flex justify-center items-center h-full">
        <Profile />
    </div>
  );
}
