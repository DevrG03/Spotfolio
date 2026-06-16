'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  PiShuffleBold, PiSkipBackFill, PiSkipForwardFill,
  PiPlayCircleFill, PiPauseCircleFill,
  PiPlayFill, PiPauseFill,
  PiSpotifyLogoBold,
  PiArrowCircleDownBold, PiUsersBold, PiSpeakerHighBold,
} from "react-icons/pi"
import { BsThreeDotsVertical, BsTwitterX, BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { FaCircleCheck, FaLinkedinIn, FaPlay, FaPause } from "react-icons/fa6"
import { FiPlusCircle } from "react-icons/fi"
import { LuRepeat1 } from "react-icons/lu"
import { TbDevices2 } from "react-icons/tb"
import { HiOutlineQueueList, HiOutlineMagnifyingGlass, HiOutlineBell } from "react-icons/hi2"
import { BiLogoGmail } from "react-icons/bi"
import { ImGithub } from "react-icons/im"
import { IoDocumentText } from "react-icons/io5"
import { GrShareOption } from "react-icons/gr"
import { MdOpenInFull } from "react-icons/md"
import Marquee from "react-fast-marquee"
import Slider from '@mui/material/Slider'
import { getApps, initializeApp } from 'firebase/app'
import { getFirestore, doc, updateDoc, onSnapshot, increment } from 'firebase/firestore'
import firebaseconfig from '@/private/firebaseconfig'
import clipboardCopy from 'clipboard-copy'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const message = 'Check out this amazing spotfolio!: spotfolio.vercel.app'
const handleCopy = () => {
  clipboardCopy(message)
    .then(() => toast.success('Link copied to clipboard'))
    .catch(() => toast.error('Failed to copy link'))
}

const firebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseconfig)
const db = getFirestore(firebaseApp)

const LIBRARY_ITEMS = [
  { id: 'about',        img: '/dp.jpg',    title: 'About Me',     sub: 'Portfolio · Devrajsinh',    rounded: true  },
  { id: 'education',    img: '/dau.jpg',   title: 'Education',    sub: 'Degrees · 2 institutions',  rounded: false, contain: true },
  { id: 'techstack',    img: '/ai.png',    title: 'Tech Stack',   sub: 'Skills · 6 areas',          rounded: false },
  { id: 'experience',   img: '/qs.jpg',    title: 'Experience',   sub: 'Work · 5 roles',            rounded: false },
  { id: 'volunteer',    img: '/gdsc.png',  title: 'Volunteer',    sub: 'Community · 2 roles',       rounded: true  },
  { id: 'projects',     img: '/gh.png',    title: 'Projects',     sub: 'Code · 8 projects',         rounded: false },
  { id: 'achievements', img: '/gt.jpg',    title: 'Achievements', sub: 'Awards · 3 trophies',       rounded: false },
]

const sliderSx = (height = 4, thumbSize = 12) => ({
  height,
  color: '#fff',
  padding: '6px 0',
  '& .MuiSlider-thumb': {
    width: thumbSize,
    height: thumbSize,
    transition: 'none',
    '&:hover, &.Mui-focusVisible': { boxShadow: 'none' },
  },
  '& .MuiSlider-rail': { backgroundColor: '#535353' },
})

const DesktopLanding = () => {
  const [isPlaying, setIsPlaying]   = useState(false)
  const [isLiked, setIsLiked]       = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration]     = useState(0)
  const [likes, setLikes]           = useState(0)
  const [hasLiked, setHasLiked]     = useState(false)
  const [isClicked, setIsClicked]   = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [volume, setVolume]         = useState(70)
  const audioRef = useRef(null)
  const mainRef  = useRef(null)

  useEffect(() => {
    const likesRef = doc(db, 'likes', 'likeCount')
    const unsub = onSnapshot(likesRef, (snap) => setLikes(snap.data().count))
    if (localStorage.getItem('hasLiked')) { setHasLiked(true); setIsLiked(true) }
    return () => unsub()
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    const update = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration || 0)
    }
    audio.addEventListener('timeupdate', update)
    return () => audio.removeEventListener('timeupdate', update)
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100
  }, [volume])

  const handleLike = () => {
    const ref = doc(db, 'likes', 'likeCount')
    if (!hasLiked) {
      updateDoc(ref, { count: increment(1) })
      setHasLiked(true); setIsLiked(true); setIsClicked(true)
      localStorage.setItem('hasLiked', 'true')
    } else {
      updateDoc(ref, { count: increment(-1) })
      setHasLiked(false); setIsLiked(false); setIsClicked(true)
      localStorage.removeItem('hasLiked')
    }
  }

  const handlePlayPause = () => {
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false) }
    else           { audioRef.current.play();  setIsPlaying(true)  }
  }

  const handleSkipPrev = () => { audioRef.current.currentTime = 0;        setCurrentTime(0) }
  const handleSkipNext = () => { audioRef.current.currentTime = duration;  setCurrentTime(duration) }
  const handleSeek     = (_, v) => { audioRef.current.currentTime = v;    setCurrentTime(v) }

  const fmt = (t) => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const handleNavClick = (id) => {
    setActiveSection(id)
    const el = document.getElementById(`ds-${id}`)
    if (el && mainRef.current) mainRef.current.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
  }

  const LikeIcon = ({ size = '1.5rem' }) =>
    isLiked
      ? <FaCircleCheck style={{ fontSize: size }} className={`${isClicked ? 'spin' : ''} text-spgreen cursor-pointer`} onClick={handleLike} />
      : <FiPlusCircle  style={{ fontSize: size }} className="text-[#b3b3b3] hover:text-white transition-colors cursor-pointer" onClick={handleLike} />

  return (
    <>
      <audio ref={audioRef} src="song.mp3" id="audio-desktop" loop />
      <ToastContainer theme="dark" />

      <div className="flex flex-col h-screen bg-black overflow-hidden font-[CBook] text-white select-none">

        {/* ═══ Top Nav Bar ═══ */}
        <div className="h-[64px] bg-black flex items-center px-4 gap-4 shrink-0 z-10">
          {/* Back / Forward */}
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:bg-[#282828] transition-colors">
              <BsChevronLeft className="text-[0.85rem]" />
            </button>
            <button className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#4a4a4a] cursor-not-allowed">
              <BsChevronRight className="text-[0.85rem]" />
            </button>
          </div>
          {/* Search bar */}
          <div className="flex-1 max-w-[480px] mx-auto relative">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3] text-[1.05rem] pointer-events-none" />
            <input
              type="text"
              placeholder="What do you want to play?"
              readOnly
              className="w-full bg-[#2a2a2a] text-white placeholder-[#b3b3b3] rounded-full py-[9px] pl-10 pr-4 text-[0.85rem] focus:outline-none focus:bg-[#333] cursor-default"
            />
          </div>
          {/* Right icons */}
          <div className="flex items-center gap-3 ml-auto">
            <button className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#b3b3b3] hover:text-white hover:bg-[#282828] transition-colors">
              <HiOutlineBell className="text-[1.1rem]" />
            </button>
            <button className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#b3b3b3] hover:text-white hover:bg-[#282828] transition-colors">
              <PiUsersBold className="text-[1rem]" />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#c13584] flex items-center justify-center text-white font-[CBold] text-[0.9rem] hover:scale-105 transition-transform">
              D
            </button>
          </div>
        </div>

        {/* ═══ Main 3-panel area ═══ */}
        <div className="flex flex-1 gap-2 p-2 pt-0 overflow-hidden">

          {/* ── Left Sidebar ── */}
          <aside className="w-[240px] shrink-0 flex flex-col">
            <div className="bg-[#121212] rounded-lg flex flex-col flex-1 overflow-hidden">

              {/* Library header */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <div className="flex items-center gap-2">
                  <PiSpotifyLogoBold className="text-[#b3b3b3] text-[1.3rem]" />
                  <span className="font-[CBold] text-[0.95rem] text-[#b3b3b3]">Your Library</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-full hover:bg-[#282828] flex items-center justify-center text-[#b3b3b3] hover:text-white transition-colors text-[1.2rem] font-[CLight]">
                    +
                  </button>
                  <button className="w-8 h-8 rounded-full hover:bg-[#282828] flex items-center justify-center text-[#b3b3b3] hover:text-white transition-colors">
                    <MdOpenInFull className="text-[0.85rem]" />
                  </button>
                </div>
              </div>

              {/* Filter pills */}
              <div className="flex gap-2 px-3 pb-3 overflow-x-auto scrollbar-hide">
                {['All', 'Work', 'Life'].map((pill) => (
                  <button key={pill}
                    className="bg-[#2a2a2a] hover:bg-[#333] text-white text-[0.76rem] font-[CMedium] px-3 py-1.5 rounded-full whitespace-nowrap transition-colors shrink-0">
                    {pill}
                  </button>
                ))}
              </div>

              {/* Search + sort row */}
              <div className="flex items-center justify-between px-3 pb-2">
                <button className="w-8 h-8 flex items-center justify-center text-[#b3b3b3] hover:text-white transition-colors">
                  <HiOutlineMagnifyingGlass className="text-[1.1rem]" />
                </button>
                <button className="flex items-center gap-1.5 text-[#b3b3b3] hover:text-white transition-colors">
                  <span className="text-[0.78rem] font-[CMedium]">Recents</span>
                  <HiOutlineQueueList className="text-[0.95rem]" />
                </button>
              </div>

              {/* Library items */}
              <div className="flex-1 overflow-y-auto scrollbar-hide px-2 pb-2">
                {LIBRARY_ITEMS.map(({ id, img, title, sub, rounded, contain }) => (
                  <button key={id} onClick={() => handleNavClick(id)}
                    className={`flex items-center gap-3 p-2 rounded-md w-full text-left transition-colors group ${
                      activeSection === id ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'
                    }`}>
                    <div className={`w-[44px] h-[44px] shrink-0 overflow-hidden ${rounded ? 'rounded-full' : 'rounded-[4px]'} ${contain ? 'bg-white' : ''}`}>
                      <Image src={img} alt={title} width={44} height={44}
                        className={`w-[44px] h-[44px] ${contain ? 'object-contain p-1' : 'object-cover'}`} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-[0.87rem] font-[CMedium] truncate ${activeSection === id ? 'text-spgreen' : 'text-white'}`}>
                        {title}
                      </span>
                      <span className="text-[#b3b3b3] text-[0.73rem] font-[CLight] truncate">{sub}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Connect footer */}
              <div className="border-t border-[#282828] px-4 py-3 flex flex-col gap-1">
                <p className="text-[#b3b3b3] text-[0.68rem] font-[CLight] uppercase tracking-widest mb-1">Connect</p>
                <div className="flex items-center justify-between">
                  {[
                    { href: 'https://www.linkedin.com/in/devrajsinh/', Icon: FaLinkedinIn },
                    { href: 'https://github.com/Devrajsinh-Gohil', Icon: ImGithub },
                    { href: 'https://twitter.com/DevrajsinhGohi5', Icon: BsTwitterX },
                    { href: 'mailto:devrajsinhgohil03@gmail.com', Icon: BiLogoGmail },
                  ].map(({ href, Icon }) => (
                    <a key={href} href={href} target="_blank" rel="noreferrer"
                      className="w-8 h-8 rounded-full hover:bg-[#282828] flex items-center justify-center text-[#b3b3b3] hover:text-white transition-colors">
                      <Icon className="text-[0.9rem]" />
                    </a>
                  ))}
                  <a href="https://drive.google.com/file/d/1k11M8GW7oYdy3g4Bo0jOHEwQCSg-Nwqi/view" target="_blank" rel="noreferrer"
                    className="w-8 h-8 rounded-full hover:bg-[#282828] flex items-center justify-center text-spgreen hover:brightness-110 transition-all">
                    <IoDocumentText className="text-[0.9rem]" />
                  </a>
                </div>
              </div>

            </div>
          </aside>

          {/* ── Main Content ── */}
          <main ref={mainRef} className="flex-1 bg-[#121212] rounded-lg overflow-y-auto scrollbar-hide">

            {/* Hero + Action bar — single gradient wrapper so there's no seam */}
            <div id="ds-about"
              style={{ background: 'linear-gradient(to bottom, #bf2b2b 0%, #7a1414 40%, #3a0808 70%, #121212 100%)' }}>

              {/* Hero */}
              <div className="flex items-end px-8 pb-6 pt-20" style={{ minHeight: 320 }}>
                <div className="flex items-end gap-7">
                  <Image src="/dp.jpg" alt="Devrajsinh Gohil" width={220} height={220} priority
                    className="rounded-full shadow-2xl object-cover w-[200px] h-[200px] shrink-0 ring-4 ring-black/20" />
                  <div className="pb-2">
                    <p className="text-[0.73rem] font-[CBold] mb-3 tracking-widest uppercase drop-shadow">Portfolio</p>
                    <h1 className="font-[CBold] text-[4.8rem] leading-[1] mb-3 drop-shadow-lg">Devrajsinh Gohil</h1>
                    <p className="text-[#e0e0e0] text-[0.9rem] font-[CLight] drop-shadow">
                      M.Tech ICT &nbsp;·&nbsp; AI/ML &amp; Full Stack Developer &nbsp;·&nbsp; Quantum Computing
                    </p>
                    <p className="text-[#d0d0d0] text-[0.82rem] mt-1">
                      <span className="text-white font-[CMedium]">{likes}</span> people liked this
                    </p>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="flex items-center gap-5 px-8 py-5">
                <button onClick={handlePlayPause}
                  className="w-14 h-14 bg-spgreen rounded-full flex items-center justify-center hover:scale-[1.06] active:scale-95 transition-transform shadow-xl shrink-0">
                  {isPlaying
                    ? <FaPause style={{ color: '#000', fontSize: '1.2rem' }} />
                    : <FaPlay  style={{ color: '#000', fontSize: '1.2rem', marginLeft: '2px' }} />}
                </button>
                <LikeIcon size="2rem" />
                <a href="https://drive.google.com/file/d/1k11M8GW7oYdy3g4Bo0jOHEwQCSg-Nwqi/view" target="_blank" rel="noreferrer">
                  <PiArrowCircleDownBold className="text-[#b3b3b3] hover:text-white transition-colors text-[2rem] cursor-pointer" />
                </a>
                <GrShareOption className="text-[#b3b3b3] hover:text-white transition-colors text-[1.7rem] cursor-pointer" onClick={handleCopy} />
                <BsThreeDotsVertical className="text-[#b3b3b3] hover:text-white transition-colors text-[1.6rem] cursor-pointer" />
              </div>

            </div>

            {/* Sections */}
            <div className="px-8 pb-10 flex flex-col gap-10">

              {/* Education */}
              <section id="ds-education">
                <h2 className="font-[CBold] text-[1.35rem] mb-4">Education</h2>
                <div className="flex flex-col">
                  {[
                    { num: 1, img: '/dau.jpg', title: 'M.Tech – Information and Communication Technology', sub: 'Dhirubhai Ambani University · CPI: 8.75 · 2025 – Present · Gandhinagar, Gujarat' },
                    { num: 2, img: '/gtu.png', title: 'B.E. Computer Engineering', sub: 'GECR, Gujarat Technological University · CPI: 8.20 · 2021 – 2025 · Rajkot, Gujarat' },
                  ].map(({ num, img, title, sub }) => (
                    <div key={num} className="flex items-center gap-4 p-3 rounded-md hover:bg-[#1a1a1a] transition-colors group cursor-default">
                      <span className="text-[#b3b3b3] text-[0.88rem] w-5 shrink-0 group-hover:opacity-0">{num}</span>
                      <div className="w-[44px] h-[44px] shrink-0 rounded-sm bg-white overflow-hidden flex items-center justify-center">
                        <Image src={img} alt={title} width={44} height={44} className="w-[44px] h-[44px] object-contain p-1" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-[CMedium] text-[0.9rem]">{title}</span>
                        <span className="text-[#b3b3b3] text-[0.77rem] font-[CLight]">{sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tech Stack */}
              <section id="ds-techstack">
                <h2 className="font-[CBold] text-[1.35rem] mb-4">Tech Stack</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { img: '/prog.jpg',  title: 'Languages',        sub: 'C++, Python, Java, JavaScript, SQL' },
                    { img: '/web.png',   title: 'Web Development',   sub: 'React.js, Next.js, Tailwind, Bootstrap, Flask' },
                    { img: '/ai.png',    title: 'AI & ML',           sub: 'PyTorch, TensorFlow, LLM, LangChain, Streamlit' },
                    { img: '/qc.png',    title: 'Quantum Computing', sub: 'Qiskit, Cirq, Quantum ML' },
                    { img: '/web.png',   title: 'Cloud & Databases', sub: 'MongoDB, MySQL, Firebase, GCP, Azure, Docker' },
                    { img: '/prog.jpg',  title: 'Developer Tools',   sub: 'Git, Docker, VS Code, LLMs, FastAPI, MCP' },
                  ].map(({ img, title, sub }) => (
                    <div key={title} className="flex items-center gap-4 p-3 rounded-md bg-[#181818] hover:bg-[#222] transition-colors cursor-default">
                      <Image src={img} alt={title} width={46} height={46} className="rounded-sm object-contain w-[46px] h-[46px] shrink-0" />
                      <div className="min-w-0">
                        <p className="font-[CMedium] text-[0.88rem]">{title}</p>
                        <p className="text-[#b3b3b3] text-[0.74rem] font-[CLight] truncate">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Experience */}
              <section id="ds-experience">
                <h2 className="font-[CBold] text-[1.35rem] mb-4">Experience</h2>
                <div className="flex flex-col">
                  {[
                    { num: 1, img: '/jsw.png', title: 'AI Intern',                   sub: 'JSW Steel · Jan 2025 – Apr 2025 · Navi Mumbai, Maharashtra', contain: true },
                    { num: 2, img: '/tk.jpg',  title: 'Summer Intern',               sub: 'Tark Technologies · Jun 2024 – Jul 2024 · Rajkot, Gujarat' },
                    { num: 3, img: '/qs.jpg',  title: 'Research Intern',             sub: 'QuantumShift · Jun 2023 – Jan 2024' },
                    { num: 4, img: '/hf.png',  title: 'Open Source Contributor',     sub: 'Hacktoberfest · October 2023' },
                    { num: 5, img: '/rl.png',  title: 'Technical Associate Trainee', sub: 'RuDe Labs · Jun 2022 – Aug 2022' },
                  ].map(({ num, img, title, sub, contain }) => (
                    <div key={num} className="flex items-center gap-4 p-3 rounded-md hover:bg-[#1a1a1a] transition-colors group cursor-default">
                      <span className="text-[#b3b3b3] text-[0.88rem] w-5 shrink-0 group-hover:opacity-0">{num}</span>
                      {contain ? (
                        <div className="w-[44px] h-[44px] shrink-0 rounded-sm bg-white overflow-hidden flex items-center justify-center">
                          <Image src={img} alt={title} width={44} height={44} className="w-[44px] h-[44px] object-contain p-1" />
                        </div>
                      ) : (
                        <Image src={img} alt={title} width={44} height={44} className="rounded-sm object-contain w-[44px] h-[44px] shrink-0" />
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="font-[CMedium] text-[0.9rem]">{title}</span>
                        <span className="text-[#b3b3b3] text-[0.77rem] font-[CLight]">{sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Volunteer */}
              <section id="ds-volunteer">
                <h2 className="font-[CBold] text-[1.35rem] mb-4">Volunteer</h2>
                <div className="flex flex-col">
                  {[
                    { num: 1, img: '/gdsc.png', title: 'Google Developer Student Club',      sub: 'Machine Learning Facilitator' },
                    { num: 2, img: '/mlsa.png', title: 'Microsoft Learn Student Ambassador', sub: 'Beta Milestone · Oct 2022 – Jan 2025' },
                  ].map(({ num, img, title, sub }) => (
                    <div key={num} className="flex items-center gap-4 p-3 rounded-md hover:bg-[#1a1a1a] transition-colors group cursor-default">
                      <span className="text-[#b3b3b3] text-[0.88rem] w-5 shrink-0 group-hover:opacity-0">{num}</span>
                      <Image src={img} alt={title} width={44} height={44} className="rounded-sm object-contain w-[44px] h-[44px] shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-[CMedium] text-[0.9rem]">{title}</span>
                        <span className="text-[#b3b3b3] text-[0.77rem] font-[CLight]">{sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects */}
              <section id="ds-projects">
                <h2 className="font-[CBold] text-[1.35rem] mb-4">Projects</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { href: 'https://github.com/DevrG03',                                                        title: 'HigherAI – Talent Matching',     sub: 'NLP, LLM, Python, Azure, Docker' },
                    { href: 'https://github.com/DevrG03',                                                        title: 'Smart DPR Manager',              sub: 'AI Agent, MCP, FastAPI, Docker, GCP' },
                    { href: 'https://github.com/Devrajsinh-Gohil/message-encryption',                           title: 'Text Encryption (C++)',          sub: '2-D array cipher for secure messages' },
                    { href: 'https://github.com/Devrajsinh-Gohil/My-Browser',                                   title: 'Web Browser (Python)',           sub: 'PyQT5 personal browser' },
                    { href: 'https://github.com/Devrajsinh-Gohil/Face_Attendence',                              title: 'Attendance System (OpenCV)',     sub: 'Facial recognition auto-logging' },
                    { href: 'https://github.com/Devrajsinh-Gohil/ML',                                           title: 'Competitiveness Prediction',     sub: 'Regression ML for career insights' },
                    { href: 'https://github.com/Devrajsinh-Gohil/Quantum/blob/main/adder.ipynb',               title: '4-Qubit Quantum Adder',         sub: 'Qiskit quantum computing demo' },
                    { href: 'https://github.com/Devrajsinh-Gohil/UTP',                                          title: 'Hiring System (NLP + Azure)',    sub: 'AI-powered candidate matching' },
                  ].map(({ href, title, sub }) => (
                    <a key={title} href={href} target="_blank" rel="noreferrer"
                      className="flex items-center gap-4 p-3 rounded-md bg-[#181818] hover:bg-[#222] transition-colors group">
                      <Image src="/gh.png" alt="GitHub" width={46} height={46} className="rounded-sm object-contain w-[46px] h-[46px] shrink-0" />
                      <div className="min-w-0">
                        <p className="font-[CMedium] text-[0.88rem] group-hover:text-spgreen transition-colors">{title}</p>
                        <p className="text-[#b3b3b3] text-[0.74rem] font-[CLight] truncate">{sub}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* Achievements */}
              <section id="ds-achievements">
                <h2 className="font-[CBold] text-[1.35rem] mb-4">Achievements</h2>
                <div className="flex flex-col">
                  {[
                    { num: 1, img: '/gt.jpg', title: 'GATE DA 2024',                   sub: 'AIR 1519 · Government of India' },
                    { num: 2, img: '/gt.jpg', title: 'Smart India Hackathon 2024',     sub: 'Finalist · Government of India' },
                    { num: 3, img: '/tk.jpg', title: 'Tark Codegenie 2024',           sub: 'Winner' },
                  ].map(({ num, img, title, sub }) => (
                    <div key={num} className="flex items-center gap-4 p-3 rounded-md hover:bg-[#1a1a1a] transition-colors group cursor-default">
                      <span className="text-[#b3b3b3] text-[0.88rem] w-5 shrink-0 group-hover:opacity-0">{num}</span>
                      <Image src={img} alt={title} width={44} height={44} className="rounded-sm object-contain w-[44px] h-[44px] shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-[CMedium] text-[0.9rem]">{title}</span>
                        <span className="text-[#b3b3b3] text-[0.77rem] font-[CLight]">{sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </main>

          {/* ── Right Panel ── */}
          <aside className="w-[290px] shrink-0 bg-[#121212] rounded-lg overflow-y-auto scrollbar-hide flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-[CBold] text-[0.88rem]">Now Playing</h3>
              <MdOpenInFull className="text-[#b3b3b3] hover:text-white cursor-pointer transition-colors text-[1rem]" />
            </div>

            {/* Album art */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image src="/happy.jpg" alt="Now Playing" fill className="object-cover" priority />
              <div className="absolute top-2 left-2">
                <PiSpotifyLogoBold className="text-white text-[1.3rem] drop-shadow-lg" />
              </div>
            </div>

            {/* Song info + like */}
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="font-[CBold] text-[0.95rem] truncate">Blue Bird but is it okay if it&apos;s lofi?</p>
                <p className="text-[#b3b3b3] text-[0.8rem] font-[CLight]">KIJUGO</p>
              </div>
              <LikeIcon size="1.5rem" />
            </div>

            {/* Bio */}
            <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-2">
              <p className="font-[CBold] text-[0.82rem]">About</p>
              <p className="text-[#b3b3b3] text-[0.76rem] font-[CLight] leading-relaxed">
                Hey there! I&apos;m Devrajsinh Gohil — passionate about AI/ML, quantum computing, and full-stack development. I love crafting solutions that make a difference, from intelligent systems to elegant web experiences.
              </p>
              <p className="text-[#b3b3b3] text-[0.73rem] font-[CLight] mt-1">
                <span className="text-white font-[CMedium]">{likes}</span> people liked this portfolio
              </p>
            </div>

            {/* Kijugo artist card */}
            <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
              <div className="h-[95px] bg-center bg-cover flex items-end p-3"
                style={{ backgroundImage: "url('/artname.jpg')" }}>
                <p className="font-[CBold] text-[0.75rem] drop-shadow-md">Artist of the Music</p>
              </div>
              <div className="flex items-center justify-between p-3">
                <div>
                  <p className="font-[CBold] text-[0.88rem]">Kijugo</p>
                  <p className="text-[#b3b3b3] text-[0.74rem] font-[CLight]">190K+ followers</p>
                </div>
                <a href="https://open.spotify.com/artist/7HjVvgY9p57LOIrGyulrVU?si=dRL5qNxjT460ZtXfrOsA2Q"
                  target="_blank" rel="noreferrer"
                  className="border border-[#b3b3b3] text-[0.78rem] font-[CBold] px-3 py-1 rounded-full hover:border-white hover:text-white transition-colors">
                  Follow
                </a>
              </div>
            </div>
          </aside>

        </div>

        {/* ═══ Bottom Player Bar ═══ */}
        <div className="h-[88px] bg-[#181818] border-t border-[#282828] flex items-center justify-between px-5 shrink-0">

          {/* Left: song info */}
          <div className="flex items-center gap-3 w-[28%] min-w-0">
            <Image src="/dp.jpg" alt="Now Playing" width={56} height={56}
              className="rounded-md object-cover w-[54px] h-[54px] shrink-0" />
            <div className="flex flex-col min-w-0 overflow-hidden">
              <span className="font-[CMedium] text-[0.82rem] truncate">Blue Bird but is it okay if it&apos;s lofi?</span>
              <span className="text-[#b3b3b3] text-[0.74rem] font-[CLight]">KIJUGO</span>
            </div>
            <div className="ml-2 shrink-0">
              <LikeIcon size="1.3rem" />
            </div>
          </div>

          {/* Center: controls + progress */}
          <div className="flex flex-col items-center gap-1 w-[44%]">
            <div className="flex items-center gap-5">
              <PiShuffleBold
                className="text-[#b3b3b3] hover:text-white transition-colors text-[1.15rem] cursor-pointer" />
              <PiSkipBackFill
                className="text-white text-[1.3rem] cursor-pointer hover:scale-110 transition-transform"
                onClick={handleSkipPrev} />
              <button onClick={handlePlayPause}
                className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shrink-0">
                {isPlaying
                  ? <FaPause style={{ color: '#000', fontSize: '0.9rem' }} />
                  : <FaPlay  style={{ color: '#000', fontSize: '0.9rem', marginLeft: '2px' }} />}
              </button>
              <PiSkipForwardFill
                className="text-white text-[1.3rem] cursor-pointer hover:scale-110 transition-transform"
                onClick={handleSkipNext} />
              <LuRepeat1 className="text-spgreen text-[1.15rem] cursor-pointer" />
            </div>
            <div className="flex items-center gap-2 w-full">
              <span className="text-[#b3b3b3] text-[0.68rem] font-[CLight] w-7 text-right tabular-nums">{fmt(currentTime)}</span>
              <Slider
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                sx={{ ...sliderSx(4, 12), flex: 1 }}
              />
              <span className="text-[#b3b3b3] text-[0.68rem] font-[CLight] w-7 tabular-nums">{fmt(duration)}</span>
            </div>
          </div>

          {/* Right: extra controls + volume */}
          <div className="flex items-center gap-3 w-[28%] justify-end">
            <TbDevices2 className="text-[#b3b3b3] hover:text-white transition-colors text-[1.15rem] cursor-pointer" />
            <HiOutlineQueueList className="text-[#b3b3b3] hover:text-white transition-colors text-[1.15rem] cursor-pointer" />
            <GrShareOption
              className="text-[#b3b3b3] hover:text-white transition-colors text-[1.1rem] cursor-pointer"
              onClick={handleCopy} />
            <PiSpeakerHighBold className="text-[#b3b3b3] text-[1.1rem] shrink-0" />
            <Slider
              value={volume}
              onChange={(_, v) => setVolume(v)}
              sx={{ ...sliderSx(4, 10), width: 80 }}
            />
          </div>

        </div>
      </div>
    </>
  )
}

export default DesktopLanding
