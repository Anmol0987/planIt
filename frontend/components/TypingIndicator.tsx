export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 mb-2 ">
      <div
        className="
      bg-[#E5E5EA] dark:bg-[#3A3A3C]
      rounded-3xl px-3 py-2 w-fit flex items-center shadow-sm
      backdrop-blur-sm rounded-bl-none
    "
      >
        <div className="flex gap-1 items-center">
          <span
            className="
            w-2.5 h-2.5 bg-gray-500 dark:bg-gray-300 rounded-full 
            animate-typingDot
          "
          ></span>
          <span
            className="
            w-2.5 h-2.5 bg-gray-500 dark:bg-gray-300 rounded-full 
            animate-typingDot animation-delay-150
          "
          ></span>
          <span
            className="
            w-2.5 h-2.5 bg-gray-500 dark:bg-gray-300 rounded-full 
            animate-typingDot animation-delay-300
          "
          ></span>
        </div>
      </div>
    </div>
  );
}
