document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-item');
    const openChatBtn = document.getElementById('open-chat');
    const liveChat = document.getElementById('live-chat');
    const closeChat = document.querySelector('.close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.querySelector('.chat-messages');

    // Toggle mobile menu
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Toggle active class for navigation links
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Live chat functionality
    openChatBtn.addEventListener('click', () => {
        liveChat.style.display = 'block';
        openChatBtn.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        liveChat.style.display = 'none';
        openChatBtn.style.display = 'block';
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (chatInput.value.trim() !== '') {
            addMessage('You', chatInput.value);
            // Here you would typically send the message to a server
            // and handle the response. For this example, we'll just
            // simulate a response after a short delay.
            setTimeout(() => {
                addMessage('Support', 'Thank you for your message. How can I assist you today?');
            }, 1000);
            chatInput.value = '';
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Form submission handling
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission,
        // such as sending the data to a server. For this example,
        // we'll just show an alert.
        alert('Terima kasih! Pesanan Anda telah diterima. Kami akan menghubungi Anda segera.');
        orderForm.reset();
    });

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    testimonialSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - testimonialSlider.offsetLeft;
        scrollLeft = testimonialSlider.scrollLeft;
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    testimonialSlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    testimonialSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialSlider.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialSlider.scrollLeft = scrollLeft - walk;
    });
});

