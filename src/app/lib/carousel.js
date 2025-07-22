export async function faceCarousel() {
    const res = await fetch("http://localhost:4000/api/carousel")
    const carousel = await res.json()
    return carousel;
}