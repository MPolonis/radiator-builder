import { forwardRef } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col relative">
        <label className="text-sm mb-1">{label}</label>
        <input
          ref={ref}
          className={`border rounded px-3 py-2 ${className}`}
          {...props}
        />
        {error && (
          <span className="text-red-500 text-sm mt-1 absolute bottom-[-20px]">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
