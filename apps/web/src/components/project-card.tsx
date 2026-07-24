export default function ProjectCard() {
  return (
    <div className="w-90 h-80 border border-white rounded-xl p-5">
      <div className="flex flex-col gap-3 border-b border-dashed h-full">
        <p className="text-xsmall">[01]</p>
        <h5 className="text-2xl">Clip2Cook - YT to recipe app</h5>
        <p className="text-xsmall">2026 • Personal Project</p>
        <p className="text-small">
          A mobile application that converts YouTube link to a structured recipe
          where users can save and review them. Built using Expo React Native
          and Supabase.
        </p>
      </div>
    </div>
  );
}
