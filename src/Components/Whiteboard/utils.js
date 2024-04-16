export function randomSelectColor() {
    const candidates = ['#b5e48c', '#ffd6ff', '#ffb703', '#fefae0', '#ffc8dd', '#ced4da']

    const randomIndex = Math.floor(Math.random() * candidates.length)

    return candidates[randomIndex]
}

