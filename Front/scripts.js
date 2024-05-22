
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
document.getElementById('logoutButton').addEventListener('click', function(){
    localStorage.clear(); 
    window.location.href = 'mainPage.html'
});
document.addEventListener('DOMContentLoaded', function() {
    const myBookingsBtn = document.getElementById('myBookingsBtn');
    const bookingList = document.getElementById('bookingList');
    const contextMenu = document.getElementById('contextMenu');
    const editBookingModal = document.getElementById('editBookingModal');

    const bookings = [
        { id: 1, title: "Meeting with Team", startTime: "10:00", endTime: "11:00", notes: "Discuss project" },
        { id: 2, title: "Client Presentation", startTime: "14:00", endTime: "15:00", notes: "Prepare slides" },
        { id: 3, title: "Weekly Sync", startTime: "16:00", endTime: "17:00", notes: "Review progress" },
        { id: 4, title: "Weekly Sync", startTime: "16:00", endTime: "17:00", notes: "Review progress" },
        { id: 5, title: "Weekly Sync", startTime: "16:00", endTime: "17:00", notes: "Review progress" },
        { id: 6, title: "Weekly Sync", startTime: "16:00", endTime: "17:00", notes: "Review progress" },
        { id: 7, title: "Weekly Sync", startTime: "16:00", endTime: "17:00", notes: "Review progress" },
    ];

    myBookingsBtn.addEventListener('click', function() {
        bookingList.innerHTML = bookings.map(booking => `
            <div class="booking-item" data-id="${booking.id}">
                <h3>${booking.title}</h3>
                <p>Time: ${booking.startTime} - ${booking.endTime}</p>
                <p>Notes: ${booking.notes}</p>
            </div>
        `).join('');
        bookingList.style.display = 'block';
    });

    bookingList.addEventListener('click', function(event) {
        if (event.target.closest('.booking-item')) {
            const bookingItem = event.target.closest('.booking-item');
            const { top, left } = bookingItem.getBoundingClientRect();
            contextMenu.style.top = `${event.clientY}px`;
            contextMenu.style.left = `${event.clientX}px`;
            contextMenu.style.display = 'block';
            contextMenu.dataset.bookingId = bookingItem.dataset.id;
        }
    });

    bookingList.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        bookingList.style.display = 'none';
        contextMenu.style.display = 'none';
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.context-menu') && !event.target.closest('.booking-item')) {
            contextMenu.style.display = 'none';
        }
    });

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    document.getElementById('editBookingBtn').addEventListener('click', function() {
        const bookingId = contextMenu.dataset.bookingId;
        const booking = bookings.find(b => b.id == bookingId);
        document.getElementById('bookingTitle').value = booking.title;
        document.getElementById('bookingStartTime').value = booking.startTime;
        document.getElementById('bookingEndTime').value = booking.endTime;
        document.getElementById('bookingNotes').value = booking.notes;
        editBookingModal.dataset.bookingId = booking.id;
        editBookingModal.style.display = 'block';
        contextMenu.style.display = 'none';
    });

    document.getElementById('cancelBookingBtn').addEventListener('click', function() {
        const bookingId = contextMenu.dataset.bookingId;
        if (confirm("Are you sure you want to cancel this booking?")) {
            const index = bookings.findIndex(b => b.id == bookingId);
            bookings.splice(index, 1);
            contextMenu.style.display = 'none';
            bookingList.innerHTML = bookings.map(booking => `
                <div class="booking-item" data-id="${booking.id}">
                    <h3>${booking.title}</h3>
                    <p>Time: ${booking.startTime} - ${booking.endTime}</p>
                    <p>Notes: ${booking.notes}</p>
                </div>
            `).join('');
        } else {
            contextMenu.style.display = 'none';
        }
    });

    document.getElementById('confirmEditBtn').addEventListener('click', function() {
        const bookingId = editBookingModal.dataset.bookingId;
        const booking = bookings.find(b => b.id == bookingId);
        booking.title = document.getElementById('bookingTitle').value;
        booking.startTime = document.getElementById('bookingStartTime').value;
        booking.endTime = document.getElementById('bookingEndTime').value;
        booking.notes = document.getElementById('bookingNotes').value;
        editBookingModal.style.display = 'none';
        bookingList.innerHTML = bookings.map(booking => `
            <div class="booking-item" data-id="${booking.id}">
                <h3>${booking.title}</h3>
                <p>Time: ${booking.startTime} - ${booking.endTime}</p>
                <p>Notes: ${booking.notes}</p>
            </div>
        `).join('');
    });

    document.getElementById('cancelEditBtn').addEventListener('click', function() {
        editBookingModal.style.display = 'none';
    });
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
    
        // Input for custom booking intervals
        const customIntervalInput = document.getElementById('customInterval');
        const addIntervalButton = document.getElementById('addInterval');
    
        addIntervalButton.addEventListener('click', () => {
            const customIntervalValue = customIntervalInput.value.trim();
            if (customIntervalValue) {
                const option = document.createElement('option');
                option.value = customIntervalValue;
                option.textContent = customIntervalValue;
                bookingTime.appendChild(option);
    
                customIntervalInput.value = ''; // Clear the input field after adding
            }
        });
    
        // Handle interval selection
        bookingTime.addEventListener('change', () => {
            const selectedInterval = bookingTime.value;
            const rooms = getRooms(company, country);
            updateAvailableIntervals(selectedInterval, rooms);
            createCustomTimeIntervals(); 
        });
    
    }
    function createCustomTimeIntervals() {
        const bookingTime = document.getElementById('bookingTime');
        bookingTime.innerHTML = '';
    
        for (let hour = 9; hour < 20; hour++) {
            for (let minutes = 0; minutes < 60; minutes += 30) {
                const startTime = `${hour < 10 ? '0' + hour : hour}:${minutes === 0 ? '00' : minutes}`;
                const endTime = `${hour < 10 ? '0' + hour : hour}:${minutes === 0 ? '00' : minutes + 30}`;
                const optionText = `${startTime} - ${endTime}`;
    
                // Check if the option is within a booked interval
                const isBookedInterval = isBooked(optionText, getRooms(company, country));
    
                // Add the option only if it's not in a booked interval
                if (!isBookedInterval) {
                    const option = document.createElement('option');
                    option.value = optionText;
                    option.textContent = optionText;
                    bookingTime.appendChild(option);
                }
            }
        }
    }
    
    
    function updateAvailableIntervals(selectedInterval, rooms) {
        const bookingTime = document.querySelector('#bookingTime');
        const options = bookingTime.options;
        
        
        const bookedIntervals = rooms.flatMap(room => room.bookings.map(booking => `${booking.start} - ${booking.end}`));
        
        options.forEach(option => {
            const optionInterval = option.value;
            if (optionInterval !== selectedInterval) {
                option.disabled = bookedIntervals.includes(optionInterval);
            }
        });
    }
    
    
    
    function getRooms(company, country) {
        // fetch this from a server in a real app
        const availableRooms = {
            usa: {
                apple: [
                    { id: 1, name: 'Room in Apple office in Los Angeles', rating: 4.5, reviews: 10, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Apple. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 40 },
                    { id: 2, name: 'Room in Apple office in Washington', rating: 4.4, reviews: 108, thumbnail: 'OfficeApple2_1.jpg', description: 'Офіс компанії Apple. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple2_1.jpg', 'OfficeApple2_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                    { id: 3, name: 'Room in Apple office in Cansas', rating: 4.5, reviews: 23, thumbnail: 'OfficeApple3_1.jpg', description: 'Офіс компанії Apple. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple3_1.jpg', 'OfficeApple3_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                ],
                blizzard: [
                    { id: 4, name: 'Room in Blizzard office in New York', rating: 5.0, reviews: 56, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Бліззард. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                    { id: 5, name: 'Room in Blizzard office in Los Antos', rating: 4.0, reviews: 10, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Бліззард. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                    { id: 6, name: 'Room in Blizzard office in Vice City', rating: 5.0, reviews: 58, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Бліззард. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                ],
                microsoft: [
                    { id: 7, name: 'Room in Microsoft office in Ney Jersey', rating: 4.3, reviews: 3, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Майкрософт. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                    { id: 8, name: 'Room in Microsoft office in May City', rating: 4.5, reviews: 18, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Майкрософт. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                ],
                google: [
                    { id: 9, name: 'Room in Google office in Washington', rating: 3.9, reviews: 156, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Google. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                    
                ],
            },
            germany: {
                microsoft: [
                    { id: 10, name: 'Room in Microsoft office in Berlin', rating: 3.3, reviews: 156, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Microsoft. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                ],
                google: [
                    { id: 11, name: 'Room in Google office in Bremen', rating: 4.1, reviews: 10, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Google. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                    
                ],
            },
            ukraine: {
                blizzard: [
                    { id: 12, name: 'Room in Blizzard office in Kyiv', rating: 4.9, reviews: 13, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Blizzard. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                ],
                
            },
            uk: {
                apple: [
                    { id: 13, name: 'Room in Apple office in London', rating: 4.8, reviews: 199, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Apple. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                    
                ],
                google: [
                    { id: 14, name: 'Room in Google office in London', rating: 4.5, reviews: 91, thumbnail: 'OfficeApple1_1.jpg', description: 'Офіс компанії Apple. Містить інтерактивний екран та місця до 20 осіб', images: ['OfficeApple1_1.jpg', 'OfficeApple1_2.jpg'], bookings: [{ start: '10:00', end: '11:00' }], price: 50 },
                    
                ],
                
            },
            
        };
        const rooms = availableRooms[country][company];

    // Get the bookingTime select element
    const bookingTime = document.querySelector('#bookingTime');
    const selectedIntervals = Array.from(bookingTime.selectedOptions).map(option => option.value);

    // Check if an interval is booked
    function isBooked(interval, rooms) {
        return rooms.some(room => {
            return room.bookings.some(booking => {
                const bookingStartTime = booking.start;
                const bookingEndTime = booking.end;
                const selectedIntervalStart = interval.split(' - ')[0];
                const selectedIntervalEnd = interval.split(' - ')[1];
    
                const bookingStartMinutes = timeToMinutes(bookingStartTime);
                const bookingEndMinutes = timeToMinutes(bookingEndTime);
                const selectedStartMinutes = timeToMinutes(selectedIntervalStart);
                const selectedEndMinutes = timeToMinutes(selectedIntervalEnd);
    
                return (
                    (selectedStartMinutes <= bookingEndMinutes && selectedEndMinutes >= bookingStartMinutes) ||
                    (selectedStartMinutes <= bookingEndMinutes + 60 && selectedEndMinutes >= bookingStartMinutes - 60)
                );
            });
        });
    }
    
    // Function to convert time strings to minutes
    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    // Disable selected intervals if they are booked
    selectedIntervals.forEach(interval => {
        const option = bookingTime.querySelector(`option[value="${interval}"]`);
        if (option) {
            option.disabled = isBooked(interval);
        }
    });

    return rooms;

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
        for (let hour = 9; hour < 19; hour++) {
            const startTime = hour < 10 ? `0${hour}:00` : `${hour}:00`;
            const endTime = (hour + 1) < 10 ? `0${hour + 1}:00` : `${hour + 1}:00`;
            const optionText = `${startTime} - ${endTime}`;
            const option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            bookingTime.appendChild(option);
        }
    
        const lastStartTime = '19:00';
        const lastEndTime = '20:00';
        const lastOptionText = `${lastStartTime} - ${lastEndTime}`;
        const lastOption = document.createElement('option');
        lastOption.value = lastOptionText;
        lastOption.textContent = lastOptionText;
        bookingTime.appendChild(lastOption);
    
    
        note.value = ''; 
        note.style.display = 'block'; 

        bookRoomButton.addEventListener('click', () => {
            redirectToPaymentForm(room);
        });

        roomDetails.style.display = 'block';
        overlay.style.display = 'block';
    }
    document.addEventListener('click', (event) => {
        const roomDetails = document.getElementById('roomDetails');
        const overlay = document.getElementById('overlay');
    
        if (!roomDetails.contains(event.target) && !event.target.classList.contains('room-item')) {
            roomDetails.style.display = 'none';
            overlay.style.display = 'none';
        }
    });

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

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('username') !== null;
  
    if (!isLoggedIn) {
      disableMainPageElements();
    } else {
      enableMainPageElements();
    }
  
    const mainPageLinks = document.querySelectorAll('.protected');
    mainPageLinks.forEach(link => {
      link.addEventListener('click', event => {
        if (!isLoggedIn) {
          event.preventDefault();
          alert('Please log in to access this feature.');
          window.location.href = 'login.html'; 
        }
      });
    });
  });
  
  function disableMainPageElements() {
    const mainPageLinks = document.querySelectorAll('.protected');
    mainPageLinks.forEach(link => {
      link.classList.add('disabled');
      link.removeAttribute('href');
    });
  }
  
  function enableMainPageElements() {
    const mainPageLinks = document.querySelectorAll('.protected');
    mainPageLinks.forEach(link => {
      link.classList.remove('disabled');
      link.setAttribute('href', `${link.getAttribute('href')}`);
    });
  }
  