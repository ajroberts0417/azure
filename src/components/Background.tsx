import { useBackground } from "@/state/slices/theme"

export const Background: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div
        className={className}
        style={{ backgroundImage: `url("${useBackground()}")` }}
    >
        {children}  
    </div>
)