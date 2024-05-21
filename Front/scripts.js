// import { createInterface } from 'readline';

// const rl = createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// class Room {
//     constructor(name) {
//         this.name = name;
//         this.likes = 0;
//     }

//     like() {
//         this.likes++;
//     }

//     getLikes() {
//         return this.likes;
//     }
// }

// class RoomBookingSystem {
//     constructor() {
//         this.capacity = capacity;
//         this.rooms = [];
//     }

    
//     addRoom(room) {
//         this.rooms.push(room);
//     }

//     bookRoom(bookingTime) {
//         if (this.bookings.length < this.capacity) {
//             this.bookings.push(bookingTime);
//             console.log(`Room booked for ${bookingTime} successfully.`);
//         } else {
//             console.log("Room capacity reached. Unable to book room.");
//         }
//     }

//     cancelBooking() {
//         if (this.bookings.length > 0) {
//             const cancelledBooking = this.bookings.shift();
//             console.log(`Booking for ${cancelledBooking} cancelled successfully.`);
//         } else {
//             console.log("No bookings to cancel.");
//         }
//     }

//     viewBookings() {
//         console.log("Current bookings:");
//         if (this.bookings.length === 0) {
//             console.log("No bookings.");
//         } else {
//             this.bookings.forEach((booking, index) => {
//                 console.log(`${index + 1}. ${booking}`);
//             });
//         }
//     }
//     recommendRooms() {
//         return this.rooms.sort((a, b) => b.getLikes() - a.getLikes());
//     }
// }

// document.addEventListener('DOMContentLoaded', function() {
//     const roomBookingSystem = new RoomBookingSystem();

//     const roomList = document.getElementById('rooms-list');

//     const room1 = new Room("Conference Room 1");
//     const room2 = new Room("Meeting Room 2");
//     const room3 = new Room("Board Room 3");

//     roomBookingSystem.addRoom(room1);
//     roomBookingSystem.addRoom(room2);
//     roomBookingSystem.addRoom(room3);


//     roomBookingSystem.recommendRooms().forEach(room => {
//         const roomElement = document.createElement('div');
//         roomElement.classList.add('room');

//         const roomName = document.createElement('div');
//         roomName.classList.add('room-name');
//         roomName.textContent = room.name;
//         roomElement.appendChild(roomName);

//         const likes = document.createElement('div');
//         likes.classList.add('likes');
//         likes.textContent = `Likes: ${room.getLikes()}`;
//         roomElement.appendChild(likes);

//         const likeButton = document.createElement('button');
//         likeButton.classList.add('like-button');
//         likeButton.textContent = 'Like';
//         likeButton.addEventListener('click', () => {
//             room.like();
//             likes.textContent = `Likes: ${room.getLikes()}`;
//         });
//         roomElement.appendChild(likeButton);

//         roomList.appendChild(roomElement);
//     });
//     rl.question("Enter booking time (e.g. 10:00): ", (time) => {
//         roomBookingSystem.bookRoom(time); 
//         roomBookingSystem.viewBookings(); 
//         rl.close();
//     });
// });
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const usernameInput = document.getElementById('username');
            const username = usernameInput.value.trim();

            if (username) {
                localStorage.setItem('username', username); 
                window.location.href = 'mainPage.html'; 
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const usernameInput = document.getElementById('username');
            const username = usernameInput.value.trim();

            if (username) {
                localStorage.setItem('username', username);
                window.location.href = 'mainPage.html'; 
            }
        });
    }

    const userGreetingLink = document.getElementById('userGreetingLink');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const logoutButton = document.getElementById('logoutButton');

    if (userGreetingLink) {
       
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            userGreetingLink.textContent = storedUsername;
            userGreetingLink.href = `ProfilePage.html?username=${encodeURIComponent(storedUsername)}`;
            userGreetingLink.style.pointerEvents = 'auto'; 
      
            if (loginLink) loginLink.remove();
            if (signupLink) signupLink.remove();
            if (logoutButton) logoutButton.style.display = 'block';

            logoutButton.addEventListener('click', function() {
                localStorage.clear(); 
                window.location.href = 'mainPage.html'; 
            });
        } else {
            userGreetingLink.textContent = 'Guest';
            userGreetingLink.href = '#'; 
            userGreetingLink.style.pointerEvents = 'none'; 
            userGreetingLink.style.border='none'; 
            userGreetingLink.style.fontSize='20px';

        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const sideMenu = document.getElementById('sideMenu');

    menuIcon.addEventListener('mouseenter', function() {
        sideMenu.classList.add('active');
    });

    sideMenu.addEventListener('mouseleave', function() {
        sideMenu.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const avatarInput = document.getElementById('avatarInput');
    const avatarLabel = document.querySelector('.avatarLabel');
    const avatarImage = avatarLabel.querySelector('img');

    const savedAvatar = localStorage.getItem('avatarImage');
    if (savedAvatar) {
        avatarImage.src = savedAvatar;
    }


    avatarInput.addEventListener('change', function(event) {
        const file = event.target.files[0]; 
        const reader = new FileReader(); 

        reader.onload = function(e) {
            const imageDataUrl = e.target.result;
            avatarImage.src = imageDataUrl; 

            localStorage.setItem('avatarImage', imageDataUrl);
        };

        reader.readAsDataURL(file);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const companyModal = document.getElementById('companyModal');
    const companyForm = document.getElementById('companyForm');
    const roomsContainer = document.getElementById('roomsContainer');
    const roomDetails = document.getElementById('roomDetails');
    const overlay = document.getElementById('overlay');
    const roomTitle = document.getElementById('roomTitle');
    const roomDescription = document.getElementById('roomDescription');
    const roomImage = document.getElementById('roomImage');
    const bookingTime = document.getElementById('bookingTime');
    const closeDetails = document.getElementById('closeDetails');
    const errorMessage = document.getElementById('error-message');
    const note = document.getElementById('note');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    const bookRoomButton = document.getElementById('bookRoom');

    const companiesByCountry = {
        usa: ['apple', 'blizzard', 'microsoft', 'google'],
        germany: ['microsoft', 'google'],
        ukraine: ['blizzard'],
        uk: ['apple', 'google']
    };

    companyForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedCompany = document.getElementById('company').value;
        const selectedCountry = document.getElementById('country').value;

        if (companiesByCountry[selectedCountry].includes(selectedCompany)) {
            companyModal.style.display = 'none';
            roomsContainer.style.display = 'block';
            displayRooms(selectedCompany, selectedCountry);
        } else {
            errorMessage.textContent = 'The selected company does not have offices in the selected country.';
        }
    });

    function displayRooms(company, country) {
        const roomList = document.querySelector('.room-list');
        roomList.innerHTML = ''; 
        const rooms = getRooms(company, country); 
        rooms.sort((a, b) => {
            if (a.rating !== b.rating) {
                return b.rating - a.rating; 
            } else {
                return b.reviews - a.reviews; 
            }
        });
        rooms.forEach(room => {
            const roomElement = document.createElement('li');
            roomElement.classList.add('room-item');
            roomElement.setAttribute('data-room-id', room.id);

            const roomContent = `
                <h4>${room.name}</h4>
                <img src="../images/${room.thumbnail}" alt="Room Image" width="100">
                <span class="room-rating">Rating: ${room.rating} (${room.reviews} reviews)</span>
                <span class="room-price">$${room.price}/hour</span>
            `;
            roomElement.innerHTML = roomContent;

            roomElement.addEventListener('click', () => {
                showRoomDetails(room);
            });

            roomList.appendChild(roomElement);
        });
    }

    function getRooms(company, country) {
        // fetch this from a server in a real app
        const availableRooms = {
            usa: {
                apple: [
                    { id: 1, name: 'Room in Apple office in Los Angeles', rating: 4.5, reviews: 10, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Apple. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: ['10am'], price: 50 },
                    { id: 2, name: 'Room in Apple office in Washington', rating: 4.4, reviews: 108, thumbnail: 'OfficeApple2_1.jpg', description: 'Офіс компанії Apple. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple2_1.jpg', 'OfficeApple2_2.jpg'], bookings: ['10am'], price: 50 },
                    { id: 3, name: 'Room in Apple office in Cansas', rating: 4.5, reviews: 23, thumbnail: 'OfficeApple3_1.jpg', description: 'Офіс компанії Apple. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple3_1.jpg', 'OfficeApple3_2.jpg'], bookings: ['10am'], price: 50 },
                ],
                blizzard: [
                    { id: 4, name: 'Room in Blizzard office in New York', rating: 5.0, reviews: 56, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Бліззард. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: ['10am'], price: 50 },
                    { id: 5, name: 'Room in Blizzard office in Los Antos', rating: 4.0, reviews: 10, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Бліззард. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: ['10am'], price: 50 },
                    { id: 6, name: 'Room in Blizzard office in Vice City', rating: 5.0, reviews: 58, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Бліззард. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: ['10am'], price: 50 },
                ],
                microsoft: [
                    { id: 7, name: 'Room in Microsoft office in Ney Jersey', rating: 4.3, reviews: 3, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Майкрософт. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: ['10am'], price: 50 },
                    { id: 8, name: 'Room in Microsoft office in May City', rating: 4.5, reviews: 18, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Майкрософт. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: ['10am'], price: 50 },
                ],
                google: [
                    { id: 9, name: 'Room in Google office in Washington', rating: 3.9, reviews: 156, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Google. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: ['10am'], price: 50 },
                    
                ],
            },
            germany: {
                microsoft: [
                    { id: 10, name: 'Room in Microsoft office in Berlin', rating: 3.3, reviews: 156, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Microsoft. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: ['10am'], price: 50 },
                ],
                google: [
                    { id: 11, name: 'Room in Google office in Bremen', rating: 4.1, reviews: 10, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Google. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: ['10am'], price: 50 },
                    
                ],
            },
            ukraine: {
                blizzard: [
                    { id: 12, name: 'Room in Blizzard office in Kyiv', rating: 4.9, reviews: 13, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Blizzard. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: ['10am'], price: 50 },
                ],
                
            },
            uk: {
                apple: [
                    { id: 13, name: 'Room in Apple office in London', rating: 4.8, reviews: 199, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Apple. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: ['10am'], price: 50 },
                    
                ],
                google: [
                    { id: 14, name: 'Room in Google office in London', rating: 4.5, reviews: 91, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Apple. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: ['10am'], price: 50 },
                    
                ],
                
            },
            
        };
        // fetch this from a server in a real app
        return availableRooms[country][company];

    }

    function showRoomDetails(room) {
        let currentImageIndex = 0;

        roomTitle.textContent = room.name;
        roomDescription.textContent = room.description;
        roomImage.src = `../images/${room.images[currentImageIndex]}`;

        prevImage.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : room.images.length - 1;
            roomImage.src = `../images/${room.images[currentImageIndex]}`;
        });

        nextImage.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex < room.images.length - 1) ? currentImageIndex + 1 : 0;
            roomImage.src = `../images/${room.images[currentImageIndex]}`;
        });

        bookingTime.innerHTML = '';
        ['9am', '10am', '11am', '12am', '1pm','2pm','3pm','4pm','5pm','6pm','7pm'].forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            if (room.bookings.includes(time)) {
                option.classList.add('booked');
                option.disabled = true;
            }
            bookingTime.appendChild(option);
        });

        note.value = ''; 
        note.style.display = 'block'; 

        bookRoomButton.addEventListener('click', () => {
            redirectToPaymentForm(room);
        });

        roomDetails.style.display = 'block';
        overlay.style.display = 'block';
    }


    function redirectToPaymentForm(room) {
        const paymentForm = `
            <div id="paymentForm">
                <h4>Payment for ${room.name}</h4>
                <label for="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" name="cardNumber" required>
                <label for="cardCVC">CVC:</label>
                <input type="text" id="cardCVC" name="cardCVC" required>
                <label for="cardExpiry">Expiry Date (MM/DD):</label>
                <input type="text" id="cardExpiry" name="cardExpiry" placeholder="MM/DD" required>
                <button id="payButton">Pay</button>
            </div>
        `;
    
        document.body.innerHTML = paymentForm;
    
        document.getElementById('payButton').addEventListener('click', () => {
            const cardNumber = document.getElementById('cardNumber').value;
            const cvc = document.getElementById('cardCVC').value;
            const expiryDate = document.getElementById('cardExpiry').value;
    
            if (!validateCardNumber(cardNumber)) {
                alert('Please enter a valid 16-digit card number.');
                return;
            }
    
            if (!validateCVC(cvc)) {
                alert('Please enter a valid 3-digit CVC.');
                return;
            }
    
            if (!validateExpiryDate(expiryDate)) {
                alert('Please enter a valid expiry date in MM/DD format.');
                return;
            }
    
            // If all validations pass, proceed with payment logic
            alert('Payment Successful');
            redirectToBookingPage();
        });
    }
    
    function validateCardNumber(cardNumber) {

        const strippedCardNumber = cardNumber.replace(/\s/g, '');
    
        return /^\d{16}$/.test(strippedCardNumber);
    }
    

    function validateCVC(cvc) {
        return /^\d{3}$/.test(cvc);
    }

    function validateExpiryDate(expiryDate) {
        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
        if (!dateRegex.test(expiryDate)) return false;

        const [month, day] = expiryDate.split('/');
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns 0-based index

        if (Number(month) < currentMonth || (Number(month) === currentMonth && Number(day) < new Date().getDate())) {
            // Expiry date is in the past
            return false;
        }

        return true;
    }

    function redirectToBookingPage(){
        window.location.href = 'bookingRoom.html';
    }

    closeDetails.addEventListener('click', () => {
        roomDetails.style.display = 'none';
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
        roomDetails.style.display = 'none';
        overlay.style.display = 'none';
    });
});