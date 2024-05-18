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
