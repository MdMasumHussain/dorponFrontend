export async function faceCarousel() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_URL}/auth/carousel`)
    const carousel = await res.json()
    return carousel;
}
