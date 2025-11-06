import { ZapIcon } from "lucide-react";


const RateLimitedUI = () =>{
    return (
    <div role="alert" className="alert alert-warning max-w-6xl mx-auto p-2 ">
        <div>
            <ZapIcon className="size-10"/>
        </div>
        <div className="flex-1">
            <h3 className="text-xl font-bold mb2">Rate Limit Reached</h3>
        <p>
            You've made too many requests in a short period. Please wait a moment.
        </p>
        <p>
            Try again in a few seconds for the best experience.
        </p>
        </div>
    </div>

        
    )
}

export default RateLimitedUI;