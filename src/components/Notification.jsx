import closesvg from "../assets/close.png";
export default function Notification({
  message = "message",
  type = "info",
  onClose,
}) {
  return (
    <div
      className={`flex space-x-3 animate-[notification_1s_ease-in-out] px-5 py-3 rounded-xl items-center justify-between ${type}`}
    >
      <span>{message}</span>
      <a className="cursor-pointer" onClick={onClose}>
        <img className="w-[20px]" src={closesvg} alt="" />
      </a>
    </div>
  );
}
