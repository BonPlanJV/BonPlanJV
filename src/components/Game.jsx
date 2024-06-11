import ScoreButton from "../components/ScoreButton";

function Game(props) {
  const game = props.game;
  return (
    <a
      href={`/games/${game.key}`}
      key={game.key}
      className="bg-neutral-900 w-full rounded-xl p-5 flex text-white"
    >
      <img
        src={game.image}
        className="h-[150px] object-cover rounded-xl"
      />
      <div className="px-5">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <ScoreButton game={game} />
            <button className="bg-neutral-700 text-white rounded-full px-4 py-1">
              29<i className="fa-regular fa-comment ml-3"></i>
            </button>
            {game.tags.map((tag, index) => (
              <div key={index}>
                <p className="min-w-[80px] text-orange-500 px-3 py-1 bg-neutral-700 rounded-full">
                  {tag.name}
                </p>
              </div>
            ))}
          </div>
          <div className="flex space-x-2 items-end">
            <h1 className="text-white text-2xl">{game.titre}</h1>
            <p className="text-orange-500">{game.prix} €</p>
          </div>
          <p className="text-wrap text-start text-gray-300">
            {game.description.substring(0, 250) + '...'}
          </p>
        </div>
      </div>
      <div className="w-[15%] h-full space-y-8 flex flex-col justify-between">
        <div className="flex items-center space-x-2">
          <p>{game.auteur.pseudo}</p>
          <img
            src={game.auteur.image}
            className="h-[40px] w-[40px] rounded-full"
          />
        </div>
        <button className="bg-orange-500 rounded-xl py-1 px-2 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-orange-600">
          Voir le jeu
          <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
        </button>
      </div>
    </a>
  );
}

export default Game;
