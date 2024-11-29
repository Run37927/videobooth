export default function VideoControls({
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
    isLooping,
    setIsLooping,
    videoRef
}) {
    const handlePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.ended) {
            videoRef.current.load();
        }
        videoRef.current.play();
        setIsPlaying(true);
    };

    const handlePause = () => {
        videoRef.current?.pause();
        setIsPlaying(false);
    };

    return (
        <div className="absolute top-0 left-[350px] w-[259px] h-[56px] bg-[url('/images/playpausemute.png')] bg-no-repeat">
            <button
                className={`relative w-[64px] h-[56px] ${!isPlaying ? '' : 'bg-[url("/images/playpressed.png")]'}`}
                onClick={handlePlay}
            />
            <button
                className={`absolute top-0 left-[64px] w-[64px] h-[56px] ${isPlaying ? '' : 'bg-[url("/images/pausepressed.png")]'}`}
                onClick={handlePause}
            />
            <button
                className={`absolute top-0 left-[128px] w-[64px] h-[56px] ${isLooping ? 'bg-[url("/images/looppressed.png")]' : ''}`}
                onClick={() => setIsLooping(!isLooping)}
            />
            <button
                className={`absolute top-0 left-[192px] w-[64px] h-[56px] ${isMuted ? 'bg-[url("/images/mutepressed.png")]' : ''}`}
                onClick={() => setIsMuted(!isMuted)}
            />
        </div>
    );
}