export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div
        className="
          bg-muted text-muted-foreground 
          rounded-3xl px-3 py-2 shadow-sm backdrop-blur-sm
          rounded-bl-none
        "
      >
        <div className="flex gap-1 items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/40 animate-typingDot"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/40 animate-typingDot animation-delay-150"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/40 animate-typingDot animation-delay-300"></span>
        </div>
      </div>
    </div>
  );
}
