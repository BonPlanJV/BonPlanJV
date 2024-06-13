import { createContext, useState, useContext } from 'react';
import Notification from '../components/Notification.jsx';

const NotificationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (message, type = 'info', duration = 4000) => {
        const id = new Date().getTime();
        setNotifications((prevNotifications) => [...prevNotifications, { id, message, type }]);
        
        setTimeout(() => {
            setNotifications((prevNotifications) => 
                prevNotifications.filter((notification) => notification.id !== id)
            );
        }, duration);
    };

    const closeNotification = (id) => {
        setNotifications((prevNotifications) => 
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notifications.map(({ id, message, type }) => (
                <Notification 
                    key={id} 
                    message={message} 
                    type={type} 
                    onClose={() => closeNotification(id)} 
                />
            ))}
        </NotificationContext.Provider>
    );
};
