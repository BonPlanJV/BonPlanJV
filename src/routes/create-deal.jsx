import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { readData, submitCreateDeal } from '../firebase/database';
import { useNotification } from "../core/notificationContext.jsx";
import defaultPP from "../assets/defaultProfile.webp"
import photoSvg from "../assets/icon-photo.svg"
import { HSStaticMethods } from 'preline';

export default function CreateDeal() {
  const [resizedB64, setResizedB64] = useState(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const state = {
    titre: null,
    prixInit: null,
    prix: null,
    promoCode: null,
    description: null,
    tags: []
  };

  useEffect(() => {
    loadTags();
    HSStaticMethods.autoInit(['select']);
  }, [navigate]);

  const loadTags = () => {
    document.title = "Creer un deal";
    readData("tags").then((tags) => {
      const select = window.HSSelect.getInstance(document.getElementById("tagsSelect"), true)?.element;
      if (select) {
        Object.entries(tags).map(([key, value]) => {
          select.addOption([
          {
              title: value.name,
              val: key
          }]);
        });
  
        select.on('change', (val) => {
          state.tags = val;
        })
      }
    });
  };

  var loadFile = (event) => {
    const file = event.target.files[0];
    if(!file) return
    if (!file.type.startsWith('image/')) {
        showNotification('Veuillez inserer une image', 'error')
        return;
    }

    var reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 100;
            canvas.height = 150;
            ctx.drawImage(img, 0, 0, 100, 150);
            const resizedBase64 = canvas.toDataURL("image/png");
            document.getElementById("preview").src = resizedBase64;
            setResizedB64(resizedBase64)
        };
    };
    reader.readAsDataURL(file);
  };

  const imgUpload = () => {
      const input = document.getElementById("picture")
      input.click()
  }

  return (
    <main className="text-center mx-auto text-gray-700 bg-neutral-800 h-full w-full text-white">
      <div className='w-full'>
        <img className="absolute z-1 h-full w-full bg-center bg-cover" alt="" />
        <div className="absolute h-screen w-full">
          <div className="h-[15vh] w-full bg-neutral-800"></div>
          <div className="h-full w-full bg-neutral-800 p-5 flex justify-center">
            <div className="w-[90%] h-full space-y-10"> 
              <h1 className="text-4xl text-white text-start">Poster un deal</h1>
              <form className="container flex flex-col w-full text-neutral-800">
                <div className='w-100 flex'>
                  <div className="w-1/2 space-y-5">
                    <div className='w-full flex items-center'>
                      <label className='text-white w-[120px]'>Nom du jeu</label>
                      <input
                        onInput={(e) => {
                          state.titre = e.currentTarget.value;
                        }}
                        className="border bg-gray-200 outline outline-3 outline-orange-500 outline-offset-0	rounded-md px-2 py-3 ml-2"
                        type="text"
                        placeholder="Nom du jeu"
                        autoComplete="Nom du jeu"
                        required
                      />
                    </div>
                    <div className='w-full flex items-center'>
                      <label className='text-white w-[120px]'>Prix initial</label>
                      <input 
                        onInput={(e) => {
                          state.prixInit = e.currentTarget.value;
                        }}
                        className="border bg-gray-200 outline outline-3 outline-orange-500 outline-offset-0	rounded-md px-2 py-3 ml-2"
                        placeholder="Prix initial"
                        autoComplete="Prix initial"
                        type='number'
                        required
                      />
                    </div>
                    <div className='w-full flex items-center'>
                      <label className='text-white w-[120px]'>Prix final</label>
                      <input 
                        onInput={(e) => {
                          state.prix = e.currentTarget.value;
                        }}
                        className="border bg-gray-200 outline outline-3 outline-orange-500 outline-offset-0	rounded-md px-2 py-3 ml-2"
                        placeholder="Prix final"
                        autoComplete="Prix final"
                        type='number'
                        required
                      />
                    </div>
                    <div className='w-full flex items-center'>
                      <label className='text-white w-[120px]'>Code Promo</label>
                      <input 
                        onInput={(e) => {
                          state.promoCode = e.currentTarget.value;
                        }}
                        className="border bg-gray-200 outline outline-3 outline-orange-500 outline-offset-0	rounded-md px-2 py-3 ml-2"
                        placeholder="Code Promo"
                        autoComplete="Code Promo"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 space-y-5">
                    <div className='w-full'>
                      <label className='text-white'>Description</label>
                      <textarea 
                        onInput={(e) => {
                          state.description = e.currentTarget.value;
                        }}
                        className="w-full border mt-2 bg-gray-200 outline outline-3 outline-orange-500 outline-offset-0	rounded-md px-2 py-3 ml-2"
                        placeholder="Description"
                        autoComplete="Description"
                        required
                      />
                    </div>
                    <div className='w-full'>
                      <label className='text-white'>Tags</label>
                      <select multiple data-hs-select='{
                        "placeholder": "Select multiple options...",
                        "toggleTag": "<button type=\"button\"></button>",
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
                        "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                        "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                      }' class="hidden" id="tagsSelect">
                      </select>
                    </div>
                    <label className="font-semibold">Photo</label>
                    <a
                        onClick={imgUpload}
                        className="flex space-x-5 items-center cursor-pointer">
                        <img id="preview" className="h-[50px] rounded-full" src={defaultPP} alt="" />
                        <div className="flex items-center space-x-2">
                            <img className="h-[30px] w-[30px] invert" src={photoSvg} alt="" />
                            <p className="text-md text-gray-400">.jpg .png</p>
                        </div>
                        <input hidden type="file" id="picture" onChange={loadFile} accept="image/png, image/jpg"/>
                    </a>
                  </div>
                </div>
                <div className='w-full mt-10'>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const { titre, prixInit, prix, promoCode, description, tags } = state;
                      if (titre && prixInit && prix && description && resizedB64) {
                        submitCreateDeal({ 
                          titre, 
                          prixInit, 
                          prix, 
                          promoCode, 
                          description,
                          image: resizedB64,
                          tags: tags
                        }, navigate, showNotification);
                      } else {
                        showNotification('Veuillez remplir les champs obligatoires', 'error')
                      }
                    }}
                    className="bg-orange-500 rounded-md px-10 py-3 text-white font-semibold hover:bg-orange-600"
                  >
                    Poster
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}