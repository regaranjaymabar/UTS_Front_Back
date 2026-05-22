import { useState } from "react";
import { ChevronDown} from "lucide-react"

interface CollapsProps {
    title:string;
    description:string
}

export const Collaps: React.FC<CollapsProps> = ({
    title,
    description
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="border-gray-400 border-4 rounded-md shadow-md  border-r-6 border-r-red-600">
            <button onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer w-full px-4 py-3 flex intems-center gap-4 bg-white hover:bg-gray-50 transition-colors"
                >
                    <div className="p-2 bg-gray-200">
                        <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                    <span className="text-lg font-semibold text-gray-400">
                        {title}
                    </span>
            </button>

            {isOpen && (
                <div className="px-4 py-3 bg-gray-300 border-t border-gray-200">
                    <p className="text-black">{description}</p>
                </div>
            )}
        </div>
    );
};