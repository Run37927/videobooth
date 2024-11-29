'use client';

import { useEffect, useRef, useState } from 'react';
import VideoControls from './VideoControls';
import VideoEffects from './VideoEffects';
import VideoSelector from './VideoSelector';

const videos = {
    video1: "/video/demovideo1",
    video2: "/video/demovideo2"
};

export default function VideoBooth() {
    const [currentVideo, setCurrentVideo] = useState('video1');
    const [currentEffect, setCurrentEffect] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLooping, setIsLooping] = useState(false);

    const videoRef = useRef(null);
    const bufferCanvasRef = useRef(null);
    const displayCanvasRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) return;

        const video = videoRef.current;
        video.addEventListener("play", processFrame);
        video.addEventListener("ended", () => setIsPlaying(false));

        return () => {
            video.removeEventListener("play", processFrame);
            video.removeEventListener("ended", () => setIsPlaying(false));
        };
    }, []);

    const processFrame = () => {
        if (!videoRef.current || !bufferCanvasRef.current || !displayCanvasRef.current) {
            console.error("Missing video or canvas references");
            return;
        }

        const video = videoRef.current;
        const bufferCanvas = bufferCanvasRef.current;
        const displayCanvas = displayCanvasRef.current;

        // Dynamically update canvas dimensions based on the video dimensions
        const videoWidth = video.videoWidth || 720;
        const videoHeight = video.videoHeight || 480;

        bufferCanvas.width = videoWidth;
        bufferCanvas.height = videoHeight;
        displayCanvas.width = videoWidth;
        displayCanvas.height = videoHeight;

        const buffer = bufferCanvas.getContext('2d', { willReadFrequently: true });
        const display = displayCanvas.getContext('2d');

        if (!buffer || !display) {
            console.error("Failed to get canvas contexts");
            return;
        }

        buffer.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
        buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);

        try {
            const frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);

            if (!frame || !frame.data) {
                console.error("Invalid frame data");
                return;
            }

            const length = frame.data.length / 4;

            console.log('Current effect:', currentEffect);
            console.log('Frame data exists:', !!frame.data);

            for (let i = 0; i < length; i++) {
                const r = frame.data[i * 4 + 0];
                const g = frame.data[i * 4 + 1];
                const b = frame.data[i * 4 + 2];

                if (currentEffect) {
                    currentEffect(i, r, g, b, frame.data);
                }
            }

            display.putImageData(frame, 0, 0);
        } catch (error) {
            console.error("Error during frame processing:", error);
        }

        requestAnimationFrame(processFrame);
    };

    return (
        <div className="relative w-[1100px] h-[981px] bg-[url('/images/videoformfactor.jpg')] bg-no-repeat">
            <div className="absolute top-[180px] left-[190px] w-[720px] h-[480px]">
                <video
                    ref={videoRef}
                    className="bg-black"
                    width={720}
                    height={480}
                    src={`${videos[currentVideo]}.mp4`}
                    muted={isMuted}
                    loop={isLooping}
                />
                <canvas
                    ref={bufferCanvasRef}
                    width={720}
                    height={480}
                    className="hidden absolute top-0 left-0"
                />
                <canvas
                    ref={displayCanvasRef}
                    width={720}
                    height={480}
                    className="absolute top-0 left-0"
                />
            </div>

            <div className="absolute top-[844px] left-[130px]">
                <VideoEffects
                    currentEffect={currentEffect}
                    setCurrentEffect={setCurrentEffect}
                />
                <VideoControls
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                    isLooping={isLooping}
                    setIsLooping={setIsLooping}
                    videoRef={videoRef}
                />
                <VideoSelector
                    currentVideo={currentVideo}
                    setCurrentVideo={setCurrentVideo}
                    videoRef={videoRef}
                    setIsPlaying={setIsPlaying}
                />
            </div>
        </div>
    );
}