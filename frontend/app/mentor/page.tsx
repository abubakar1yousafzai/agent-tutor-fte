import { AppShell } from "@/components/AppShell";
import { MentorChat } from "@/components/MentorChat";

export default function MentorPage() {
  return (
    <AppShell title="AI Mentor" subtitle="Your mentor agent · explains, demos, walks you through it">
      <MentorChat />
    </AppShell>
  );
}
