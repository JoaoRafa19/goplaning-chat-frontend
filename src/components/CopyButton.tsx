import { Clipboard } from '@phosphor-icons/react'

interface CopyButtonProps {
    textToCopy?: string
}

function CopyButton(props: CopyButtonProps) {

    function copyToClipboard() {
        if (props.textToCopy)
            navigator.clipboard.writeText(props.textToCopy)
    }

    return <button onClick={copyToClipboard} data-tooltip-target="tooltip-light" data-tooltip-style="light" type="button" className="flex gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <Clipboard size={20}></Clipboard>
        <p>Copy code to clipboard</p>
    </button>;
}


export default CopyButton