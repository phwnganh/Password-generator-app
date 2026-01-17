import CopyIcon from './assets/images/icon-copy.svg'
import ArrowRightIcon from './assets/images/icon-arrow-right.svg'
const MainPage = () => {
    const CONDITIONS_OPTIONS = [
        {
            key: 1,
            value: 'Include Uppercase Letters'
        },
        {
            key: 2,
            value: 'Include Lowercase Letters'
        },
        {
            key: 3,
            value: 'Include Numbers'
        },
        {
            key: 4,
            value: 'Include Symbols'
        }
    ]
    return (
        <main className={"bg-gray-950"}>
            <section className={" min-h-screen flex justify-center items-center"}>
                <div className={"flex flex-col gap-8 max-w-135 mx-auto w-full"}>
                    <h1 className={"text-center text-gray-600 text-text-preset-4 sm:text-text-preset-2 font-text-preset-4 sm:font-text-preset-2 leading-text-preset-4 sm:leading-text-preset-2"}>Password Generator</h1>
                    <form className={"flex flex-col gap-6"}>
                        <div className={"py-4 px-8 bg-gray-800 flex justify-between"}>
                            <input type={"text"} className={"outline-none flex-1 min-w-0 text-gray-700 text-text-preset-1 font-text-preset-1 leading-text-preset-1"} placeholder={"P4$5W0rD!"}/>
                            <div className={"flex justify-center items-center"}>
                                <img src={CopyIcon} alt={"copy-icon"}/>
                            </div>
                        </div>

                        <div className={"py-6 px-8 bg-gray-800"}>
                            <div className={"flex flex-col gap-8"}>
                                <div className={"flex flex-col gap-4"}>
                                    <div className={"flex items-center justify-between"}>
                                        <p className={"text-text-preset-4 sm:text-text-preset-3 text-gray-200 font-text-preset-4 sm:font-text-preset-3 leading-text-preset-4 sm:leading-text-preset-3"}>Character Length</p>
                                        <p className={"text-text-preset-4 sm:text-text-preset-1 text-green-200 font-text-preset-4 sm:font-text-preset-1 leading-text-preset-4 sm:leading-text-preset-1"}>0</p>
                                    </div>
                                    <div className={"relative bg-grey-850 h-2"}>
                                        <div className={"absolute rounded-full bg-gray-200 w-7 h-7 left-0 top-1/2 -translate-y-1/2"}></div>
                                    </div>
                                </div>
                                <div className={"flex flex-col gap-4"}>
                                    {CONDITIONS_OPTIONS.map((option) => (
                                        <div key={option.key} className={"flex items-center gap-6"}>
                                            <div className={"w-5 h-5 border-2 border-grey-200"}></div>
                                            <p className={"text-grey-200 text-text-preset-4 sm:text-text-preset-3 font-text-preset-4 sm:font-text-preset-3 leading-text-preset-4 sm:leading-text-preset-3"}>{option.value}</p>
                                        </div>
                                    ))}

                                </div>
                                <div className={"py-6 px-8 flex justify-between bg-grey-850"}>
                                    <h1 className={"text-grey-600 text-text-preset-4 sm:text-text-preset-3 font-text-preset-4 sm:font-text-preset-3 leading-text-preset-4 sm:leading-text-preset-3"}>STRENGTH</h1>
                                    <div className={"flex gap-2"}>
                                        <div className={"border-2 border-grey-200 w-2.5 h-7"}></div>
                                        <div className={"border-2 border-grey-200 w-2.5 h-7"}></div>
                                        <div className={"border-2 border-grey-200 w-2.5 h-7"}></div>
                                        <div className={"border-2 border-grey-200 w-2.5 h-7"}></div>
                                    </div>
                                </div>
                                <button className={"py-6 flex justify-center items-center gap-6 bg-green-200"}>
                                    <h1 className={"text-grey-800 text-text-preset-4 sm:text-text-preset-3 font-text-preset-4 sm:font-text-preset-3 leading-text-preset-4 sm:leading-text-preset-3"}>GENERATE</h1>
                                    <div className={"flex justify-center items-center"}>
                                        <img src={ArrowRightIcon} alt={"arrow-right"} />
                                    </div>
                                </button>
                            </div>

                        </div>
                    </form>
                </div>

            </section>
        </main>
    );
};

export default MainPage;