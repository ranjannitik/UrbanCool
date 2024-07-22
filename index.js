// // Get references to menu items and other sections
// const menuItems = document.querySelectorAll('.menu-item');
// const messagesNotification = document.querySelector('#messages-notifications');
// const messages = document.querySelector('.messages');
// const message = messages.querySelectorAll('.message');
// const messageSearch = document.querySelector('#message-search');
// const createPostForm = document.querySelector('#create-post-form');
// const feedContainer = document.querySelector('.feeds');

// // Local storage helper functions
// function getLocalStorageItem(key, defaultValue) {
//     const item = localStorage.getItem(key);
//     return item ? JSON.parse(item) : defaultValue;
// }

// function setLocalStorageItem(key, value) {
//     localStorage.setItem(key, JSON.stringify(value));
// }

// // Load existing feed items from local storage
// const feedData = getLocalStorageItem('feedData', []);

// // Insert existing feed items into the feed container on page load
// feedData.forEach((post) => {
//     const newFeed = document.createElement('div');
//     newFeed.className = 'feed';
//     newFeed.innerHTML = post.html;
//     feedContainer.appendChild(newFeed);
// });

// // Remove the 'active' class from all menu items
// const changeActiveItem = () => {
//     menuItems.forEach((item) => item.classList.remove('active'));
// };

// // Add event listeners to menu items
// menuItems.forEach((item) => {
//     item.addEventListener('click', () => {
//         changeActiveItem();
//         item.classList.add('active');

//         if (item.id !== 'notifications') {
//             document.querySelector('.notifications-popup').style.display = 'none';
//         } else {
//             document.querySelector('.notifications-popup').style.display = 'block';
//             document.querySelector('#notifications .notification-count').style.display = 'none';
//         }
//     });
// });

// // Handle form submission to create a new post
// createPostForm.addEventListener('submit', (e) => {
//     e.preventDefault(); // Prevent page refresh

//     const postText = document.querySelector('#post-text').value; // Post content
//     const postImage = document.querySelector('#post-image').files[0]; // Uploaded image

//     if (!postImage) {
//         alert("Please upload an image to create a post.");
//         return;
//     }

//     const reader = new FileReader(); // To read the image file

//     reader.onload = function (event) {
//         const imageUrl = event.target.result; // Base64 representation of the image

//         const newFeed = document.createElement('div');
//         newFeed.className = 'feed';

//         newFeed.innerHTML = `
//             <div class="user">
//                 <div class="profile-pic">
//                     <img src="images/profile-8.jpg" alt="Profile picture">
//                 </div>
//                 <div class="info">
//                     <h3>Your Name</h3>
//                     <small>Just Now</small>
//                 </div>
//             </div>

//             <div class="photo">
//                 <img src="${imageUrl}" alt="Post image">
//             </div>

//             <div class="interaction-button">
//                 <span id="like-btn"><i class="uil uil-thumbs-up"></i> <small class="counter">0</small></span>
//                 <span id="comment-btn"><i class="uil uil-comment"></i></span>
//                 <span id="share-btn"><i class="uil uil-share"></i></span>
//                 <span id="valid-btn"><i class="uil uil-check-circle"></i> <small class="counter">0</small></span>
//                 <span id="invalid-btn"><i class="uil uil-times-circle"></i> <small class="counter">0</small></span>
//             </div>

//             <div class="caption">
//                 <p><b>Your Name</b> ${postText}</p>
//             </div>

//             <div class="comments text-muted">View all comments</div>
//         `;

//         feedContainer.insertAdjacentElement('afterbegin', newFeed); // Insert at the top

//         // Save to local storage
//         feedData.unshift({
//             html: newFeed.innerHTML, // Save the HTML for persistence
//         });
//         setLocalStorageItem('feedData', feedData); // Update local storage

//         createPostForm.reset(); // Reset the form
//     };

//     reader.readAsDataURL(postImage); // Convert the image to base64
// });

// // Function to update the click counter for any given button
// const updateCounter = (button) => {
//     const counter = button.querySelector('.counter'); // Reference to the counter
//     let count = parseInt(counter.textContent, 10); // Current counter value
//     count++; // Increment the count
//     counter.textContent = count; // Update the displayed value
// };

// // Event listeners to update the counter and change background color on click
// document.addEventListener('click', (e) => {
//     const target = e.target.closest('span');

//     if (target?.id === 'valid-btn') {
//         updateCounter(target); // Update the "valid" counter
//     }

//     if (target?.id === 'invalid-btn') {
//         updateCounter(target); // Update the "invalid" counter
//     }

//     if (target?.id === 'like-btn') {
//         updateCounter(target); // Update the "like" counter
//         target.style.color = 'blue'; // Change background color
//     }
// });

// // Message search functionality
// const searchMessage = () => {
//     const val = messageSearch.value.toLowerCase(); // Get search text
//     message.forEach((chat) => {
//         const name = chat.querySelector('h5').textContent.toLowerCase(); // Get name
//         if (name.includes(val)) {
//             chat.style.display = 'flex'; // Show matching messages
//         } else {
//             chat.style.display = 'none'; // Hide non-matching messages
//         }
//     });
// };

// // Add event listener for message search
// messageSearch.addEventListener('keyup', searchMessage);

// // Notification handling for messages
// messagesNotification.addEventListener('click', () => {
//     messages.style.boxShadow = '0 0 1rem var(--color-primary)'; // Highlight message section
//     messagesNotification.querySelector('.notification-count').style.display = 'none';
//     setTimeout(() => {
//         messages.style.boxShadow = 'none'; // Remove highlight after a delay
//     }, 2000);
// });

// Local Storage Helper Functions
function getLocalStorageItem(key, defaultValue) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
}

function setLocalStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Get references to DOM elements
const feedContainer = document.querySelector(".feeds");

// Load existing feed data from local storage
const feedData = getLocalStorageItem("feedData", []);

// Insert existing feed items into the feed container on page load
feedData.forEach((post) => {
  const newFeed = document.createElement("div");
  newFeed.className = "feed";
  newFeed.innerHTML = post.html;
  feedContainer.appendChild(newFeed);

  // Restore counter values and button states from local storage
  const buttonCounters = post.counters || [0, 0, 0, 0, 0]; // Default to 0 if no data
  const counterElements = newFeed.querySelectorAll(
    ".interaction-button .counter"
  );

  counterElements.forEach((counter, index) => {
    counter.textContent = buttonCounters[index]; // Restore counter value
  });

  // Restore "like" button color if it's been activated
  const likeButton = newFeed.querySelector("#like-btn");
  if (buttonCounters[0] > 0) {
    likeButton.style.color = "blue"; // Indicate it's active
  }
});

// Form submission handling to create a new post
const createPostForm = document.querySelector("#create-post-form");

createPostForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form refresh on submission

  const postText = document.querySelector("#post-text").value; // Get the post text
  const postImage = document.querySelector("#post-image").files[0]; // Get the uploaded image

  if (!postImage) {
    alert("Please upload an image to create a post.");
    return;
  }

  const reader = new FileReader(); // To read the uploaded image file
  reader.onload = function (event) {
    const imageUrl = event.target.result; // Base64 representation of the image

    const newFeed = document.createElement("div");
    newFeed.className = "feed";
    // Array of Indian names
    const NameOrig = [
      "Aarav",
      "Isha",
      "Vikram",
      "Priya",
      "Anjali",
      "Rohan",
      "Sita",
      "Kiran",
      "Vikas",
      "Mira",
    ];

    // Function to fetch a random name from the NameOrig array
    function getRandomName() {
      // Get a random index from 0 to the length of the array minus 1
      const randomIndex = Math.floor(Math.random() * NameOrig.length);

      // Fetch the name from the array using the random index
      const randomName = NameOrig[randomIndex];

      return randomName;
    }

    // Example usage: Fetch a random name
   
    

    // Create the inner HTML for the new feed item
    newFeed.innerHTML = `
            <div class="user">
                <div class="profile-pic">
                    <img src="${imageUrl}" alt="Profile picture">
                </div>
                <div class="info">
                    <h3>${getRandomName()}</h3>
                    <small>Just Now</small>
                </div>
            </div>

            <div class="photo">
                <img src="${imageUrl}" alt="Post image">
            </div>

            <div class="interaction-button">
                           <span id="like-btn"><i class="uil uil-thumbs-up"></i> <small class="counter">0</small></span>
                           <span id="comment-btn"><i class="uil uil-comment"></i></span>
                           <span id="share-btn"><i class="uil uil-share"></i></span>
                           <span id="valid-btn"><i class="uil uil-check-circle"></i> <small class="counter">0</small></span>
                           <span id="invalid-btn"><i class="uil uil-times-circle"></i> <small class="counter">0</small></span>
                       </div>

            <div class="caption">
                <p><b>Your Name</b> ${postText}</p>
            </div>
        `;

    // Insert the new feed item at the top
    feedContainer.insertAdjacentElement("afterbegin", newFeed);

    // Store the new feed item and initialize counter values
    feedData.unshift({
      html: newFeed.innerHTML, // Save the HTML for persistence
      counters: [0, 0, 0, 0, 0], // Initialize counters for like, valid, invalid, etc.
    });

    setLocalStorageItem("feedData", feedData); // Update local storage

    createPostForm.reset(); // Reset the form
  };

  reader.readAsDataURL(postImage); // Convert the image to base64
});

// Function to update the click counter and maintain persistence
const updateCounter = (button, counterIndex) => {
  const counter = button.querySelector(".counter");
  let count = parseInt(counter.textContent, 10); // Current counter value
  count++; // Increment the count
  counter.textContent = count; // Update the displayed value

  // Update the appropriate counter in local storage
  const feedIndex = [...feedContainer.children].indexOf(
    button.closest(".feed")
  );
  if (feedIndex >= 0) {
    if (!feedData[feedIndex].counters) {
      feedData[feedIndex].counters = [0, 0, 0, 0, 0]; // Initialize counters
    }
    feedData[feedIndex].counters[counterIndex] = count;
    setLocalStorageItem("feedData", feedData); // Save updated counters to local storage
  }
};

// Event listeners to update the counter and change the background color on click
document.addEventListener("click", (e) => {
  const target = e.target.closest("span");

  if (target?.id === "like-btn") {
    updateCounter(target, 0); // Update the "like" counter
    target.style.color = "blue"; // Change background color to indicate it's active
  }

  if (target?.id === "valid-btn") {
    updateCounter(target, 1); // Update the "valid" counter
  }

  if (target?.id === "invalid-btn") {
    updateCounter(target, 2); // Update the "invalid" counter
  }
});

// Message search functionality
const searchMessage = () => {
  const val = messageSearch.value.toLowerCase(); // Get the search text
  message.forEach((chat) => {
    const name = chat.querySelector("h5").textContent.toLowerCase(); // Get the message name
    if (name.includes(val)) {
      chat.style.display = "flex"; // Show matching messages
    } else {
      chat.style.display = "none"; // Hide non-matching messages
    }
  });
};

// Add event listener for message search
messageSearch.addEventListener("keyup", searchMessage);

// Notification handling for messages
messagesNotification.addEventListener("click", () => {
  messages.style.boxShadow = "0 0 1rem var(--color-primary)"; // Highlight the message section
  messagesNotification.querySelector(".notification-count").style.display =
    "none";
  setTimeout(() => {
    messages.style.boxShadow = "none"; // Remove the highlight after a delay
  }, 2000);
});

function clearCache() {
  // Clear all local storage
  localStorage.clear();
  window.location.reload(); // This will reload the page
  alert("Cache cleared successfully!");
}
