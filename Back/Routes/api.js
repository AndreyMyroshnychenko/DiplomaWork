


// // Получение списка комнат по компании и стране
// export async function getRooms(company, country) {
//     const url = `/api/rooms?company=${company}&country=${country}`;
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Failed to fetch data');
//         }
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         throw new Error('Failed to fetch data');
//     }
// }