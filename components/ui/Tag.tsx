import { FaTag } from 'react-icons/fa'

type TagProps = {
    tag: string
}

export default function Tag({ tag }: TagProps) {
    return (
        <span className="flex h-full text-sm text-white items-center gap-1 transition-all hover:transform-3d rounded-full px-3 py-1 bg-gray-200 dark:bg-gray-700">
            <span className="text-xs"><FaTag /></span>
            {tag}
        </span>
    )
}