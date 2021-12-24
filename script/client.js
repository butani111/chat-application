const socket = io('http://localhost:5000');
 
const form = document.getElementById('typingArea');
const msgInput = document.getElementById('msgInput');
const containor = document.querySelector('.containor');

var audio = new Audio('ting.mp3');

const append = (message, pos) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = message;
  newElement.classList.add('message');
  newElement.classList.add(pos);
  containor.append(newElement);
  containor.scrollTop = containor.scrollHeight;
  if (pos == 'left') {
    audio.play();
  }
}

const name = prompt('Enter your name');
socket.emit('new-user-joined', name);
// socket.emit('new-user-joined', 'ABC');
append(`${name.bold()}, Welcome to the chat room`, 'notice');

socket.on("new-user", name => {
  append(`${name.bold()} has joined the chat`, 'notice');
});

socket.on('receive', data =>{
  const userName = data.name.bold();
  append(`${userName} : ${data.message}`, 'left');
  // append(`${data.name} : ${data.message}`, 'left')
});

socket.on('left', name =>{
  append(`${name} left the chat`.bold(), 'notice');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const message = msgInput.value;
  const userName = "You".bold();
  append(`${userName} : ${message}`, 'right');
  socket.emit('send', message);
  msgInput.value = '';
});
