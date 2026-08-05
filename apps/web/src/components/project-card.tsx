export default function ProjectCard() {
  return (
    <div className="group w-90 h-80 hover:border-accent cursor-pointer border border-border rounded-xl p-5 bg-card text-foreground">
      <div className="flex flex-col gap-4 border-b border-dashed h-full group-hover:border-accent">
        <p className="text-xsmall group-hover:text-accent text-card-foreground">
          [01]
        </p>
        <h5 className="text-2xl ">Clip2Cook - YT to recipe app</h5>
        <p className="text-xsmall group-hover:text-accent text-card-foreground">
          2026 • Personal Project
        </p>
        <p className="text-small font-medium text-secondary-foreground">
          A mobile application that converts YouTube link to a structured recipe
          where users can save and review them. Built using Expo React Native
          and Supabase.
        </p>
      </div>
    </div>
  );
}
