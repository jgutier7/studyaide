import { useCallback, useState } from 'react';

export function useEditorEvents() {
    const [isPointerPressed, setIsPointerPressed] = useState(false);

    const handleEvent = useCallback((data, editor) => {
        switch (data.name) {
            case 'pointer_down':
                setIsPointerPressed(true);
                break;
            case 'pointer_up':
                setIsPointerPressed(false);
                break;
            default:
                break;
        }
    }, []);

    return { isPointerPressed, handleEvent };
}
