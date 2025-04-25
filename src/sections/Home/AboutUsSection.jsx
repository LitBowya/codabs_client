import {useRef, useState} from 'react'
import Button from '../../components/Button.jsx';
import { FiArrowRight, FiX, FiPause, FiPlay } from 'react-icons/fi';
import {Link} from 'react-router-dom';
import AnimatedScrollText from '../../components/AnimatedScrollText.jsx';
import AnimatedScrollElement from '../../components/AnimatedScrollElement.jsx';


const AboutUsSection = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);

    const toggleVideo = () => {
        setIsVideoOpen(!isVideoOpen);
        setIsPlaying(true);
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section className="bg-secondary py-16 md:py-24 lg:py-32 relative">

            <AnimatedScrollElement
                tag="div"
                className="absolute hidden lg:block h-96 bg-white"
                animationProps={{
                    from: {
                        width: 0,
                        opacity: 0,
                    },
                    to: {
                        width: '40%', // Equivalent to Tailwind's w-1/3
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                    },
                }}
                style={{ overflow: 'hidden' }} // Prevents content jump
            />

            {/*<div className={`absolute hidden lg:block h-96 w-1/3 bg-white`}/>*/}
            <div className="max-width sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="relative z-10">
                            <AnimatedScrollElement
                                tag="img"
                                className="rounded-lg shadow-lg"
                                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f"
                                alt="Construction Site"
                                animationProps={{
                                    from: { scale: 0, opacity: 0 },
                                    to: {
                                        scale: 1,
                                        opacity: 1,
                                        duration: 1,
                                        delay: 1.5,
                                        ease: 'power1.inOut',
                                    },
                                }}
                            />

                        </div>

                        {/* Overlay Images */}

                        <AnimatedScrollElement
                            tag="img"
                            className="absolute top-[-30px] left-[-30px] w-36 border-4 border-white z-10 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-500"
                            src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f"
                            alt="Construction Site"
                            animationProps={{
                                from: { y: -110, opacity: 0 },
                                to: {
                                    y: 0,
                                    opacity: 1,
                                    duration: 2,
                                    delay: 1.85,
                                    ease: 'bounce',
                                },
                            }}
                        />

                        <AnimatedScrollElement
                            tag="img"
                            className="absolute bottom-[-30px] right-[-30px] w-48 h-56 rounded-lg border-4 z-10 border-primary shadow-xl transform hover:scale-105 transition-transform duration-500"
                            src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f"
                            alt="Construction Site"
                            animationProps={{
                                from: { y: 110, opacity: 0 },
                                to: {
                                    y: 0,
                                    opacity: 1,
                                    duration: 2,
                                    delay: 2,
                                    ease: 'slow(0.7,0.7,false',
                                },
                            }}
                        />


                    </div>

                    {/* Content Section */}
                    <div className="mt-8 lg:mt-0 text-white">

                        <AnimatedScrollText
                            types="chars"
                            tagName="h4"
                            className={`text-lg lg:text-xl font-semibold text-white mb-6`}
                        >
                            Passion. Precision. Performance.
                        </AnimatedScrollText>

                        <AnimatedScrollText
                            types="words"
                            tagName="h2"
                            animateTarget = '.word'
                            animationProps = {
                                {
                                    x: '90%',
                                    opacity: 0,
                                    rotationZ: 50,
                                    delay: 1,
                                    duration: 1,
                                    ease: 'power1.inOut',
                                    stagger: 0.2,
                                }
                            }
                            className={`text-3xl sm:text-4xl xl:text-5xl font-bold text-primary mb-4`}
                        >
                            building excellence since 2005
                        </AnimatedScrollText>

                        <AnimatedScrollText
                            types="lines"
                            tagName="p"
                            animateTarget = '.line'
                            animationProps = {
                                {
                                    y: '90%',
                                    opacity: 0,
                                    delay: 1.5,
                                    duration: 1,
                                    ease: 'bounce',
                                    stagger: 0.2,
                                }
                            }
                            className={`className="text-md lg:text-lg text-white/90 mb-8 leading-relaxed"`}
                        >
                            At Codabs Construction, we transform visions into enduring structures. With over 15 years of experience, we've
                            become a trusted name in innovative construction solutions — delivering excellence on every project.
                        </AnimatedScrollText>


                        <ul className="space-y-1 text-white/90 text-md lg:text-xl">
                            <li className="flex items-start gap-3">
                                <AnimatedScrollText
                                    types="lines"
                                    tagName="p"
                                    animateTarget = '.line'
                                    animationProps = {
                                        {
                                            y: '90%',
                                            opacity: 0,
                                            delay: 1.75,
                                            duration: 1,
                                            ease: 'power1.inOut',
                                            stagger: 0.2,
                                        }
                                    }
                                    className={`className="text-md lg:text-lg text-white/90 leading-relaxed"`}
                                >
                                    <span className="text-gray-900 text-xl mx-2">✔</span>
                                    Tailored Solution For Residential And Commercial Need
                                </AnimatedScrollText>
                            </li>
                            <li className="flex items-start gap-3">

                                <AnimatedScrollText
                                    types="lines"
                                    tagName="p"
                                    animateTarget = '.line'
                                    animationProps = {
                                        {
                                            y: '90%',
                                            opacity: 0,
                                            rotationZ: 0,
                                            delay: 1.95,
                                            duration: 1,
                                            ease: 'power1.inOut',
                                            stagger: 0.2,
                                        }
                                    }
                                    className={`className="text-md lg:text-lg text-white/90 leading-relaxed"`}
                                >
                                    <span className="text-gray-900 text-xl mx-2">✔</span>
                                    Transparent project timelines & milestone tracking
                                </AnimatedScrollText>

                            </li>
                            <li className="flex items-start gap-3">

                                <AnimatedScrollText
                                    types="lines"
                                    tagName="p"
                                    animateTarget = '.line'
                                    animationProps = {
                                        {
                                            y: '90%',
                                            opacity: 0,
                                            rotationZ: 0,
                                            delay: 2.05,
                                            duration: 1,
                                            ease: 'power1.inOut',
                                            stagger: 0.2,
                                        }
                                    }
                                    className={`className="text-md lg:text-lg text-white/90 leading-relaxed"`}
                                >
                                    <span className="text-gray-900 text-xl mx-2">✔</span>
                                    High-quality materials & sustainable building practices
                                </AnimatedScrollText>
                            </li>
                        </ul>

                        <div className="mt-8 flex justify-between">




                                    <Button variant=""
                                            icon={<FiPlay />}
                                            iconPosition="left"
                                            sizes="medium"
                                            roundness="full"
                                            className="font-bold bg-gray-800"
                                            onClick={toggleVideo}
                                    >

                                        Watch A Video
                                    </Button>

                            <Link to={'/about-us'}>
                                <AnimatedScrollText
                                    types="lines"
                                    tagName="button"
                                    animateTarget = '.line'
                                    animationProps = {
                                        {
                                            x: '-90%',
                                            opacity: 0,
                                            rotationZ: 0,
                                            delay: 1.95,
                                            duration: 1,
                                            ease: 'bounce',
                                        }
                                    }
                                    className={`className="text-md lg:text-lg text-white/90 leading-relaxed"`}
                                >
                                    <Button variant="white"
                                            icon={<FiArrowRight />}
                                            iconPosition="right"
                                            sizes="medium"
                                            roundness="full"
                                            className="font-bold">

                                        Learn More
                                    </Button>
                                </AnimatedScrollText>

                            </Link>



                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl">
                        {/* Video Player */}
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            className="w-full rounded-lg"
                            onClick={togglePlayPause}
                        >
                            <source src="/videos/codabs.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Controls */}
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={togglePlayPause}
                                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                            >
                                {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
                            </button>
                            <button
                                onClick={toggleVideo}
                                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                            >
                                <FiX size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    )
}
export default AboutUsSection
