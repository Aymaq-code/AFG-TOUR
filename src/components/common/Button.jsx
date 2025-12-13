import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  type = "glass",
  size = "md",
  disabled,
  onClick,
  className = "",
  value, // Added value prop
}) {
  const base =
    "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-full";

  const sizes = {
    sm: "px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm",
    md: "px-4 py-1.5 text-base sm:px-6 sm:py-2 sm:text-lg",
    lg: "px-6 py-2 text-lg sm:px-10 sm:py-3 sm:text-xl",
    xl: "px-4 py-2 text-lg w-full sm:px-0 sm:py-3 sm:text-2xl",
  };

  const variants = {
    glass:
      "bg-white/20 backdrop-blur-sm text-white hover:bg-[#E0E0E0] hover:text-[#424242] hover:translate-y-1",
    solid:
      "bg-emerald-700 text-white hover:bg-emerald-800 hover:translate-y-1 shadow-lg",
    outline:
      "border border-white text-white hover:bg-white hover:text-stone-900 rounded-none ",
    icon: "w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-800 text-white hover:bg-slate-900",
    secondary:
      " bg-[#607D8B] text-white rounded-sm transition-all duration-300 hover:bg-[#78909C] shadow-black/40 shadow-[0_0_8px_3px] hover:shadow-black/30  hover:shadow-[0_0_4px_1px] hover:translate-y-1 ",
    tertiary:
      "bg-stone-700 text-white shadow-black/80 shadow-[0_2px_2px] transition-all duration-300 hover:bg-stone-800  ",
  };

  const finalClass = `${base} ${sizes[size]} ${variants[type]} ${className}`;

  // Handle click with value
  const handleClick = (e) => {
    if (onClick) {
      // Pass both event and value to onClick handler
      onClick(e, value);
    }
  };

  if (to)
    return (
      <Link to={to} className={finalClass}>
        {children}
      </Link>
    );

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={finalClass}
      data-value={value} // Also set as data attribute for easy access
    >
      {children}
    </button>
  );
}
