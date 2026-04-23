import { BilingualText } from "@/components/portal-text";

const badgeStyles = {
  "under-investigation": {
    en: "Under Investigation",
    ml: "അന്വേഷണത്തിലാണ്",
    classes:
      "border-caution/40 bg-cautionSoft text-caution dark:border-copperSoft/40 dark:bg-copperSoft/10 dark:text-copperSoft"
  },
  active: {
    en: "Active",
    ml: "സജീവം",
    classes: "border-blue-300 bg-blue-50 text-police dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-100"
  },
  closed: {
    en: "Closed",
    ml: "അടച്ചു",
    classes: "border-emerald-300 bg-emerald-50 text-success dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100"
  },
  court: {
    en: "Court Proceedings",
    ml: "കോടതിയിൽ",
    classes: "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100"
  },
  resolved: {
    en: "Resolved",
    ml: "പരിഹരിച്ചു",
    classes: "border-emerald-300 bg-emerald-50 text-success dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100"
  },
  completed: {
    en: "Completed",
    ml: "പൂർത്തിയായി",
    classes: "border-emerald-300 bg-emerald-50 text-success dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100"
  },
  registered: {
    en: "Registered",
    ml: "രജിസ്റ്റർ ചെയ്തു",
    classes: "border-blue-300 bg-blue-50 text-police dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-100"
  },
  unsolved: {
    en: "Unsolved",
    ml: "തെളിയിച്ചിട്ടില്ല",
    classes: "border-red-300 bg-red-50 text-alert dark:border-red-900 dark:bg-red-950/40 dark:text-red-100"
  }
};

export function StatusBadge({ status, compact = false }) {
  const config = badgeStyles[status] || badgeStyles.active;

  return (
    <div
      className={`inline-flex rounded-2xl border px-3 py-2 ${config.classes} ${
        compact ? "w-fit" : "min-w-[180px]"
      }`}
    >
      <BilingualText
        en={config.en}
        ml={config.ml}
        enClassName={`text-xs font-bold uppercase tracking-[0.22em] ${compact ? "" : "text-center"}`}
        mlClassName={`text-[11px] ${compact ? "" : "text-center"}`}
      />
    </div>
  );
}
