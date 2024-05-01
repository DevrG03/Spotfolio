import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { PiCaretDown, PiShuffleBold, PiSkipBackFill, PiSkipForwardFill, PiPlayCircleFill, PiPauseCircleFill, PiSpotifyLogoBold, PiArrowCircleDownBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { LuRepeat1 } from "react-icons/lu";
import { TbDevices2, TbPlayerPlayFilled } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import Marquee from "react-fast-marquee";
import Slider from '@mui/material/Slider';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, onSnapshot, increment } from 'firebase/firestore';
import firebaseconfig from '@/private/firebaseconfig';
import Link from 'next/link';
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from '@mui/material/styles';
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { ImGithub } from "react-icons/im";
import { IoArrowBack, IoPause, IoDocumentText } from "react-icons/io5";
import { GrShareOption } from "react-icons/gr";
import clipboardCopy from 'clipboard-copy';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// Share Button --------------------------------

const message = 'Check out this amazing spotfolio!: devrajsinhgohil.tech';

const handleCopy = () => {
    clipboardCopy(message)
        .then(() => {
            console.log('Link copied to clipboard');
            toast.success('Link copied to clipboard');
        })
        .catch(err => {
            console.log('Failed to copy link: ', err);
            toast.error('Failed to copy link');
        });
};
// ---------------------------------------------

// Firebase -------------------------------------
const firebaseConfig = firebaseconfig;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// ----------------------------------------------

const MobileLanding = () => {
    const [delayLoop, setDelayLoop] = useState(true);
    const [delayLoop2, setDelayLoop2] = useState(true);
    const [delayLoop3, setDelayLoop3] = useState(true);
    const [delayLoop4, setDelayLoop4] = useState(true);
    const [delayLoop5, setDelayLoop5] = useState(true);
    const [delayLoop6, setDelayLoop6] = useState(true);
    const [delayLoop7, setDelayLoop7] = useState(true);
    const [delayLoop8, setDelayLoop8] = useState(true);
    const [delayLoop9, setDelayLoop9] = useState(true);
    const [delayLoop10, setDelayLoop10] = useState(true);
    const [delayLoop11, setDelayLoop11] = useState(true);
    const [delayLoop12, setDelayLoop12] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const [likes, setLikes] = useState(0)
    const [hasLiked, setHasLiked] = useState(false)
    const [isClicked, setIsClicked] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const divRef = useRef(null);

    // Collapse ------------------------------------
    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    // ---------------------------------------------

    // handlelikes ---------------------------------
    useEffect(() => {
        const likesRef = doc(db, 'likes', 'likeCount');
        onSnapshot(likesRef, (doc) => {
            setLikes(doc.data().count);
        });
        // Check if the user has already liked
        const likedStatus = localStorage.getItem('hasLiked');
        if (likedStatus) {
            setHasLiked(true);
            setIsLiked(true);
        }
    }, []);

    const handleLike = () => {
        if (!hasLiked) {
            const likesRef = doc(db, 'likes', 'likeCount');
            updateDoc(likesRef, {
                count: increment(1),
            });
            setHasLiked(true);
            setIsLiked(!isLiked)
            setIsClicked(true);

            // Store the like status in localStorage
            localStorage.setItem('hasLiked', 'true');
        } else {
            const likesRef = doc(db, 'likes', 'likeCount');
            updateDoc(likesRef, {
                count: increment(-1),
            });
            setHasLiked(false);
            setIsLiked(!isLiked)
            setIsClicked(true);
            // Remove the like status from localStorage
            localStorage.removeItem('hasLiked');
        }
    };
    // --------------------------------------------

    // porgbarrrrrr--------------------------------
    useEffect(() => {
        audioRef.current.addEventListener('timeupdate', async () => {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        });
    }, []);

    const handleTimeUpdate = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(audioRef.current.currentTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // --------------------------------------------


    // Audio play pause ---------------------------
    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };
    const handleSkipPrevious = () => {
        const audio = document.getElementById('audio');
        audio.currentTime = 0;
        setCurrentTime(audio.currentTime);
    };

    const handleSkipNext = () => {
        const audio = document.getElementById('audio');
        audio.currentTime = duration;
        setCurrentTime(audio.currentTime);
    };
    // --------------------------------------------


    // Delayed Marquee ----------------------------
    const setDelayedLoop = async () => {
        setDelayLoop(false);
        setTimeout(() => {
            setDelayLoop(true);
        }, 1000);
    };
    const setDelayedLoop2 = async () => {
        setDelayLoop2(false);
        setTimeout(() => {
            setDelayLoop2(true);
        }, 1000);
    };
    const setDelayedLoop3 = async () => {
        setDelayLoop3(false);
        setTimeout(() => {
            setDelayLoop3(true);
        }, 1000);
    };
    const setDelayedLoop4 = async () => {
        setDelayLoop4(false);
        setTimeout(() => {
            setDelayLoop4(true);
        }, 1000);
    };
    const setDelayedLoop5 = async () => {
        setDelayLoop5(false);
        setTimeout(() => {
            setDelayLoop5(true);
        }, 1000);
    };
    const setDelayedLoop6 = async () => {
        setDelayLoop6(false);
        setTimeout(() => {
            setDelayLoop6(true);
        }, 1000);
    };
    const setDelayedLoop7 = async () => {
        setDelayLoop7(false);
        setTimeout(() => {
            setDelayLoop7(true);
        }, 1000);
    };
    const setDelayedLoop8 = async () => {
        setDelayLoop8(false);
        setTimeout(() => {
            setDelayLoop8(true);
        }, 1000);
    };
    const setDelayedLoop9 = async () => {
        setDelayLoop9(false);
        setTimeout(() => {
            setDelayLoop9(true);
        }, 1000);
    };
    const setDelayedLoop10 = async () => {
        setDelayLoop10(false);
        setTimeout(() => {
            setDelayLoop10(true);
        }, 1000);
    };
    const setDelayedLoop11 = async () => {
        setDelayLoop11(false);
        setTimeout(() => {
            setDelayLoop11(true);
        }, 1000);
    };
    const setDelayedLoop12 = async () => {
        setDelayLoop12(false);
        setTimeout(() => {
            setDelayLoop12(true);
        }, 1000);
    };
    // --------------------------------------------

    // drawer -------------------------------------
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const Puller = styled('div')(({ theme }) => ({
        width: 35,
        height: 3.5,
        backgroundColor: '#757474',
        borderRadius: 3,
        position: 'absolute',
        top: 8,
        left: 'calc(50% - 15px)',
    }));
    // --------------------------------------------

    return (
        <>
            <audio ref={audioRef} src="song.mp3" id='audio' loop />
            <div className={`${isCollapsed ? 'mbar' : 'hidden'} text-white overflow-hidden`}>
                <div className='w-full flex flex-col items-center justify-center px-[1rem] pb-[5rem]'>
                    <IoArrowBack className='absolute left-3 top-5 text-[1.7rem] opacity-[0.7]' onClick={handleCollapse} />
                    <div className='w-[100vw] flex justify-center items-center grdbg pt-[1.5rem] px-[1rem] flex-col'>
                        <div className='imgshd flex items-start justify-start bg-[url(../public/happy.jpg)] w-[220px] h-[220px] bg-center bg-contain bg-no-repeat mb-[1.2rem]'>
                            <PiSpotifyLogoBold className='text-[1.2rem] rotate-[10deg] relative top-2 left-2' />
                        </div>

                        <div>
                            <div className='w-full font-[CBook] text-[0.8rem] text-[#b1b1b1dd]'>
                                <span>
                                    Happy, cheerful, supportive, curious, and always ready to learn new things are some of my characteristics.
                                </span>
                            </div>
                            <div className='pt-2 flex items-center justify-start gap-1'>
                                <PiSpotifyLogoBold className='text-[1.5rem] text-spgreen rotate-[10deg]' />
                                <span className='font-[CMedium] text-[0.85rem]'>Spotfolio</span>
                            </div>
                            <div className='w-full pt-2 font-[CBook] text-[0.8rem] text-[#b1b1b1dd]'>
                                <span className='text-[0.9rem]'>{likes}</span> likes
                            </div>
                            <div className='pt-2 flex items-center justify-between'>
                                <div className='flex items-center justify-evenly gap-[1.5rem] text-[#b1b1b1dd]'>
                                    <div className='text-[1.55rem]'>
                                        {isLiked ? (
                                            <FaCircleCheck className={`${isLiked && isClicked ? 'spin' : ''} text-spgreen`} onClick={handleLike} />
                                        ) : (
                                            <FiPlusCircle className={`${isLiked && isClicked ? '' : 'spin-r'}`} onClick={handleLike} />
                                        )}
                                    </div>
                                    <a href="https://drive.google.com/file/d/1k11M8GW7oYdy3g4Bo0jOHEwQCSg-Nwqi/view" target='_blank'><PiArrowCircleDownBold className='text-[1.65rem]' /></a>
                                    <GrShareOption className='text-[1.4rem]' onClick={handleCopy} />
                                    <ToastContainer />
                                    <BsThreeDotsVertical className='text-[1.7rem]' onClick={toggleDrawer(true)} />
                                </div>
                                <div className='flex items-center justify-end gap-2'>
                                    <div>
                                        <PiShuffleBold className='text-[1.7rem] text-[#b1b1b1dd]' />
                                    </div>
                                    <div className='text-[3.7rem] text-spgreen'>
                                        {isPlaying ? (
                                            <PiPauseCircleFill onClick={handlePlayPause} />
                                        ) : (
                                            <PiPlayCircleFill onClick={handlePlayPause} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <section className='flex flex-col font-[CBook]'>
                            <span>Education</span>
                            <hr className='w-full pb-4 text-[#b1b1b1dd]' />
                            <div className='w-full flex flex-col justify-center items-center gap-4'>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/gtu.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1 w-full'>
                                        <span>B.E. Computer Engineering</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                            <Marquee speed={30} delay={1} play={delayLoop4} onCycleComplete={() => setDelayedLoop4()}>
                                                <span>
                                                    &nbsp; CGPA: 7.8/10 , 2021 - 2025, Gujarat Technological University, Ahmedabad&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                                </span>
                                            </Marquee>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/iitm.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1 w-full'>
                                        <span>B.S. Data Science and Applications</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                            <Marquee speed={30} delay={1} play={delayLoop5} onCycleComplete={() => setDelayedLoop5()}>
                                                <span>
                                                    &nbsp; CGPA: 8.0/10 , 2023 - 2027, Indian Institute of Technology Madras, Chennai &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                                </span>
                                            </Marquee>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='flex flex-col font-[CBook] pt-[1.8rem]'>
                            <span>Tech Stack</span>
                            <hr className='w-full pb-4 text-[#b1b1b1dd]' />
                            <div className='w-full flex flex-col justify-center items-center gap-4'>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/prog.jpg" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1 w-full'>
                                        <span>Programming</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                            <span>
                                                C, C++, Python, Java, JavaScript
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/web.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1 w-full'>
                                        <span>Web Developemnt</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                            <span>
                                                ReactJS, NextJS, Tailwind, ThreeJS&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/ai.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1 w-full'>
                                        <span>AI and ML</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                            <Marquee speed={30} delay={1} play={delayLoop6} onCycleComplete={() => setDelayedLoop6()}>
                                                <span>
                                                    &nbsp;Data Analytics, PyTorch, Tensorflow, LLM, Streamlit, LangChain&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                </span>
                                            </Marquee>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/qc.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1 w-full'>
                                        <span>Quantum Computing</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                            <span>
                                                Qiskit, Cirq
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='flex flex-col font-[CBook] pt-[1.8rem]'>
                            <span>Experience</span>
                            <hr className='w-full pb-4 text-[#b1b1b1dd]' />
                            <div className='w-full flex flex-col justify-center items-center gap-4'>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/qs.jpg" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1 w-full'>
                                        <span>Research Intern</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                            <Marquee play={false}>
                                                <span>
                                                    QauntumShift (June 2023 - Janurary 2024)
                                                </span>
                                            </Marquee>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/hf.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1 w-full'>
                                        <span>Open Source</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                            <Marquee play={false}>
                                                <span>
                                                    Hacktoberfest (October 2023)
                                                </span>
                                            </Marquee>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/rl.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1 w-full'>
                                        <span>Technical Associate Trainee</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                            <Marquee play={false}>
                                                <span>
                                                    RuDe Labs (June 2022 - August 2022)
                                                </span>
                                            </Marquee>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='flex flex-col font-[CBook] pt-[1.8rem]'>
                            <span>Volunteer</span>
                            <hr className='w-full pb-4 text-[#b1b1b1dd]' />
                            <div className='w-full flex flex-col justify-center items-center gap-4'>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/gdsc.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1 w-full'>
                                        <span>Google Developer Student Club</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                            <span>
                                                Machine Learning Facilitator
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/mlsa.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1'>
                                        <span>Microsoft Learn Student Ambassador</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>

                                            <span>
                                                Mile Stone: Beta
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='flex flex-col font-[CBook] pt-[1.8rem]'>
                            <span>Projects</span>
                            <hr className='w-full pb-4 text-[#b1b1b1dd]' />
                            <div className='w-full flex flex-col justify-start items-center gap-4'>
                                <a href="https://github.com/Devrajsinh-Gohil/message-encryption" target='_blank'>
                                    <div className='w-full flex items-center justify-start gap-4'>
                                        <Image src="/gh.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                        <div className='flex flex-col gap-1 w-full'>
                                            <span>Text encryption (C++)</span>
                                            <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                                <Marquee speed={50} delay={1} play={delayLoop7} onCycleComplete={() => setDelayedLoop7()}>
                                                    <span>
                                                        &nbsp;This C++ program encrypts text using a 2-D array, offering a basic yet effective encryption method, providing privacy and security for sensitive messages or data.&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                                    </span>
                                                </Marquee>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="https://github.com/Devrajsinh-Gohil/My-Browser" target='_blank'>
                                    <div className='w-full flex items-center justify-start gap-4'>
                                        <Image src="/gh.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                        <div className='flex flex-col gap-1 w-full'>
                                            <span>Web Browser (Python)</span>
                                            <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                                <Marquee speed={50} delay={1} play={delayLoop8} onCycleComplete={() => setDelayedLoop8()}>
                                                    <span>
                                                        &nbsp;A personal web browser developed using Python and PyQT5, providing a seamless browsing experience with modern features.&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                                    </span>
                                                </Marquee>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="https://github.com/Devrajsinh-Gohil/Face_Attendence" target='_blank'>
                                    <div className='w-full flex items-center justify-start gap-4'>
                                        <Image src="/gh.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                        <div className='flex flex-col gap-1 w-full'>
                                            <span>Attendance System (OpenCV)</span>
                                            <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                                <Marquee speed={50} delay={1} play={delayLoop9} onCycleComplete={() => setDelayedLoop9()}>
                                                    <span>
                                                        &nbsp;Utilizing facial recognition with OpenCV, this system automates the attendance process by accurately identifying and logging individuas, streamlining administrative tasks and ensuring efficient record-keeping.&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                                    </span>
                                                </Marquee>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="https://github.com/Devrajsinh-Gohil/ML" target='_blank'>
                                    <div className='w-full flex items-center justify-start gap-4'>
                                        <Image src="/gh.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                        <div className='flex flex-col gap-1 w-full'>
                                            <span>Competitiveness Prediction (ML)</span>
                                            <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                                <Marquee speed={50} delay={1} play={delayLoop10} onCycleComplete={() => setDelayedLoop10()}>
                                                    <span>
                                                        &nbsp;A Regression ML model predicting an individual&apos;s competitiveness, enabling personalized insights for career development and organizational planning, enhancing decision-making based on data-driven analysis.&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                                    </span>
                                                </Marquee>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="https://github.com/Devrajsinh-Gohil/Quantum/blob/main/adder.ipynb" target='_blank'>
                                    <div className='w-full flex items-center justify-start gap-4'>
                                        <Image src="/gh.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                        <div className='flex flex-col gap-1 w-full'>
                                            <span>4-qubit Quantum Adder (Qiskit)</span>
                                            <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                                <Marquee speed={50} delay={1} play={delayLoop11} onCycleComplete={() => setDelayedLoop11()}>
                                                    <span>
                                                        &nbsp;Demonstrating quantum computing capabilities, this Qiskit project implements a 4-qubit quantum adder, showcasing the potential for quantum algorithms to perform complex calculations efficiently, paving the way for future advancements in computation.&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                                    </span>
                                                </Marquee>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="https://github.com/Devrajsinh-Gohil/UTP" target='_blank'>
                                    <div className='w-full flex items-center justify-start gap-4'>
                                        <Image src="/gh.png" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                        <div className='flex flex-col gap-1 w-full'>
                                            <span>Hiring system using NLP (Azure)</span>
                                            <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                                <Marquee speed={50} delay={1} play={delayLoop12} onCycleComplete={() => setDelayedLoop12()}>
                                                    <span>
                                                        &nbsp;Leveraging Azure NLP services, this a system facilitates the hiring process by matching organizations with the most suitable candidates based on natural language requests, optimizing recruitment efficiency and candidate selection.&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                                    </span>
                                                </Marquee>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </section>
                        <section className='flex flex-col font-[CBook] pt-[1.8rem]'>
                            <span>Achievements</span>
                            <hr className='w-full pb-4 text-[#b1b1b1dd]' />
                            <div className='w-full flex flex-col justify-center items-center gap-4'>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/gt.jpg" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1 w-full'>
                                        <span>GATE - 2024</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                            <span>
                                                DA - AIR 1519, CS - AIR 14161
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex items-center justify-start gap-4'>
                                    <Image src="/tk.jpg" alt="Landing Image" className='object-contain h-[45px] w-[45px]' width={250} height={250} priority />
                                    <div className='flex flex-col gap-1'>
                                        <span>Tark Codegenie 2024</span>
                                        <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.76rem] font-[600]'>
                                            <span>
                                                Winner
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className=' z-10 w-[95vw] h-fit bg-[#3b0101] bottom-[2vh] left-[2.5vw] right-[2.5vw] flex flex-col justify-between items-center rounded-[5px] overflow-hidden fixed shadb'>
                    <div className='flex justify-center items-center w-full px-[0.1rem] pt-[0.1rem]'>
                        <div className='flex items-center justify-start p-[5px] flex-[0.65] w-full gap-[1rem]'>
                            <div className='rounded-[5px] w-[3.58rem]' onClick={handleCollapse}>
                                <Image src="/dp.jpg" alt="Landing Image" className='h-auto rounded-[5px]' width={40} height={40} priority />
                            </div>
                            <div className='flex flex-col w-full'>
                                <div className='font-[CBold]  text-[0.7rem]'>
                                    <Marquee speed={20} delay={1} play={delayLoop3} onCycleComplete={() => setDelayedLoop3()}>
                                        &nbsp; Blue Bird but is it okay if it&apos;s lofi? &nbsp; &nbsp; &nbsp; &nbsp;
                                    </Marquee>
                                </div>
                                <div className=' text-[#b1b1b1dd] font-[CBook] text-[0.75rem]'>
                                    <span>KIJUGO</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex-[0.35] flex w-full items-center justify-evenly pr-2'>
                            <TbDevices2 className='text-[#e1e1e1] text-[1.8rem]' />
                            <div className='text-[1.8rem]'>
                                {isLiked ? (
                                    <FaCircleCheck className={`${isLiked && isClicked ? 'spin' : ''} text-spgreen`} onClick={handleLike} />
                                ) : (
                                    <FiPlusCircle className={`${isLiked && isClicked ? '' : 'spin-r'}`} onClick={handleLike} />
                                )}
                            </div>
                            <div className='text-[1.7rem]'>
                                {isPlaying ? (
                                    <IoPause onClick={handlePlayPause} />
                                ) : (
                                    <TbPlayerPlayFilled onClick={handlePlayPause} />
                                )}
                            </div>
                        </div>
                    </div>
                    <input type="range" max={duration} step={0.01} className='w-full prgbr-sm' onChange={handleTimeUpdate} value={currentTime} />
                </div>
            </div>
            <div ref={divRef} className={`${isCollapsed ? 'slide' : ''} z-10`}>
                <nav className='flex items-center justify-between text-white pt-[1rem] px-6 font-[CBook] mb-[2rem]'>
                    <PiCaretDown className='scale-[2]' onClick={handleCollapse} />
                    <div className='flex justify-center items-center flex-col'>
                        <span>
                            PLAYING FROM
                        </span>
                        <span>
                            India
                        </span>
                    </div>
                    <BsThreeDotsVertical className='scale-[1.35]' onClick={toggleDrawer(true)} />
                </nav>
                <section>
                    <div className='flex items-center justify-center w-full h-fit mb-[2rem]'>
                        <Image src="/dp.jpg" alt="Landing Image" width={250} height={250} className='w-[85%] h-auto rounded-[10px]' priority />
                    </div>
                </section>
                <section className='flex items-center justify-center flex-col text-white'>
                    <div className='pt-[30px] w-[85%] flex items-center justify-center flex-row gap-[2rem]'>
                        <div className='flex flex-col'>
                            <div className='font-[CBold]  text-[1.4rem] font-[300]'>
                                <Marquee speed={20} delay={1} play={delayLoop} onCycleComplete={() => setDelayedLoop()}>
                                    Blue Bird but is it okay if it&apos;s lofi? &nbsp; &nbsp; &nbsp; &nbsp;
                                </Marquee>
                            </div>
                            <div className=' text-[#b1b1b1dd] font-[CLight] text-[0.9rem] font-[600]'>
                                <Marquee speed={40} delay={1} play={delayLoop2} onCycleComplete={() => setDelayedLoop2()}>
                                    &nbsp;I&apos;m Devrajsinh, and I am not the composer of this song. But you can give a like to this portfolio by clicking the plus icon according to latest spotify update.... &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                </Marquee>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-1'>
                            <div className='text-[1.8rem]'>
                                {isLiked ? (
                                    <FaCircleCheck className={`${isLiked && isClicked ? 'spin' : ''} text-spgreen`} onClick={handleLike} />
                                ) : (
                                    <FiPlusCircle className={`${isLiked && isClicked ? '' : 'spin-r'}`} onClick={handleLike} />
                                )}
                            </div>
                            <div className={`font-[CBook]  ${isLiked ? 'text-spgreen' : ''}`}>
                                {likes}
                            </div>
                        </div>
                    </div>
                    <div className='w-[85%] h-fit flex flex-col'>
                        <Slider
                            max={duration}
                            value={currentTime}
                            onChange={handleTimeUpdate}
                            sx={{
                                height: 3,
                                color: '#fff',
                                '& .MuiSlider-thumb': {
                                    width: 7,
                                    height: 7,
                                    borderRadius: '100%',
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#535353',
                                },
                            }}
                        />
                        <div className='w-full flex justify-between text-gray text-[0.69rem] font-[CLight] timer'>
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between items-center w-[85%]'>
                        <div><PiShuffleBold className='text-[1.8rem] text-[#d0d0d0]' /></div>
                        <div className='flex flex-row justify-center items-center gap-[1rem]'>
                            <PiSkipBackFill className='text-[2rem] ' onClick={handleSkipPrevious} />
                            {isPlaying ? (
                                <PiPauseCircleFill onClick={handlePlayPause} fontSize='large' style={{ fontSize: '4.5rem' }} />
                            ) : (
                                <PiPlayCircleFill onClick={handlePlayPause} fontSize='large' style={{ fontSize: '4.5rem' }} />
                            )}
                            <PiSkipForwardFill className='text-[2rem] ' onClick={handleSkipNext} />
                        </div>
                        <div>
                            <LuRepeat1 className='text-spgreen text-[1.8rem]' />
                        </div>
                    </div>
                    <div className='flex items-center justify-between w-[85%] font-bold mt-[1rem] mb-[2rem]'>
                        <span>
                            <TbDevices2 className='text-[1.5rem]' />
                        </span>
                        <span className='flex items-center justify-between gap-[1.5rem]'>
                            <GrShareOption className='text-[1.4rem]' onClick={handleCopy} />
                            <ToastContainer />
                            <HiOutlineQueueList className='text-[1.5rem]' />
                        </span>
                    </div>
                </section>
                <section className='flex flex-col justify-center items-center' id='lyrics'>
                    <div className='text-white rounded-[20px] bg-red mt-[1rem] flex-[0.25] w-[85vw] justify-center items-start text-left pb-[1rem]'>
                        <div className='font-[CBold] flex items-center p-[1rem]'>
                            <span>
                                <button className='bg-transparent'><Link href="#lyrics" className='no-underline cursor-pointer text-[1rem]'>Lyrics</Link></button>
                            </span>
                        </div>
                        <div className='font-[CBold] p-[1rem] pt-0 text-[1.5rem] h-[30vh] overflow-scroll'>
                            <span>
                                Hey there! I&apos;m Devrajsinh Gohil, and I&apos;m passionate about all things tech. You can call me the Code Maestro because I love delving into the intricate world of technology and crafting solutions that make a difference. Whether it's developing web applications or mobile platforms, always eager to explore new ideas and bring them to life through coding. I take great pride in creating elegant and efficient solutions that not only solve problems but also inspire innovation. My website is a showcase of my dreams and digital creations, where every line of code tells a story of creativity and magic. I believe that the synergy of code and creativity can lead to incredible outcomes, and I welcome you to my world where innovation is the key. So, let&apos;s join forces and shine together in the realm of code and creativity!
                            </span>
                        </div>
                    </div>
                </section>
                <section className='flex flex-col justify-center items-center' id='artist'>
                    <div className='text-white rounded-[20px] flex-[0.25] flex-col justify-center items-start w-[85vw] bg-[rgb(49,49,49)] text-left pb-[1rem] overflow-hidden my-[1.5rem]'>
                        <div className='font-[CBold] flex flex-col items-start justify-start p-[1rem] bg-center bg-no-repeat bg-[url("../public/artname.jpg")] bg-contain h-[25vh] bg-[#01000E]'>
                            <span>
                                <button className='bg-transparent'><Link href="#artist" className='no-underline cursor-pointer text-[1rem]'>Artist of the Music</Link></button>
                            </span>
                        </div>
                        <div className='flex items-center justify-between p-[1rem] h-fit overflow-scroll'>
                            <div className='flex flex-col'>
                                <span className='font-[CBold] flex flex-col text-[1.25rem]'>Kijugo</span>
                                <span className='text-[rgb(172, 172, 172)] mt-[0.3rem] font-[CMedium] flex flex-col text-[0.8rem]'>190K+ followers</span>
                            </div>
                            <div className='no-underline text-white text-[0.9rem] bg-transparent border border-[rgb(172,172,172)] font-[CBold] py-[5px] px-[10px] rounded-[30px]'>
                                <a href='https://open.spotify.com/artist/7HjVvgY9p57LOIrGyulrVU?si=dRL5qNxjT460ZtXfrOsA2Q' target='_blank'>Follow</a>
                            </div>
                        </div>
                    </div>
                </section>
                <SwipeableDrawer
                    anchor='bottom'
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    sx={{
                        '& .MuiPaper-root ': { borderTopLeftRadius: '10px', borderTopRightRadius: '10px', backgroundColor: '#222020' },
                    }}
                >
                    <Puller />
                    <div className='bg-[#222020] text-[#c4c4c4] font-[CBook]'>
                        <div className='flex p-4 items-center justify-start'>
                            <div>
                                <Image src="/dp.jpg" alt="Landing Image" width={50} height={50} className='w-[85%] h-auto rounded-[1px] flex-[0.25]' priority />
                            </div>
                            <div className='flex flex-col'>
                                <span>OH Hi!</span>
                                <span className='text-[0.7rem] text-gray'>Wanna know more about me?</span>
                            </div>
                        </div>
                        <hr className='w-[100vw] h-[1px] text-[#555]' />
                        <ul className='list-none flex flex-col gap-[1rem] p-4 text-[1.3rem] no-underline'>
                            <li className='flex items-center justify-start gap-[1rem]'>
                                <span><IoDocumentText /></span>
                                <span className=' cursor-pointer text-[1rem]'><a href="https://drive.google.com/file/d/1k11M8GW7oYdy3g4Bo0jOHEwQCSg-Nwqi/view" target='_blank'>resume</a></span>
                            </li>
                            <li className='flex items-center justify-start gap-[1rem]'>
                                <span className=''><FaLinkedinIn /></span>
                                <span className=' cursor-pointer text-[1rem]'><a href="https://www.linkedin.com/in/devrajsinh/" target='_blank'>let&apos;s connect</a></span>
                            </li>
                            <li className='flex items-center justify-start gap-[1rem]'>
                                <span><ImGithub /></span>
                                <span className=' cursor-pointer text-[1rem]'><a href="https://github.com/Devrajsinh-Gohil" target='_blank'>git it</a></span>
                            </li>
                            <li className='flex items-center justify-start gap-[1rem]'>
                                <span><BsTwitterX /></span>
                                <span className=' cursor-pointer text-[1rem]'><a href="https://twitter.com/DevrajsinhGohi5" target='_blank'>@devrajsinhdohi5</a></span>
                            </li>
                            <li className='flex items-center justify-start gap-[1rem]'>
                                <span><BiLogoGmail /></span>
                                <span className=' cursor-pointer text-[1rem]'><a href="mailto:devrajsinhgohil03@gmail.com" target='_blank'>a formal media</a></span>
                            </li>
                        </ul>
                    </div>
                </SwipeableDrawer>
            </div>
        </>
    )
}

export default MobileLanding