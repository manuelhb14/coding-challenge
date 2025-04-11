"use server"

export default async function fetchCatFacts({ pageParam }: { pageParam: number }) {
    const users = await fetch('https://randomuser.me/api/?results=10&seed=abc&page=' + pageParam)
    const usersRes = await users.json()
    const usersData = usersRes.results

    const cats = await fetch('https://catfact.ninja/facts?page=' + pageParam)
    const catsRes = await cats.json()
    const catsData = catsRes.data

    const usersAndCats = []

    for (let i = 0; i < catsData.length; i++) {
        usersAndCats.push({ user: usersData[i], catFact: catsData[i] })
    }

    // console.log(usersAndCats)

    return { usersAndCats, nextCursor: catsRes.next_page_url ? pageParam + 1 : null }

}  