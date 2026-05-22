interface ButtonProps {
    label: string;
    variant?: "primary" | "secondary";
    type?: "button" | "submit";
    onClick?: () => void;
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    variant = "primary",
    type = "button",
    isLoading = false,
}) => {
    const baseStyle =
        "px-4 py-2 rounded font-medium";
    const varianStyle = {
        primary: "bg-red-600 text-white",
        secondary: "border border-red-600 text-red-600"
    };
    return (
        <button
            type={type}
            disabled={isLoading}
            className={`${baseStyle} ${varianStyle[variant]}`}
        >
            {isLoading ? "Loading..." : label}
        </button>
    );
};

export default Button;