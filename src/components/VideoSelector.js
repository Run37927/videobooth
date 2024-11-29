export default function VideoSelector({ currentVideo, setCurrentVideo, videoRef, setIsPlaying }) {
    const videos = {
        video1: "/video/demovideo1",
        video2: "/video/demovideo2"
    };

    const handleVideoChange = (videoId) => {
        setIsPlaying(false);
        setCurrentVideo(videoId);

        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.src = `${videos[videoId]}.mp4`;
            videoRef.current.load();

            videoRef.current.oncanplay = () => {
                videoRef.current.play();
                setIsPlaying(true);
            };
        }
    };

    return (
        <div className="absolute top-0 left-[700px] w-[137px] h-[56px] bg-[url('/images/video1video2buttons.png')] bg-no-repeat">
            <button
                className={`relative w-[68px] h-[56px] ${currentVideo === 'video1' ? 'bg-[url("/images/video1pressed.png")]' : ''}`}
                onClick={() => handleVideoChange('video1')}
            />
            <button
                className={`absolute top-0 left-[68px] w-[70px] h-[56px] ${currentVideo === 'video2' ? 'bg-[url("/images/video2pressed.png")]' : ''}`}
                onClick={() => handleVideoChange('video2')}
            />
        </div>
    );
}