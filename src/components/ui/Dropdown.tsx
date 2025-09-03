import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const Dropdown = ({ items, align = 'right', trigger, menuClassName = '' }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      if (isOpen && !el.contains(event.target as Node)) setIsOpen(false);
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const triggerElement = triggerRef.current;
    const menuElement = menuRef.current;
    if (!triggerElement || !menuElement) return;

    const triggerRect = triggerElement.getBoundingClientRect();

    // Calculate position
    const spacing = 8;
    let top = triggerRect.bottom + spacing;
    const left = align === 'left' ? triggerRect.left : triggerRect.right - menuElement.offsetWidth;

    // Adjust for overflow
    if (top + menuElement.offsetHeight > window.innerHeight) {
      top = triggerRect.top - menuElement.offsetHeight - spacing;
    }

    setMenuStyle({ top, left });
  }, [isOpen, align]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center justify-center rounded-md p-1.5 hover:bg-foreground/10"
        ref={triggerRef}
      >
        {trigger}
      </button>
      {isOpen && (
        <div
          role="menu"
          ref={menuRef}
          style={menuStyle}
          className={`fixed z-50 w-44 rounded-md border border-foreground/10 bg-background p-1 shadow-lg ${menuClassName}`}
        >
          {items.map((item: any, idx: number) => {
            const baseClass = 'block rounded-sm px-3 py-2 text-sm hover:bg-foreground/10';
            if (item.type === 'link') {
              return (
                <Link
                  key={`link-${idx}`}
                  href={item.href}
                  className={baseClass}
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick?.();
                  }}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <button
                key={`button-${idx}`}
                type="button"
                className={`${baseClass} w-full text-left`}
                onClick={() => {
                  setIsOpen(false);
                  item.onClick?.();
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;