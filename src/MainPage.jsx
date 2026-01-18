import CopyIcon from './assets/images/icon-copy.svg'
import ArrowRightIcon from './components/icons/ArrowRightIcon.tsx'
import CheckIcon from './assets/images/icon-check.svg'
import {useEffect, useRef, useState} from "react";
import {CHAR_POOLS, MAX, MIN, STRENGTH_LEVELS} from "./constants/passwordLength.constant.js";
const MainPage = () => {
    const [isChecked, setIsChecked] = useState([]);
    const [isDragging, setIsDragging] = useState(false)
    const [password, setPassword] = useState("")
    const [isCopied, setIsCopied] = useState(false)
    const [length, setLength] = useState(10)
    const trackRef = useRef(null)
    const percent = ((length - MIN) / (MAX - MIN)) * 100
    const handleChecked = (key) => {
        setIsChecked(prev => {
            if(prev.includes(key)){
                return prev.filter(k => k !== key)
            }
            return [...prev, key]
        })
    }

    const handleUpdateValue = (clientX) => {
        const rect = trackRef.current.getBoundingClientRect()
        let percent = (clientX - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        const newLength = Math.round(MIN + percent * (MAX - MIN))
        setLength(newLength)
    }

    const handleMouseDown = (e) => {
        setIsDragging(true)
        handleUpdateValue(e.clientX)
    }

    const handleMouseMove = (e) => {
        if(!isDragging) return;
        handleUpdateValue(e.clientX)
    }

    const handleGeneratePassword = (length, selectedKeys) => {
        if(selectedKeys.length === 0 || length === 0) return ""

        let pool = ""

        selectedKeys.forEach(key => {
            pool+= CHAR_POOLS[key]
        })

        let result = ""
        for(let i = 0; i < length; i++){
            const randomIndex = Math.floor(Math.random() * pool.length);
            result+=pool[randomIndex];
        }
        return result;
    }

    const getPasswordsStrength = (length, selectedKeys) => {
        const types = selectedKeys.length;
        if(length === 0 || types === 0) return "";
        if(length < 6 || types === 1) return "TOO WEAK!";
        if(length < 8 || types === 2) return "WEAK";
        if(length < 12 || types === 3) return "MEDIUM";
        return "STRONG";
    }
    useEffect(() => {
        const onMove = e => handleMouseMove(e)
        const onUp = () => setIsDragging(false)
        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseup", onUp)

        return () => {
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mouseup", onUp)
        }
    }, [isDragging]);


    const handleGenerate = (e) => {
        e.preventDefault()
        setPassword(handleGeneratePassword(length, isChecked))
    }

    const handleCopyPasswordToClipboard = async () => {
        if(!password) return;
        try {
            await navigator.clipboard.writeText(password);
            setIsCopied(true);
        }catch(err) {
        }
    }
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

    const strengthLabels = getPasswordsStrength(length, isChecked)
    const strengthConfig = STRENGTH_LEVELS.find(strength => strength.label === strengthLabels)
    return (
        <main className={"bg-gray-950"}>
            <section className={" min-h-screen flex justify-center items-center"}>
                <div className={"flex flex-col gap-8 max-w-135 mx-auto w-full"}>
                    <h1 className={"text-center text-gray-600 text-text-preset-4 sm:text-text-preset-2 font-text-preset-4 sm:font-text-preset-2 leading-text-preset-4 sm:leading-text-preset-2"}>Password Generator</h1>
                    <form className={"flex flex-col gap-6"}>
                        <div className={"py-4 px-8 bg-grey-800 flex justify-between"}>
                            <input type={"text"} readOnly className={"outline-none flex-1 min-w-0 placeholder:text-gray-700 text-grey-200 text-text-preset-1 font-text-preset-1 leading-text-preset-1"} placeholder={"P4$5W0rD!"} value={password}/>
                            <div className={"flex items-center gap-4"}>
                                {isCopied && (
                                    <p className={"text-green-200 text-text-preset-3 font-text-preset-3 leading-text-preset-3"}>COPIED</p>
                                )}
                                <button type={"button"} className={"flex justify-center items-center"} onClick={handleCopyPasswordToClipboard}>
                                    <img src={CopyIcon} alt={"copy-icon"}/>
                                </button>
                            </div>

                        </div>

                        <div className={"py-6 px-8 bg-grey-800"}>
                            <div className={"flex flex-col gap-8"}>
                                <div className={"flex flex-col gap-4"}>
                                    <div className={"flex items-center justify-between"}>
                                        <p className={"text-text-preset-4 sm:text-text-preset-3 text-gray-200 font-text-preset-4 sm:font-text-preset-3 leading-text-preset-4 sm:leading-text-preset-3"}>Character Length</p>
                                        <p className={"text-text-preset-4 sm:text-text-preset-1 text-green-200 font-text-preset-4 sm:font-text-preset-1 leading-text-preset-4 sm:leading-text-preset-1"}>{length}</p>
                                    </div>
                                    <div ref={trackRef} className={"relative bg-grey-850 h-2 cursor-pointer"} onMouseDown={handleMouseDown}>
                                        <div className={"absolute left-0 top-0 h-full bg-green-200 rounded-full"} style={{ width: `${percent}%`}}></div>
                                        <div className={`absolute rounded-full cursor-pointer bg-gray-200 focus:bg-grey-850 w-7 h-7 top-1/2 -translate-y-1/2`} style={{left: `calc(${percent}% - 14px)`}}
                                        ></div>
                                    </div>
                                </div>
                                <div className={"flex flex-col gap-4"}>
                                    {CONDITIONS_OPTIONS.map((option) => {
                                        const checkedOptions = isChecked.includes(option.key)
                                        return (
                                            <div key={option.key} className={"flex items-center gap-6"}>
                                                <div onClick={() => handleChecked(option.key)}
                                                     className={`w-5 h-5 border-2 border-grey-200 relative cursor-pointer ${checkedOptions && "bg-green-200"}`}>
                                                    {checkedOptions && <div
                                                        className={"flex justify-center items-center absolute inset-0"}>
                                                        <img src={CheckIcon} alt={"check-icon"}/>
                                                    </div>}

                                                </div>
                                                <p className={"text-grey-200 text-text-preset-4 sm:text-text-preset-3 font-text-preset-4 sm:font-text-preset-3 leading-text-preset-4 sm:leading-text-preset-3"}>{option.value}</p>
                                            </div>
                                        )
                                    })}

                                </div>
                                <div className={"py-6 px-8 flex justify-between items-center bg-grey-850"}>
                                    <h1 className={"text-grey-600 text-text-preset-4 sm:text-text-preset-3 font-text-preset-4 sm:font-text-preset-3 leading-text-preset-4 sm:leading-text-preset-3"}>STRENGTH</h1>
                                    <div className={"flex items-center gap-3"}>
                                        {strengthConfig && (
                                            <span className={"text-grey-200 text-text-preset-2 font-text-preset-2 leading-text-preset-2"}>{strengthConfig.label}</span>
                                        )}
                                        <div className={"flex gap-2"}>
                                            {STRENGTH_LEVELS.map((_, index) => (
                                                <div key={index} className={`border-2 ${strengthConfig && index < strengthConfig.level ? strengthConfig.color : "border-grey-200"}  w-2.5 h-7`}></div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                                <button className={"py-6 flex justify-center items-center gap-6 bg-green-200 group focus:bg-transparent focus:outline-2 focus:outline-green-200"} onClick={handleGenerate}>
                                    <h1 className={"text-grey-800 text-text-preset-4 sm:text-text-preset-3 font-text-preset-4 sm:font-text-preset-3 leading-text-preset-4 sm:leading-text-preset-3 group-focus:text-green-200"}>GENERATE</h1>
                                    <div className={"flex justify-center items-center"}>
                                        <ArrowRightIcon className={"text-grey-800 group-focus:text-green-200"}/>
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