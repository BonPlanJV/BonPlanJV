export default function SettingPrivacy() {
    return (
        <section className="w-full animate-[selection_0.5s_ease-in-out] ml-10">
            <div className="flex space-x-10">
                <div className="w-full space-y-5">
                    <h1 className="text-xl font-semibold">Privacy</h1>

                    <div className="flex space-x-5">
                    <p>Hide your username from others users {'(comming soon)'}</p>
                    <input disabled={true} type="checkbox" className="cursor-not-allowed" />
                    </div>
                </div>
            </div>
        </section>
    )
}