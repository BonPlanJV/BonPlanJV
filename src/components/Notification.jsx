import closesvg from '../assets/close.png'
export default function Notification({ message = "message", type = "info", onClose }) {
    return (
        <div className={`absolute z-20 flex space-x-3 animate-[notification_1s_ease-in-out] bottom-10 right-5 px-5 py-3 rounded-xl items-center ${type}`}>
            <span>{message}</span>
            <a className='cursor-pointer' onClick={onClose}>
                <img className='w-[20px]' src={closesvg} alt="" />
            </a>
        </div>
    )
}
