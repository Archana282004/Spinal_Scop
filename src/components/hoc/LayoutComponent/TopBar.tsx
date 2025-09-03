import React from "react";
import { useRouter } from "next/navigation";

interface TopBarProps {
  title: string;
  showBack?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ title, showBack = true }) => {
  const router = useRouter();
  return (
    <header className="relative flex items-center bg-background text-foreground rounded-t-2xl h-14 px-4 border-b border-foreground/10">
      {showBack && (
        <button
          type="button"
          aria-label="Back"
          onClick={() => router.back()}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-foreground/80 hover:text-primary focus:outline-none"
        >
          &#8592;
        </button>
      )}
      <div className="flex-1 flex justify-center">
        <h2 className="font-heading text-lg font-semibold text-foreground text-center">
          {title}
        </h2>
      </div>
    </header>
  );
};

export default TopBar;
