const navbar = document.querySelector('nav');
const menuItem = document.querySelectorAll('.menu-item .navbar-lien');
const navBurger = document.querySelector('.menu-burger');
const burger = document.querySelector('.burger');
const burgerSpan = document.querySelectorAll('.burger span');
const crossBurger = document.querySelector('.menu-burger span');
const menuNavbar = document.querySelector('.menu-navbar');
const body = document.querySelector('body');

burger.addEventListener('click', () => {
  navBurger.style.display = 'flex';
  body.style.overflow = 'hidden';
})

crossBurger.addEventListener('click', () => {
  navBurger.style.display = 'none';
  body.style.overflow = 'visible';
  body.style.overflowX = 'hidden';
})

window.addEventListener('scroll', () => {
  const seuil = 10;
  if (window.scrollY > seuil) {
    navbar.style.backgroundColor = '#fffffff3';
    menuItem.forEach(item => {
      item.style.color = '#D2C19F';
    });
  }
  else {
    navbar.style.backgroundColor = 'transparent';
  }
})


/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index - active) / $items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress / 100 * ($items.length - 1))

  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i / $items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)


//BOUTON
const buttons = document.querySelectorAll('.button_su_inner').forEach((button) => {
  button.addEventListener('mouseenter', function (e) {
    var parentOffset = this.getBoundingClientRect();

    var relX = e.pageX - parentOffset.left - window.scrollX;
    var relY = e.pageY - parentOffset.top - window.scrollY;

    var prevCircle = this.previousElementSibling;
    prevCircle.style.left = relX + 'px';
    prevCircle.style.top = relY + 'px';
    prevCircle.classList.remove('desplode-circle');
    prevCircle.classList.add('explode-circle');
  });

  button.addEventListener('mouseleave', function (e) {
    var parentOffset = this.getBoundingClientRect();
    const span = document.querySelector('.button_text_container');
    span.style.color = '#7d878f';

    var relX = e.pageX - parentOffset.left - window.scrollX;
    var relY = e.pageY - parentOffset.top - window.scrollY;

    var prevCircle = this.previousElementSibling;
    prevCircle.style.left = relX + 'px';
    prevCircle.style.top = relY + 'px';
    prevCircle.classList.remove('explode-circle');
    prevCircle.classList.add('desplode-circle');
  });
})


//EMAIL
document.getElementById('send-btn').addEventListener('click', function () {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  // Les noms des paramètres doivent correspondre à ceux de votre template EmailJS
  var templateParams = {
    from_name: name,
    from_email: email,
    message: message
  };

  emailjs.send('your_service_id', 'your_template_id', templateParams)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function (error) {
      console.log('FAILED...', error);
    });
});