function noir(pos, r, g, b, data) {
    const offset = pos * 4;
    if (offset + 3 >= data?.length) return;  // Bounds check

    const brightness = Math.max(0, (3 * r + 4 * g + b) >>> 3);
    data[offset] = brightness;
    data[offset + 1] = brightness;
    data[offset + 2] = brightness;
    data[offset + 3] = 255;  // Add alpha channel setting for consistency
}

function western(pos, r, g, b, data) {
    const offset = pos * 4;
    if (offset + 3 >= data?.length) return;  // Bounds check

    const brightness = (3 * r + 4 * g + b) >>> 3;
    data[offset] = Math.min(255, brightness + 40);
    data[offset + 1] = Math.min(255, brightness + 20);
    data[offset + 2] = Math.max(0, brightness - 20);
    data[offset + 3] = 255;
}

function scifi(pos, r, g, b, data) {
    const offset = pos * 4;
    if (offset + 3 >= data?.length) return;  // Bounds check

    data[offset] = 255 - r;
    data[offset + 1] = 255 - g;
    data[offset + 2] = 255 - b;
    data[offset + 3] = 255;
}

const effectFunctions = {
    western,
    noir,
    scifi
};

export default function VideoEffects({ currentEffect, setCurrentEffect }) {
    const handleEffect = (effectName) => {
        setCurrentEffect(effectName ? effectFunctions[effectName] : null);
    };

    const isCurrentEffect = (effectFunc) => currentEffect === effectFunc;

    return (
        <div className="absolute top-0 left-0 w-[259px] h-[56px] bg-[url('/images/effectbuttons.png')] bg-no-repeat">
            <button
                className={`relative w-[68px] h-[56px] ${currentEffect === null ? 'bg-[url("/images/normalpressed.png")]' : ''}`}
                onClick={() => handleEffect(null)}
            />
            <button
                className={`absolute top-0 left-[68px] w-[62px] h-[56px] ${isCurrentEffect(effectFunctions.western) ? 'bg-[url("/images/westernpressed.png")]' : ''}`}
                onClick={() => handleEffect('western')}
            />
            <button
                className={`absolute top-0 left-[130px] w-[64px] h-[56px] ${isCurrentEffect(effectFunctions.noir) ? 'bg-[url("/images/noirpressed.png")]' : ''}`}
                onClick={() => handleEffect('noir')}
            />
            <button
                className={`absolute top-0 left-[194px] w-[64px] h-[56px] ${isCurrentEffect(effectFunctions.scifi) ? 'bg-[url("/images/scifipressed.png")]' : ''}`}
                onClick={() => handleEffect('scifi')}
            />
        </div>
    )
}