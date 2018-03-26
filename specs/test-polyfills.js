const raf = global.requestAnimationFrame = (done) => {
    setTimeout(done, 0);
};

export default raf;
