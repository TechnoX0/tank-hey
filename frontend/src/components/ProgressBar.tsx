interface Props {
    min: number;
    max: number;
    value: number;
    text?: string;
    variant?: "health" | "shield" | "danger";
}

function ProgressBar({ min, max, value, text, variant = "health" }: Props) {
    const clampedValue = Math.min(Math.max(value, min), max);
    const percent = ((clampedValue - min) / (max - min)) * 100;

    const variantColor = {
        health: "bg-green-500",
        shield: "bg-blue-500",
        danger: "bg-red-500",
    }[variant];

    return (
        <div className="w-full space-y-1">
            {text && (
                <div className="text-sm font-medium text-gray-700">{text}</div>
            )}

            <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden relative">
                <div
                    className={`h-full transition-all duration-300 ${variantColor}`}
                    style={{ width: `${percent}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-end pr-2 text-xs font-semibold text-white">
                    {Math.round(percent)}%
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;
