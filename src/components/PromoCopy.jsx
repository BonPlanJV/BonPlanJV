import { useNotification } from "../core/notificationContext";

const PromoCopy = (props) => {
  const game = props.game;
  const promoCode = game.promoCode;
  const { showNotification } = useNotification();

  const handleCopy = (event) => {
    event.stopPropagation();
    event.preventDefault();
    navigator.clipboard.writeText(game.promoCode);
    showNotification("Promo code copied to clipboard", "success");
  };

  return (
    <>
      {promoCode && (
        <div className="relative">
          <button
            className="text-center rounded-full w-full px-4 py-2 border-2 border-orange-500 border-dotted hover:border-orange-800 transition-colors duration-200"
            onClick={handleCopy}
          >
            {promoCode}
            <i className="fa-regular fa-copy ml-2"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default PromoCopy;
