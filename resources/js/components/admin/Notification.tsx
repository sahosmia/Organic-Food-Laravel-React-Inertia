
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface NotificationProps {
    message: string | null;
    type: 'success' | 'error' | 'info' | null;
    onClose: () => void;
    duration?: number;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose, duration = 4000 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose();
            }, duration);


            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [message, duration, onClose]);

    if (!isVisible || !message) {
        return null;
    }

    let bgColorClass = 'bg-gray-700';
    const textColorClass = 'text-white';
    switch (type) {
        case 'success':
            bgColorClass = 'bg-green-800';
            break;
        case 'error':
            bgColorClass = 'bg-red-800';
            break;
        case 'info':
            bgColorClass = 'bg-blue-800';
            break;
        default:
            bgColorClass = 'bg-gray-700';
    }

    return (
        <div
            className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 flex items-center justify-between space-x-4
                        ${bgColorClass} ${textColorClass} transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            role="alert"
        >
            <span>{message}</span>
            <button onClick={() => { setIsVisible(false); onClose(); }} className="ml-4 text-white hover:text-gray-200">
                <X className="h-5 w-5" />
            </button>
        </div>
    );
};

export default Notification;
